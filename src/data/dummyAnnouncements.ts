import { Announcement } from '../types/announcement';

export const dummyAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'New Tech Growth Fund Launch',
    content: 'We\'re excited to announce our latest investment opportunity in the tech sector...',
    type: 'investment',
    status: 'published',
    segments: ['verified', 'investors'],
    publishAt: null,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    createdBy: 'Eduardo Reyes'
  },
  {
    id: '2',
    title: 'Platform Maintenance Notice',
    content: 'Scheduled maintenance will be performed on March 20th...',
    type: 'maintenance',
    status: 'scheduled',
    segments: ['all'],
    publishAt: '2024-03-19T22:00:00Z',
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    createdBy: 'Carmen Flores'
  },
  {
    id: '3',
    title: 'Updated KYC Requirements',
    content: 'Important changes to our KYC verification process...',
    type: 'policy',
    status: 'draft',
    segments: ['new-users'],
    publishAt: null,
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
    createdBy: 'Sofia Valladares'
  }
];