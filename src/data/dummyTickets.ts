import { Ticket } from '../types/ticket';

export const dummyTickets: Ticket[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Isabella Mejía',
    title: 'Unable to access investment dashboard',
    description: 'I keep getting an error when trying to view my investment portfolio.',
    type: 'technical',
    priority: 'high',
    status: 'open',
    assignedTo: 'Carmen Flores',
    createdAt: '2025-01-15T09:30:00',
    updatedAt: '2025-01-15T09:30:00',
    comments: [
      {
        id: '1',
        ticketId: '1',
        userId: '2',
        userName: 'Isabella Mejía',
        content: 'The error occurs consistently after login.',
        isInternal: false,
        createdAt: '2025-01-15T09:30:00'
      }
    ]
  },
  {
    id: '2',
    userId: '1',
    userName: 'Carlos Hernández',
    title: 'Investment withdrawal request',
    description: 'Need assistance with withdrawing funds from my tech growth investment.',
    type: 'billing',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Eduardo Reyes',
    createdAt: '2025-01-14T15:45:00',
    updatedAt: '2025-01-15T10:20:00',
    comments: [
      {
        id: '2',
        ticketId: '2',
        userId: '1',
        userName: 'Carlos Hernández',
        content: 'Would like to withdraw $5000 from my tech growth fund.',
        isInternal: false,
        createdAt: '2025-01-14T15:45:00'
      },
      {
        id: '3',
        ticketId: '2',
        userId: '3',
        userName: 'Eduardo Reyes',
        content: 'Verifying account details and processing request.',
        isInternal: true,
        createdAt: '2025-01-15T10:20:00'
      }
    ]
  }
];