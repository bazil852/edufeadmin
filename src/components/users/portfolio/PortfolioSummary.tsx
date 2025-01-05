import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface PortfolioSummaryProps {
  totalPortfolios: number;
  totalWorth: number;
  nextPayout: {
    date: string;
    amount: number;
  };
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalPortfolios,
  totalWorth,
  nextPayout
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <TrendingUp size={16} />
          <span className="text-sm">Total Portfolios</span>
        </div>
        <p className="text-2xl font-semibold">{totalPortfolios}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <TrendingUp size={16} />
          <span className="text-sm">Total Worth</span>
        </div>
        <p className="text-2xl font-semibold">{formatCurrency(totalWorth)}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <TrendingUp size={16} />
          <span className="text-sm">Next Payout</span>
        </div>
        <p className="text-2xl font-semibold">{formatCurrency(nextPayout.amount)}</p>
        <p className="text-sm text-gray-500">{nextPayout.date}</p>
      </div>
    </div>
  );
};

export default PortfolioSummary;