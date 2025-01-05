import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface Investment {
  id: string;
  name: string;
  amount: number;
  returnRate: number;
  startDate: string;
  endDate: string;
}

interface PortfolioInvestment {
  name: string;
  investments: Investment[];
}

interface PortfolioInvestmentsProps {
  portfolios: PortfolioInvestment[];
}

const PortfolioInvestments: React.FC<PortfolioInvestmentsProps> = ({ portfolios }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Portfolio Investments</h3>
      {portfolios.map((portfolio) => (
        <div key={portfolio.name} className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">{portfolio.name}</h4>
          <div className="space-y-4">
            {portfolio.investments.map((investment) => (
              <div key={investment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-medium">{investment.name}</h5>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Calendar size={16} />
                      <span>{investment.startDate} - {investment.endDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(investment.amount)}</div>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp size={16} />
                      <span>+{investment.returnRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioInvestments;