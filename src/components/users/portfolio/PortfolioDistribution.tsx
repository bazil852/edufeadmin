import React from 'react';
import { formatCurrency } from '../../../utils/formatters';

interface PortfolioDistribution {
  name: string;
  amount: number;
  percentage: number;
}

interface PortfolioDistributionProps {
  distributions: PortfolioDistribution[];
}

const PortfolioDistribution: React.FC<PortfolioDistributionProps> = ({ distributions }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Portfolio Distribution</h3>
      <div className="space-y-4">
        {distributions.map((dist) => (
          <div key={dist.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{dist.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(dist.amount)} ({dist.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#114A55] h-2 rounded-full"
                style={{ width: `${dist.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDistribution;