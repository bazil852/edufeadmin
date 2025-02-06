import React, { useState, useEffect } from 'react';
import { Video, Search, Calendar, Trash2, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import UploadForm from '../components/education/UploadForm';

interface LearnVideo {
  id: number;
  title: string;
  type: string;
  s3Url: string;
  uploadedAt: string;
}

const Education: React.FC = () => {
  const [videos, setVideos] = useState<LearnVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/learn-videos`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError('Failed to load educational videos');
        console.error('Error loading videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (videoId: number) => {
    try {
      setIsDeleting(videoId);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/learn-videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      setVideos(videos.filter(video => video.id !== videoId));
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Failed to delete video');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleUpload = async (formData: FormData) => {
    try {
      setIsUploading(true);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/learn-videos/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const newVideo = await response.json();
      setVideos([newVideo, ...videos]);
      setIsUploadModalOpen(false);
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          Upload Video
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search videos..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#114A55]"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Calendar size={20} className="text-gray-500" />
          <select className="bg-transparent border-none focus:ring-0">
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <video
                  src={video.s3Url}
                  className="w-full h-full object-cover"
                  controls
                />
              </div>
              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-2 pr-8">
                  <h3 className="font-semibold text-gray-900">{video.title}</h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
                    {video.type}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(video.id)}
                  disabled={isDeleting === video.id}
                  className="absolute top-4 right-4 p-1 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50"
                  title="Delete video"
                >
                  {isDeleting === video.id ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Video size={16} />
                  <span>Uploaded {formatDate(video.uploadedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Educational Video"
      >
        <UploadForm
          onSubmit={handleUpload}
          onCancel={() => setIsUploadModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Education;