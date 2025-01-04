import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../../contexts/ChatContext';

interface ChatDetailProps {
  chatId: string | null;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ chatId }) => {
  const { chats, messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatId]);

  if (!chatId) {
    return (
      <div className="bg-white rounded-lg border h-[calc(100vh-16rem)] flex items-center justify-center text-gray-500">
        Select a chat to view the conversation
      </div>
    );
  }

  const chat = chats.find((c) => c.id === chatId);
  const chatMessages = messages[chatId] || [];

  return (
    <div className="bg-white rounded-lg border h-[calc(100vh-16rem)] flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">{chat?.userName}</h3>
            <p className="text-sm text-gray-500">{chat?.email}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            chat?.status === 'new' ? 'bg-green-100 text-green-800' :
            chat?.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {chat?.status}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={(message) => sendMessage(chatId, message)} />
    </div>
  );
};

export default ChatDetail;