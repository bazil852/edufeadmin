import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Investment {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  returnRate: number;
  status: string;
}

interface InvestmentListProps {
  investments: Investment[];
  onSelect: (id: string) => void;
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments, onSelect }) => {
  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">Investment</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Period</th>
              <th className="text-left py-3 px-4">Return Rate</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#114A55]" />
                    <span className="font-medium">{investment.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{formatCurrency(investment.amount)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{investment.startDate} - {investment.endDate}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-green-600">+{investment.returnRate}%</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    investment.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {investment.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onSelect(investment.id)}
                    className="text-[#114A55] hover:text-[#114A55]/80"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentList;