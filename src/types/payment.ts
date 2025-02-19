export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type PaymentType = 'capital' | 'interest';

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  investmentId: string;
  investmentName: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  scheduledDate: string;
  processedDate?: string;
  receiptUrl?: string;
  pixelpayReference?: string;
}

export interface PaymentSchedule {
  id: string;
  day: number;
  type: PaymentType;
  isActive: boolean;
  lastRun?: string;
  nextRun: string;
  description: string;
}

export interface AccountsPayable {
  userId: string;
  userName: string;
  investmentId: string;
  investmentName: string;
  capitalAmount: number;
  interestAmount: number;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  totalPaid: number;
  remainingBalance: number;
}