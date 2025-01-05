import React, { createContext, useContext, useState } from 'react';
import { Chat, Message } from '../types/chat';
import { dummyChats, dummyMessages } from '../data/dummyChats';
import { dummyUsers } from '../data/dummyData';

interface ChatContextType {
  chats: Chat[];
  messages: Record<string, Message[]>;
  selectedChatId: string | null;
  selectChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => void;
  updateChatStatus: (chatId: string, status: 'new' | 'in-progress' | 'resolved') => void;
  startNewChat: (userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [messages, setMessages] = useState<Record<string, Message[]>>(dummyMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    updateChatStatus(chatId, 'in-progress');
  };

  const startNewChat = (userId: string) => {
    const user = dummyUsers.find(u => u.id === userId);
    if (!user) return;

    const newChat: Chat = {
      id: `chat_${Date.now()}`,
      userName: user.name,
      email: user.email,
      phone: '+502 1234-5678', // In a real app, this would come from the user data
      status: 'new',
      lastMessage: 'Chat started',
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newChat.id]: []
    }));
    setSelectedChatId(newChat.id);
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
        startNewChat,
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