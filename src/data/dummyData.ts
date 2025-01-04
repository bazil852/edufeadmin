import { User, Employee } from '../types';

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Hernández',
    email: 'carlos.h@example.com',
    role: 'user',
    isVerified: true,
    kycStatus: 'verified',
    portfolio: { totalInvestment: 75000, activeInvestments: 3 },
    joinedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Isabella Mejía',
    email: 'isabella.m@example.com',
    role: 'user',
    isVerified: true,
    kycStatus: 'verified',
    portfolio: { totalInvestment: 120000, activeInvestments: 4 },
    joinedAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Luis Fernando Paz',
    email: 'luis.paz@example.com',
    role: 'user',
    isVerified: true,
    kycStatus: 'pending',
    portfolio: { totalInvestment: 45000, activeInvestments: 2 },
    joinedAt: '2024-02-15'
  },
  {
    id: '4',
    name: 'Ana María Santos',
    email: 'ana.santos@example.com',
    role: 'user',
    isVerified: false,
    kycStatus: 'pending',
    portfolio: { totalInvestment: 25000, activeInvestments: 1 },
    joinedAt: '2024-03-01'
  },
  {
    id: '5',
    name: 'José David Rodriguez',
    email: 'jose.r@example.com',
    role: 'user',
    isVerified: true,
    kycStatus: 'verified',
    portfolio: { totalInvestment: 95000, activeInvestments: 3 },
    joinedAt: '2024-02-20'
  }
];

export const dummyEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sofia Valladares',
    email: 'sofia.v@edufe.com',
    role: 'Investment Advisor',
    department: 'Finance',
    joinedAt: '2023-06-15'
  },
  {
    id: '2',
    name: 'Eduardo Reyes',
    email: 'eduardo.r@edufe.com',
    role: 'Financial Analyst',
    department: 'Finance',
    joinedAt: '2023-08-01'
  },
  {
    id: '3',
    name: 'Carmen Flores',
    email: 'carmen.f@edufe.com',
    role: 'Customer Support',
    department: 'Support',
    joinedAt: '2023-09-15'
  },
  {
    id: '4',
    name: 'Roberto Mendoza',
    email: 'roberto.m@edufe.com',
    role: 'HR Manager',
    department: 'HR',
    joinedAt: '2023-07-01'
  }
];

export const recentActivities = [
  {
    id: '1',
    type: 'investment',
    user: 'Carlos Hernández',
    action: 'New investment in Tech Growth Fund',
    amount: 25000,
    timestamp: '2024-03-15 14:30'
  },
  {
    id: '2',
    type: 'kyc',
    user: 'Ana María Santos',
    action: 'KYC documents submitted',
    timestamp: '2024-03-15 13:45'
  },
  {
    id: '3',
    type: 'withdrawal',
    user: 'Isabella Mejía',
    action: 'Withdrawal request',
    amount: 5000,
    timestamp: '2024-03-15 11:20'
  },
  {
    id: '4',
    type: 'investment',
    user: 'José David Rodriguez',
    action: 'New investment in Real Estate Portfolio',
    amount: 50000,
    timestamp: '2024-03-15 10:15'
  },
  {
    id: '5',
    type: 'kyc',
    user: 'Luis Fernando Paz',
    action: 'KYC verification completed',
    timestamp: '2024-03-15 09:30'
  }
];