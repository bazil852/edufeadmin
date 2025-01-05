export interface Chat {
  id: string;
  userName: string;
  email: string;
  phone: string;
  status: 'new' | 'in-progress' | 'resolved';
  lastMessage: string;
  lastMessageTime: string;
}

export interface Message {
  content: string;
  sender: 'user' | 'admin';
  timestamp: string;
}