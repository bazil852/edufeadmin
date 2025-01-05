import React from 'react';
import { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatters';
import { formatActivityDate } from '../../utils/dateUtils';
import Modal from '../Modal';

interface TransactionDetailsProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  isOpen,
  onClose
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-medium">{transaction.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium capitalize">{transaction.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">{formatCurrency(transaction.amount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs ${
              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {transaction.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-1">{transaction.description}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">User Information</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium">{transaction.userName}</p>
            <p className="text-sm text-gray-600">{transaction.userEmail}</p>
          </div>
        </div>

        {transaction.metadata && Object.keys(transaction.metadata).length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Additional Details</p>
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              {Object.entries(transaction.metadata).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">{formatActivityDate(transaction.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">{formatActivityDate(transaction.updatedAt)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetails;