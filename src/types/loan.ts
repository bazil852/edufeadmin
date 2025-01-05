export type LoanStatus = 'active' | 'pending' | 'settled' | 'defaulted';
export type PaymentMethod = 'bank_transfer' | 'cash' | 'online_payment';

export interface LoanPayment {
  id: string;
  loanId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  receiptUrl?: string;
  notes?: string;
}

export interface Guarantor {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface Collateral {
  id: string;
  type: string;
  description: string;
  estimatedValue: number;
  documents: string[];
}

export interface Loan {
  id: string;
  referenceNumber: string;
  amount: number;
  startDate: string;
  endDate: string;
  term: number;
  interestRate: number;
  penaltyRate: number;
  status: LoanStatus;
  purpose: string;
  paymentSchedule: 'monthly' | 'quarterly';
  nextPaymentDate: string;
  outstandingAmount: number;
  collateral?: Collateral;
  guarantor?: Guarantor;
  payments: LoanPayment[];
  notes?: string;
}

export interface Loanee {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  loans: Loan[];
  createdAt: string;
  updatedAt: string;
}