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
    createdAt: '2024-03-15 09:30',
    updatedAt: '2024-03-15 09:30',
    comments: [
      {
        id: '1',
        ticketId: '1',
        userId: '2',
        userName: 'Isabella Mejía',
        content: 'The error occurs consistently after login.',
        isInternal: false,
        createdAt: '2024-03-15 09:30'
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
    createdAt: '2024-03-14 15:45',
    updatedAt: '2024-03-15 10:20',
    comments: [
      {
        id: '2',
        ticketId: '2',
        userId: '1',
        userName: 'Carlos Hernández',
        content: 'Would like to withdraw $5000 from my tech growth fund.',
        isInternal: false,
        createdAt: '2024-03-14 15:45'
      },
      {
        id: '3',
        ticketId: '2',
        userId: '3',
        userName: 'Eduardo Reyes',
        content: 'Verifying account details and processing request.',
        isInternal: true,
        createdAt: '2024-03-15 10:20'
      }
    ]
  }
];