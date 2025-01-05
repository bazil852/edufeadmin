import React from 'react';
import { TrendingUp, Calendar, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface InvestmentDetailsProps {
  investment: {
    totalInvested: number;
    returnsReceived: number;
    remainingReturns: number;
    nextPaymentDate: string;
    status: string;
  };
}

const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ investment }) => {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <TrendingUp size={16} />
            <span className="text-sm">Total Invested</span>
          </div>
          <p className="text-2xl font-semibold text-[#114A55]">
            {formatCurrency(investment.totalInvested)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <TrendingUp size={16} />
            <span className="text-sm">Returns Received</span>
          </div>
          <p className="text-2xl font-semibold text-green-600">
            {formatCurrency(investment.returnsReceived)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <TrendingUp size={16} />
            <span className="text-sm">Remaining Returns</span>
          </div>
          <p className="text-2xl font-semibold text-blue-600">
            {formatCurrency(investment.remainingReturns)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Calendar size={16} />
            <span className="text-sm">Next Payment</span>
          </div>
          <p className="text-lg font-medium">{investment.nextPaymentDate}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Clock size={16} />
            <span className="text-sm">Status</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-sm ${
            investment.status === 'active' 
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {investment.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;