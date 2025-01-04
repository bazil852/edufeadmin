import React, { createContext, useContext, useState } from 'react';
import { Chat, Message } from '../types/chat';
import { dummyChats, dummyMessages } from '../data/dummyChats';

interface ChatContextType {
  chats: Chat[];
  messages: Record<string, Message[]>;
  selectedChatId: string | null;
  selectChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => void;
  updateChatStatus: (chatId: string, status: 'new' | 'in-progress' | 'resolved') => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [messages, setMessages] = useState<Record<string, Message[]>>(dummyMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    // Mark chat as in-progress when selected
    updateChatStatus(chatId, 'in-progress');
  };

  const sendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      content,
      sender: 'admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    // Update chat's last message
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: content,
              lastMessageTime: newMessage.timestamp,
            }
          : chat
      )
    );
  };

  const updateChatStatus = (chatId: string, status: 'new' | 'in-progress' | 'resolved') => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              status,
            }
          : chat
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        selectedChatId,
        selectChat,
        sendMessage,
        updateChatStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};