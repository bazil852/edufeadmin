import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import { Announcement } from '../../types/announcement';
import { formatDate } from '../../utils/dateUtils';
import AnnouncementStatusBadge from './AnnouncementStatusBadge';

interface AnnouncementListProps {
  announcements: Announcement[];
  onEdit: (announcement: Announcement) => void;
  onPreview: (announcement: Announcement) => void;
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  announcements,
  onEdit,
  onPreview,
}) => {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
              <p className="text-gray-600 line-clamp-2">{announcement.content}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{formatDate(announcement.createdAt)}</span>
                </div>
                {announcement.publishAt && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Scheduled: {formatDate(announcement.publishAt)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{announcement.segments.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AnnouncementStatusBadge status={announcement.status} />
              <div className="flex gap-2">
                {/* <button
                  onClick={() => onPreview(announcement)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  Preview
                </button> */}
                <button
                  onClick={() => onEdit(announcement)}
                  className="px-3 py-1 text-sm text-white bg-[#114A55] hover:bg-[#114A55]/90 rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementList;