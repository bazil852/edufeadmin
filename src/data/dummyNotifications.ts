import { Notification } from '../types/notification';

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'kyc',
    title: 'New KYC Verification',
    message: 'Ana María Santos has submitted KYC documents for verification.',
    priority: 'high',
    isRead: false,
    timestamp: '2024-03-15 14:30',
    link: '/users'
  },
  {
    id: '2',
    type: 'ticket',
    title: 'Urgent Support Ticket',
    message: 'High priority ticket from Isabella Mejía requires immediate attention.',
    priority: 'high',
    isRead: false,
    timestamp: '2024-03-15 13:45',
    link: '/tickets'
  },
  {
    id: '3',
    type: 'investment',
    title: 'Investment Deadline',
    message: 'Tech Growth Fund investment window closes in 24 hours.',
    priority: 'medium',
    isRead: false,
    timestamp: '2024-03-15 12:00',
    link: '/investments'
  }
];