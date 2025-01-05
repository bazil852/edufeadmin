import React from 'react';
import { Clock, DollarSign, ArrowRight } from 'lucide-react';
import { TransferDetails } from '../../types/userInvestment';
import { formatCurrency } from '../../utils/formatters';

interface TransferSummaryProps {
  details: TransferDetails;
}

const TransferSummary: React.FC<TransferSummaryProps> = ({ details }) => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <DollarSign size={16} />
            <span className="text-sm">Account Balance</span>
          </div>
          <p className="text-2xl font-semibold text-green-600">
            {formatCurrency(details.accountBalance)}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <ArrowRight size={16} />
            <span className="text-sm">Pending Transfers</span>
          </div>
          <p className="text-2xl font-semibold text-blue-600">
            {formatCurrency(details.pendingTransfers)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock size={16} />
          <span className="text-sm">Transfer Details</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Expected Fees:</span>
            <span className="font-medium">{formatCurrency(details.expectedFees)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated Arrival:</span>
            <span className="font-medium">{details.estimatedArrivalTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferSummary;