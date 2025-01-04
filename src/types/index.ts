export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  portfolio: {
    totalInvestment: number;
    activeInvestments: number;
  };
  joinedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  department: string;
  joinedAt: string;
  status: 'active' | 'inactive';
}

export interface Investment {
  id: string;
  title: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  expectedReturn: number;
  duration: string;
  status: 'active' | 'closed';
  createdAt: string;
}