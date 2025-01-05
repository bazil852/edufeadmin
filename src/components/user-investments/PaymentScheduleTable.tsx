import React from 'react';
import { User, Clock, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { PaymentSchedule } from '../../types/userInvestment';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface PaymentScheduleTableProps {
  schedule: PaymentSchedule[];
}

const PaymentScheduleTable: React.FC<PaymentScheduleTableProps> = ({ schedule }) => {
  const getStatusIcon = (status: PaymentSchedule['status']) => {
    switch (status) {
      case 'received': return <CheckCircle size={16} className="text-green-600" />;
      case 'in_progress': return <Clock size={16} className="text-blue-600" />;
      case 'canceled': return <XCircle size={16} className="text-red-600" />;
      case 'failed': return <AlertCircle size={16} className="text-red-600" />;
      default: return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: PaymentSchedule['status']) => {
    switch (status) {
      case 'received': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="text-left py-3 px-4">User</th>
            <th className="text-left py-3 px-4">Investment</th>
            <th className="text-left py-3 px-4">Payment Date</th>
            <th className="text-left py-3 px-4">Amount</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Generated On</th>
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((payment, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="font-medium">{payment.userName}</p>
                    <p className="text-sm text-gray-500">{payment.userEmail}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium">{payment.investmentName}</p>
                  <p className="text-sm text-gray-500">ID: {payment.investmentId}</p>
                </div>
              </td>
              <td className="py-3 px-4">{formatDate(payment.date)}</td>
              <td className="py-3 px-4">{formatCurrency(payment.amount)}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(payment.status)}
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                    {payment.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="text-sm">{formatDate(payment.generatedAt)}</p>
                  <p className="text-xs text-gray-500">By {payment.generatedBy}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    onClick={() => console.log('View details')}
                  >
                    View Details
                  </button>
                  {payment.status === 'pending' && (
                    <button 
                      className="text-green-600 hover:text-green-800 text-sm"
                      onClick={() => console.log('Mark as paid')}
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentScheduleTable;