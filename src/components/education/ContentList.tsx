import React from 'react';
import { Play, FileText, File, Eye, ThumbsUp, Clock } from 'lucide-react';
import { EducationalContent, ContentStatus } from '../../types/education';
import { formatActivityDate } from '../../utils/dateUtils';

interface ContentListProps {
  content: EducationalContent[];
  onStatusChange: (contentId: string, status: ContentStatus) => void;
}

const ContentList: React.FC<ContentListProps> = ({ content, onStatusChange }) => {
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'article': return FileText;
      default: return File;
    }
  };

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item) => {
        const Icon = getContentIcon(item.type);
        return (
          <div key={item.id} className="bg-white rounded-lg border overflow-hidden">
            {item.thumbnailUrl && (
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-[#114A55]" />
                  <span className="text-sm text-gray-500 capitalize">{item.type}</span>
                </div>
                <select
                  value={item.status}
                  onChange={(e) => onStatusChange(item.id, e.target.value as ContentStatus)}
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                {item.duration && (
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{item.duration} min</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{item.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp size={14} />
                  <span>{item.likes}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {formatActivityDate(item.createdAt)}
                  </span>
                  <button className="text-[#114A55] hover:text-[#114A55]/80">
                    Edit Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;