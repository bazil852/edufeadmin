import { Loanee } from '../types/loan';

export const dummyLoanees: Loanee[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    nationalId: 'ID123456789',
    dateOfBirth: '1985-06-15',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    loans: [
      {
        id: '1',
        referenceNumber: 'LOAN-2024-001',
        amount: 5000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        term: 12,
        interestRate: 8.5,
        penaltyRate: 2,
        status: 'active',
        purpose: 'Business expansion',
        paymentSchedule: 'monthly',
        nextPaymentDate: '2024-02-01',
        outstandingAmount: 4500,
        payments: [
          {
            id: '1',
            loanId: '1',
            amount: 500,
            paymentDate: '2024-01-15',
            paymentMethod: 'bank_transfer',
            receiptUrl: 'https://example.com/receipt1.pdf'
          }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  // Add more dummy data as needed
];

export const commonLoanPurposes = [
  'Business expansion',
  'Education',
  'Home improvement',
  'Debt consolidation',
  'Vehicle purchase',
  'Medical expenses',
  'Wedding expenses',
  'Travel',
  'Other'
];