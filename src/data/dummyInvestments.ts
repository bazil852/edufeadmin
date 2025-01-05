import { Investment } from '../types/investment';

export const dummyInvestments: Investment[] = [
  {
    id: '1',
    title: 'Tech Growth Fund',
    description: 'High-growth technology companies portfolio',
    minInvestmentAmount: 500,
    roiConditions: [
      { months: 12, minAmount: 500, roiPercentage: 12 },
      { months: 24, minAmount: 500, roiPercentage: 13 },
      { months: 36, minAmount: 500, roiPercentage: 14 }
    ],
    edufeMargin: 25,
    status: 'active',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Real Estate Portfolio',
    description: 'Premium commercial properties in prime locations',
    minInvestmentAmount: 1000,
    roiConditions: [
      { months: 24, minAmount: 1000, roiPercentage: 13 },
      { months: 36, minAmount: 1000, roiPercentage: 14 },
      { months: 48, minAmount: 1000, roiPercentage: 15 }
    ],
    edufeMargin: 25,
    status: 'active',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Car Rental Fleet',
    description: 'Luxury and electric vehicle rental business',
    minInvestmentAmount: 750,
    roiConditions: [
      { months: 12, minAmount: 750, roiPercentage: 12 },
      { months: 24, minAmount: 750, roiPercentage: 13 },
      { months: 36, minAmount: 750, roiPercentage: 14 }
    ],
    edufeMargin: 25,
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Retail Spaces',
    description: 'High-traffic retail locations portfolio',
    minInvestmentAmount: 1500,
    roiConditions: [
      { months: 36, minAmount: 1500, roiPercentage: 14 },
      { months: 48, minAmount: 1500, roiPercentage: 15 },
      { months: 60, minAmount: 1500, roiPercentage: 16 }
    ],
    edufeMargin: 25,
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '5',
    title: 'E-commerce Ventures',
    description: 'Digital retail and marketplace investments',
    minInvestmentAmount: 500,
    roiConditions: [
      { months: 12, minAmount: 500, roiPercentage: 12 },
      { months: 24, minAmount: 500, roiPercentage: 13 },
      { months: 36, minAmount: 500, roiPercentage: 14 }
    ],
    edufeMargin: 25,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];