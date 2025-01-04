import React from 'react';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAdmin = message.sender === 'admin';

  return (
    <div className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isAdmin ? 'bg-[#114A55] text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs mt-1 block opacity-70">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;