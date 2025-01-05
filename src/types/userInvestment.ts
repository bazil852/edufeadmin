export interface PaymentSchedule {
  date: string;
  amount: number;
  status: 'pending' | 'received' | 'in_progress' | 'canceled' | 'failed';
  userName: string;
  userEmail: string;
  investmentId: string;
  investmentName: string;
  generatedAt: string;
  generatedBy: string;
}

// ... rest of the file remains the same