export type NotificationType = 'kyc' | 'ticket' | 'investment' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  isRead: boolean;
  timestamp: string;
  link?: string;
}