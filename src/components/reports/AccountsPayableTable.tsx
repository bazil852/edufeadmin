import React from 'react';
import { Eye, DollarSign } from 'lucide-react';
import { AccountsPayable } from '../../types/payment';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface AccountsPayableTableProps {
  accounts: AccountsPayable[];
  onProcessPayment: (accountId: string) => void;
  onViewDetails: (accountId: string) => void;
}

const AccountsPayableTable: React.FC<AccountsPayableTableProps> = ({
  accounts,
  onProcessPayment,
  onViewDetails
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="text-left py-3 px-4">User</th>
            <th className="text-left py-3 px-4">Investment</th>
            <th className="text-left py-3 px-4">Capital Due</th>
            <th className="text-left py-3 px-4">Interest Due</th>
            <th className="text-left py-3 px-4">Next Payment</th>
            <th className="text-left py-3 px-4">Total Paid</th>
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={`${account.userId}-${account.investmentId}`} className="border-b">
              <td className="py-3 px-4">{account.userName}</td>
              <td className="py-3 px-4">{account.investmentName}</td>
              <td className="py-3 px-4">{formatCurrency(account.capitalAmount)}</td>
              <td className="py-3 px-4">{formatCurrency(account.interestAmount)}</td>
              <td className="py-3 px-4">{formatDate(account.nextPaymentDate)}</td>
              <td className="py-3 px-4">{formatCurrency(account.totalPaid)}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetails(`${account.userId}-${account.investmentId}`)}
                    className="p-1 text-gray-600 hover:text-[#114A55]"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onProcessPayment(`${account.userId}-${account.investmentId}`)}
                    className="p-1 text-gray-600 hover:text-[#114A55]"
                    title="Process Payment"
                  >
                    <DollarSign size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPayableTable;