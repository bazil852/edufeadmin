export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  swiftCode: string;
  branch: string;
  isPreferred: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'hold';
  portfolio: {
    totalInvestment: number;
    activeInvestments: number;
  };
  joinedAt: string;
  bankAccounts: BankAccount[];
}