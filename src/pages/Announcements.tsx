import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';
import AnnouncementList from '../components/announcements/AnnouncementList';
import AnnouncementForm from '../components/announcements/AnnouncementForm';
import AnnouncementMetrics from '../components/announcements/AnnouncementMetrics';
import { Notification } from '../types/notification';

interface APINotification {
  id: number;
  title: string;
  body: string;
  data: {
    type: string;
    notificationMethod: string;
    segments?: string[];
  };
  is_read: boolean;
  byAdmin: boolean;
  created_at: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    // ... other user fields
  };
}

const Announcements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<APINotification | null>(null);
  const [announcements, setAnnouncements] = useState<APINotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    delivered: 0,
    failed: 0,
    pending: 0,
    totalRecipients: 0
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notification`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }

        const data = await response.json();
        setAnnouncements(data);
        setMetrics(prev => ({
          ...prev,
          delivered: data.length, // Total published notifications
          pending: 0,            // Set to 0 as requested
          failed: 0,             // Set to 0 as requested
          totalRecipients: data.length // Total notifications
        }));
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = (data: any) => {
    console.log('Create announcement:', data);
    setIsModalOpen(false);
  };

  const handleEditAnnouncement = (announcement: APINotification) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handlePreviewAnnouncement = (announcement: APINotification) => {
    console.log('Preview announcement:', announcement);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Announcements</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Announcement
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
        </div>
      ) : (
        <>
          <AnnouncementMetrics metrics={metrics} />
          <AnnouncementList
            announcements={announcements.map(notification => ({
              id: notification.id.toString(),
              title: notification.title,
              content: notification.body,
              type: notification.data.type || 'general',
              status: 'published',
              segments: notification.data.segments || [],
              createdAt: notification.created_at,
              updatedAt: notification.created_at,
              createdBy: notification.user.fullName
            }))}
            onEdit={handleEditAnnouncement}
            onPreview={handlePreviewAnnouncement}
          />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAnnouncement(null);
        }}
        title={selectedAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
      >
        <AnnouncementForm
          onSubmit={handleCreateAnnouncement}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedAnnouncement(null);
          }}
          initialData={selectedAnnouncement}
        />
      </Modal>
    </div>
  );
};

export default Announcements;