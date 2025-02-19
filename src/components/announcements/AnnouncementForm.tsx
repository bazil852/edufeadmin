import React, { useState, useEffect } from 'react';
import { AnnouncementType, UserSegment, NotificationMethod } from '../../types/announcement';
import SearchableSelect from '../common/SearchableSelect';
import { fetchUsers } from '../../services/api';
import { logAuditEvent, AuditActions } from '../../services/auditLogger';
import { useAuth } from '../../contexts/AuthContext';

interface AnnouncementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(initialData?.specificUserId || '');
  const [users, setUsers] = useState<Array<{ value: string, label: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        const options = fetchedUsers.map(user => ({
          value: user.id.toString(),
          label: `${user.fullName} (${user.email})`
        }));
        setUsers(options);
      } catch (err) {
        console.error('Error loading users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const segments = Array.from(formData.getAll('segments'));
    
    // Prepare the base announcement data
    let data = {
      title: formData.get('title'),
      content: formData.get('content'),
      type: formData.get('type'),
      segments: selectedUser ? [] : segments,
      specificUserId: selectedUser || undefined,
      notificationMethod: formData.get('notificationMethod'),
    };

    const sendNotification = async () => {
      setIsSending(true);
      setError(null);

      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        const accessToken = localStorage.getItem('accessToken');
        const endpoint = selectedUser 
          ? `${import.meta.env.VITE_API_URL}/notification/send/${selectedUser}`
          : `${import.meta.env.VITE_API_URL}/notification/send-to-all`;

        const notificationData = {
          title: data.title,
          body: data.content,
          data: {
            type: data.type,
            notificationMethod: data.notificationMethod,
            segments: segments
          },
          byAdmin: true
        };

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(notificationData)
        });

        if (!response.ok) {
          const data = await response.json();
          if (data.message?.includes('notifications are not enabled')) {
            throw new Error('Push notifications are not enabled for this user');
          }
          throw new Error('Failed to send notification: ' + (data.message || 'Unknown error'));
        }

        // Log the audit event
        await logAuditEvent({
          user: currentUser!,
          action: AuditActions.ANNOUNCEMENT.CREATE,
          ipAddress: ip,
          description: `Announcement "${data.title}" was sent`,
          metadata: {
            title: data.title,
            type: data.type,
            notificationMethod: data.notificationMethod,
            targetAudience: selectedUser ? 'specific_user' : 'segments',
            segments: !selectedUser ? segments : undefined,
            specificUserId: selectedUser || undefined
          }
        });

        // After successful notification, submit the announcement
        onSubmit(data);
      } catch (error) {
        console.error('Error sending notification:', error);
        setError(error instanceof Error ? error.message : 'Failed to send notification');
      } finally {
        setIsSending(false);
      }
    };

    // Send notification regardless of whether a specific user is selected or not
    sendNotification();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          name="content"
          rows={4}
          defaultValue={initialData?.content}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          defaultValue={initialData?.type}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        >
          <option value="investment">Investment</option>
          <option value="maintenance">Maintenance</option>
          <option value="policy">Policy</option>
          <option value="general">General</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#114A55]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <SearchableSelect
              options={users}
              value={selectedUser}
              onChange={setSelectedUser}
              placeholder="Select specific user (optional)"
              label="Specific User"
            />

            {!selectedUser && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">User Segments</label>
                <div className="space-y-2">
                  {['all', 'verified', 'investors', 'new-users'].map((segment) => (
                    <label key={segment} className="flex items-center">
                      <input
                        type="checkbox"
                        name="segments"
                        value={segment}
                        defaultChecked={initialData?.segments?.includes(segment)}
                        className="rounded border-gray-300 text-[#114A55] focus:ring-[#114A55]"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Notification Method</label>
        <select
          name="notificationMethod"
          defaultValue={initialData?.notificationMethod || 'notification'}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        >
          <option value="notification">Push Notification</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          disabled={isSending}
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSending}
          className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 disabled:opacity-50 flex items-center gap-2"
        >
          {isSending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            `${initialData ? 'Update' : 'Create'} Announcement`
          )}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;