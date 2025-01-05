export type TransactionType = 
  | 'purchase'
  | 'sale'
  | 'exchange'
  | 'listing'
  | 'withdrawal'
  | 'deposit';

export type TransactionStatus = 
  | 'completed'
  | 'pending'
  | 'failed'
  | 'cancelled';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    portfolioId?: string;
    portfolioName?: string;
    exchangeRate?: number;
    fromCurrency?: string;
    toCurrency?: string;
    listingId?: string;
    withdrawalMethod?: string;
    depositMethod?: string;
  };
}