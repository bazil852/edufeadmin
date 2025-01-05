import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';
import AnnouncementList from '../components/announcements/AnnouncementList';
import AnnouncementForm from '../components/announcements/AnnouncementForm';
import AnnouncementMetrics from '../components/announcements/AnnouncementMetrics';
import { dummyAnnouncements } from '../data/dummyAnnouncements';
import { Announcement } from '../types/announcement';

const Announcements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [announcements, setAnnouncements] = useState(dummyAnnouncements);

  // Example metrics data
  const metrics = {
    delivered: 1234,
    failed: 45,
    pending: 78,
    totalRecipients: 1357
  };

  const handleCreateAnnouncement = (data: any) => {
    console.log('Create announcement:', data);
    setIsModalOpen(false);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handlePreviewAnnouncement = (announcement: Announcement) => {
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

      <AnnouncementMetrics metrics={metrics} />

      <AnnouncementList
        announcements={announcements}
        onEdit={handleEditAnnouncement}
        onPreview={handlePreviewAnnouncement}
      />

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