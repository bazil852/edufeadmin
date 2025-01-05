import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import Modal from '../Modal';
import { ContentType, UserTier, EducationalContent } from '../../types/education';
import { categories, tags } from '../../data/dummyEducationalContent';

interface ContentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (content: Partial<EducationalContent>) => void;
}

const ContentUploadModal: React.FC<ContentUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<UserTier[]>(['basic']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as ContentType,
      categoryId: formData.get('category') as string,
      tags: selectedTags,
      visibility: selectedTiers,
      status: 'draft' as const
    };
    onUpload(data);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleTierToggle = (tier: UserTier) => {
    setSelectedTiers(prev =>
      prev.includes(tier)
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Educational Content"
      size="wide"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={3}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Content Type</label>
            <select
              name="type"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag.id)
                    ? 'bg-[#114A55] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visibility
          </label>
          <div className="flex gap-4">
            {(['basic', 'premium', 'enterprise'] as UserTier[]).map(tier => (
              <label key={tier} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTiers.includes(tier)}
                  onChange={() => handleTierToggle(tier)}
                  className="rounded border-gray-300 text-[#114A55] focus:ring-[#114A55]"
                />
                <span className="text-sm capitalize">{tier}</span>
              </label>
            ))}
          </div>
        </div> */}

        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <div className="space-y-2">
            <Upload className="mx-auto text-gray-400" size={32} />
            <p className="text-gray-600">Drag and drop your content here, or click to browse</p>
            <input type="file" className="hidden" />
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Browse Files
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
          >
            Upload Content
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ContentUploadModal;