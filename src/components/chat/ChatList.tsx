import React from 'react';
import { Phone } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChat: string | null;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, selectedChat }) => {
  const { chats } = useChat();

  return (
    <div className="bg-white rounded-lg border mt-4">
      <div className="divide-y">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedChat === chat.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{chat.userName}</h3>
              <span className="text-sm text-gray-500">{chat.lastMessageTime}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{chat.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                <span>{chat.phone}</span>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  chat.status === 'new' ? 'bg-green-100 text-green-800' :
                  chat.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {chat.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;