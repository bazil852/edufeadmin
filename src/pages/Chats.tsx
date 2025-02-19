import React, { useState, useEffect } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatDetail from '../components/chat/ChatDetail';
import ChatFilters from '../components/chat/ChatFilters';
import NewChatModal from '../components/chat/NewChatModal';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

const Chats: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);
  const { selectedChatId, selectChat, startNewChat } = useChat();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyChats');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyChats', newValue.toString());
  };

  const handleStartChat = (userId: string) => {
    startNewChat(userId);
    setIsNewChatModalOpen(false);
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800"
          alt="Coming Soon"
          className="w-50 h-40  object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          Live Chat Support Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're building a powerful live chat system to help you provide real-time support
          to your users and manage all conversations efficiently in one place.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Real-time messaging</li>
            <li>• Chat assignment and routing</li>
            <li>• File sharing capabilities</li>
            <li>• Chat history and analytics</li>
          </ul>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            onClick={toggleDummyPage}
            className="mt-8 px-6 py-3 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 transition-colors"
          >
            View Demo Version
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Support Chats</h2>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Demo Version</span>
        </div>
        <button
          onClick={toggleDummyPage}
          className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
        >
          Back to Coming Soon
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <ChatFilters onNewChat={() => setIsNewChatModalOpen(true)} />
          <ChatList onSelectChat={selectChat} selectedChat={selectedChatId} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <ChatDetail chatId={selectedChatId} />
        </div>
      </div>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onStartChat={handleStartChat}
      />
    </div>
  );
};

export default Chats;