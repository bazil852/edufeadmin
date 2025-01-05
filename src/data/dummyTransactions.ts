import { Transaction } from '../types/transaction';

export const dummyTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    type: 'purchase',
    amount: 25000,
    status: 'completed',
    description: 'Investment in Tech Growth Fund',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    metadata: {
      portfolioId: 'PRT-001',
      portfolioName: 'Tech Growth Fund'
    }
  },
  {
    id: 'TRX-002',
    userId: '2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    type: 'withdrawal',
    amount: 5000,
    status: 'pending',
    description: 'Withdrawal request to bank account',
    createdAt: '2024-03-15T09:45:00Z',
    updatedAt: '2024-03-15T09:45:00Z',
    metadata: {
      withdrawalMethod: 'Bank Transfer'
    }
  },
  {
    id: 'TRX-003',
    userId: '3',
    userName: 'Michael Brown',
    userEmail: 'michael.b@example.com',
    type: 'exchange',
    amount: 10000,
    status: 'completed',
    description: 'Portfolio exchange from Tech Fund to Real Estate',
    createdAt: '2024-03-14T15:20:00Z',
    updatedAt: '2024-03-14T15:20:00Z',
    metadata: {
      fromCurrency: 'Tech Fund',
      toCurrency: 'Real Estate',
      exchangeRate: 1.05
    }
  },
  {
    id: 'TRX-004',
    userId: '4',
    userName: 'Emily Davis',
    userEmail: 'emily.d@example.com',
    type: 'listing',
    amount: 15000,
    status: 'completed',
    description: 'Listed Tech Fund shares on marketplace',
    createdAt: '2024-03-14T14:15:00Z',
    updatedAt: '2024-03-14T14:15:00Z',
    metadata: {
      listingId: 'LST-001',
      portfolioId: 'PRT-002'
    }
  },
  {
    id: 'TRX-005',
    userId: '5',
    userName: 'David Wilson',
    userEmail: 'david.w@example.com',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    description: 'Initial deposit for investment',
    createdAt: '2024-03-14T11:30:00Z',
    updatedAt: '2024-03-14T11:30:00Z',
    metadata: {
      depositMethod: 'Wire Transfer'
    }
  }
];