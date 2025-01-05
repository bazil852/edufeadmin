import { UserInvestment } from '../types/userInvestment';

export const dummyUserInvestments: UserInvestment[] = [
  {
    id: '1',
    userId: '123',
    userName: 'John Smith',
    investmentId: 'inv_1',
    investmentName: 'Tech Growth Fund',
    amount: 50000,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    gracePeriod: {
      startDate: '2024-03-01',
      endDate: '2024-05-01'
    },
    returnRate: 12,
    totalReturns: 6000,
    receivedReturns: 1000,
    remainingReturns: 5000,
    nextPaymentDate: '2024-04-01',
    paymentSchedule: [
      {
        date: '2024-03-03',
        amount: 500,
        status: 'received',
        userName: 'John Smith',
        userEmail: 'john.smith@example.com',
        investmentId: 'inv_1',
        investmentName: 'Tech Growth Fund',
        generatedAt: '2024-02-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-04-03',
        amount: 500,
        status: 'in_progress',
        userName: 'John Smith',
        userEmail: 'john.smith@example.com',
        investmentId: 'inv_1',
        investmentName: 'Tech Growth Fund',
        generatedAt: '2024-03-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-05-03',
        amount: 500,
        status: 'pending',
        userName: 'John Smith',
        userEmail: 'john.smith@example.com',
        investmentId: 'inv_1',
        investmentName: 'Tech Growth Fund',
        generatedAt: '2024-03-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-06-03',
        amount: 500,
        status: 'pending',
        userName: 'John Smith',
        userEmail: 'john.smith@example.com',
        investmentId: 'inv_1',
        investmentName: 'Tech Growth Fund',
        generatedAt: '2024-03-01T10:00:00Z',
        generatedBy: 'System Admin'
      }
    ],
    status: 'active'
  },
  {
    id: '2',
    userId: '124',
    userName: 'Sarah Johnson',
    investmentId: 'inv_2',
    investmentName: 'Real Estate Portfolio',
    amount: 75000,
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    gracePeriod: {
      startDate: '2024-02-01',
      endDate: '2024-04-01'
    },
    returnRate: 10,
    totalReturns: 7500,
    receivedReturns: 1250,
    remainingReturns: 6250,
    nextPaymentDate: '2024-04-01',
    paymentSchedule: [
      {
        date: '2024-02-03',
        amount: 625,
        status: 'received',
        userName: 'Sarah Johnson',
        userEmail: 'sarah.j@example.com',
        investmentId: 'inv_2',
        investmentName: 'Real Estate Portfolio',
        generatedAt: '2024-01-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-03-03',
        amount: 625,
        status: 'received',
        userName: 'Sarah Johnson',
        userEmail: 'sarah.j@example.com',
        investmentId: 'inv_2',
        investmentName: 'Real Estate Portfolio',
        generatedAt: '2024-02-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-04-03',
        amount: 625,
        status: 'pending',
        userName: 'Sarah Johnson',
        userEmail: 'sarah.j@example.com',
        investmentId: 'inv_2',
        investmentName: 'Real Estate Portfolio',
        generatedAt: '2024-03-01T10:00:00Z',
        generatedBy: 'System Admin'
      }
    ],
    status: 'active'
  },
  {
    id: '3',
    userId: '125',
    userName: 'Michael Brown',
    investmentId: 'inv_3',
    investmentName: 'Car Rental Fleet',
    amount: 30000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    gracePeriod: {
      startDate: '2024-01-01',
      endDate: '2024-03-01'
    },
    returnRate: 15,
    totalReturns: 4500,
    receivedReturns: 750,
    remainingReturns: 3750,
    nextPaymentDate: '2024-04-01',
    paymentSchedule: [
      {
        date: '2024-01-03',
        amount: 375,
        status: 'received',
        userName: 'Michael Brown',
        userEmail: 'michael.b@example.com',
        investmentId: 'inv_3',
        investmentName: 'Car Rental Fleet',
        generatedAt: '2023-12-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-02-03',
        amount: 375,
        status: 'received',
        userName: 'Michael Brown',
        userEmail: 'michael.b@example.com',
        investmentId: 'inv_3',
        investmentName: 'Car Rental Fleet',
        generatedAt: '2024-01-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-03-03',
        amount: 375,
        status: 'failed',
        userName: 'Michael Brown',
        userEmail: 'michael.b@example.com',
        investmentId: 'inv_3',
        investmentName: 'Car Rental Fleet',
        generatedAt: '2024-02-01T10:00:00Z',
        generatedBy: 'System Admin'
      },
      {
        date: '2024-04-03',
        amount: 375,
        status: 'pending',
        userName: 'Michael Brown',
        userEmail: 'michael.b@example.com',
        investmentId: 'inv_3',
        investmentName: 'Car Rental Fleet',
        generatedAt: '2024-03-01T10:00:00Z',
        generatedBy: 'System Admin'
      }
    ],
    status: 'active'
  }
];