export type AnnouncementStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type AnnouncementType = 'investment' | 'maintenance' | 'policy' | 'general';
export type UserSegment = 'all' | 'verified' | 'investors' | 'new-users';
export type NotificationMethod = 'email' | 'notification' | 'both';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  segments: UserSegment[];
  publishAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  specificUserId?: string;
  notificationMethod: NotificationMethod;
}