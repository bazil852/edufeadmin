import React from 'react';
import ChatList from '../components/chat/ChatList';
import ChatDetail from '../components/chat/ChatDetail';
import ChatFilters from '../components/chat/ChatFilters';
import { useChat } from '../contexts/ChatContext';

const Chats: React.FC = () => {
  const { selectedChatId, selectChat } = useChat();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Support Chats</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <ChatFilters />
          <ChatList onSelectChat={selectChat} selectedChat={selectedChatId} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <ChatDetail chatId={selectedChatId} />
        </div>
      </div>
    </div>
  );
};

export default Chats;