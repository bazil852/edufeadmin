import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';
import { Loanee } from '../../types/loan';
import ActionMenu from '../ActionMenu';
import { formatCurrency } from '../../utils/formatters';

interface LoaneeListProps {
  loanees: Loanee[];
  onView: (loanee: Loanee) => void;
}

const LoaneeList: React.FC<LoaneeListProps> = ({ loanees, onView }) => {
  const getTotalLoans = (loanee: Loanee) => {
    return loanee.loans.reduce((sum, loan) => sum + loan.amount, 0);
  };

  const getActiveLoans = (loanee: Loanee) => {
    return loanee.loans.filter(loan => loan.status === 'active').length;
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Contact</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Total Loans</th>
              <th className="text-left py-3 px-4">Active Loans</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanees.map((loanee) => (
              <tr key={loanee.id} className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <div>
                      <p className="font-medium">{loanee.name}</p>
                      <p className="text-sm text-gray-500">{loanee.nationalId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <div>
                      <p>{loanee.phone}</p>
                      <p className="text-sm text-gray-500">{loanee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{`${loanee.location.city}, ${loanee.location.country}`}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {formatCurrency(getTotalLoans(loanee))}
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {getActiveLoans(loanee)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <ActionMenu
                    onView={() => onView(loanee)}
                    onEdit={() => console.log('Edit:', loanee)}
                    onDelete={() => console.log('Delete:', loanee)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoaneeList;