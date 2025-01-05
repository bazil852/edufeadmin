import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ContentList from '../components/education/ContentList';
import ContentFilters from '../components/education/ContentFilters';
import ContentUploadModal from '../components/education/ContentUploadModal';
import { dummyEducationalContent } from '../data/dummyEducationalContent';
import { EducationalContent, ContentStatus } from '../types/education';

const Education: React.FC = () => {
  const [content, setContent] = useState(dummyEducationalContent);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = (newContent: Partial<EducationalContent>) => {
    console.log('Upload content:', newContent);
    setIsUploadModalOpen(false);
  };

  const handleStatusChange = (contentId: string, status: ContentStatus) => {
    setContent(content.map(item => 
      item.id === contentId ? { ...item, status } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Educational Content</h2>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
        >
          <Plus size={20} />
          Upload Content
        </button>
      </div>

      <ContentFilters />
      <ContentList 
        content={content}
        onStatusChange={handleStatusChange}
      />

      <ContentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default Education;