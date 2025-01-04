import { Chat, Message } from '../types/chat';

export const dummyChats: Chat[] = [
  {
    id: '1',
    userName: 'John Smith',
    email: 'john.smith@example.com',
    status: 'new',
    lastMessage: 'I need help with my investment portfolio',
    lastMessageTime: '10:30 AM',
  },
  {
    id: '2',
    userName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    status: 'in-progress',
    lastMessage: 'When will the next investment opportunity be available?',
    lastMessageTime: 'Yesterday',
  },
  {
    id: '3',
    userName: 'Michael Brown',
    email: 'michael.b@example.com',
    status: 'resolved',
    lastMessage: 'Thanks for your help!',
    lastMessageTime: '2 days ago',
  },
];

export const dummyMessages: Record<string, Message[]> = {
  '1': [
    {
      content: 'Hello, I need help with my investment portfolio',
      sender: 'user',
      timestamp: '10:30 AM',
    },
    {
      content: 'Hi John, I\'d be happy to help. What specific questions do you have about your portfolio?',
      sender: 'admin',
      timestamp: '10:32 AM',
    },
  ],
  '2': [
    {
      content: 'When will the next investment opportunity be available?',
      sender: 'user',
      timestamp: 'Yesterday',
    },
    {
      content: 'We have several new opportunities coming up next week. Would you like me to send you the details?',
      sender: 'admin',
      timestamp: 'Yesterday',
    },
  ],
};