import React, { useState } from 'react';
import { AnnouncementType, UserSegment, NotificationMethod } from '../../types/announcement';
import SearchableSelect from '../common/SearchableSelect';
import { dummyUsers } from '../../data/dummyData';

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
  const [selectedUser, setSelectedUser] = useState(initialData?.specificUserId || '');

  const userOptions = dummyUsers.map(user => ({
    value: user.id,
    label: `${user.name} (${user.email})`
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      type: formData.get('type'),
      segments: selectedUser ? [] : Array.from(formData.getAll('segments')),
      publishAt: formData.get('publishAt'),
      specificUserId: selectedUser || undefined,
      notificationMethod: formData.get('notificationMethod'),
    };
    onSubmit(data);
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

      <div className="grid grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium text-gray-700">Schedule</label>
          <input
            type="datetime-local"
            name="publishAt"
            defaultValue={initialData?.publishAt}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
        <div className="space-y-4">
          <SearchableSelect
            options={userOptions}
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notification Method</label>
        <select
          name="notificationMethod"
          defaultValue={initialData?.notificationMethod || 'both'}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        >
          <option value="email">Email Only</option>
          <option value="notification">In-App Notification Only</option>
          <option value="both">Both Email and Notification</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
        >
          {initialData ? 'Update' : 'Create'} Announcement
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;