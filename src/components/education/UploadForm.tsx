import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface UploadFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('VideoFile', selectedFile);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
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
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        >
          <option value="investing">Investing</option>
          <option value="earning">Earning</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
        <div className="border-2 border-dashed rounded-lg p-8">
          <div className="space-y-2 text-center">
            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto text-gray-400" size={32} />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
              </>
            )}
            <label className="relative block cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className={`${selectedFile ? 'hidden' : ''} absolute inset-0 w-full h-full opacity-0 cursor-pointer`}
              />
              <div className="mt-2 inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Browse Files
              </div>
            </label>
          </div>
        </div>
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
          disabled={!selectedFile || isUploading}
          className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 disabled:opacity-50 flex items-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload Video'
          )}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;