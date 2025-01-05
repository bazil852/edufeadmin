import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Tag, ArrowDown, ArrowUp } from 'lucide-react';
import { Transaction, TransactionType } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatters';
import { formatActivityDate } from '../../utils/dateUtils';

interface TransactionListProps {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onViewDetails
}) => {
  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'purchase': return ArrowDownRight;
      case 'sale': return ArrowUpRight;
      case 'exchange': return RefreshCw;
      case 'listing': return Tag;
      case 'withdrawal': return ArrowUp;
      case 'deposit': return ArrowDown;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              return (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-[#114A55]" />
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{transaction.userName}</p>
                      <p className="text-sm text-gray-500">{transaction.userEmail}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {formatActivityDate(transaction.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onViewDetails(transaction)}
                      className="text-[#114A55] hover:text-[#114A55]/80 text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;