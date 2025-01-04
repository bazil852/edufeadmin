import React from 'react';
import ActionMenu from '../ActionMenu';

const InvestmentTable: React.FC = () => {
  const investments = [
    {
      id: 1,
      user: 'John Doe',
      package: 'Tech Growth Fund',
      amount: 25000,
      date: '2024-03-15',
      status: 'active',
      returns: 2800,
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      package: 'Real Estate Portfolio',
      amount: 50000,
      date: '2024-03-10',
      status: 'pending',
      returns: 4200,
    },
    // Add more dummy data as needed
  ];

  const handleView = (investment: any) => {
    console.log('View investment:', investment);
  };

  const handleEdit = (investment: any) => {
    console.log('Edit investment:', investment);
  };

  const handleDelete = (investment: any) => {
    console.log('Delete investment:', investment);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Investment Package</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Returns</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id} className="border-b">
                <td className="py-3 px-4">{investment.user}</td>
                <td className="py-3 px-4">{investment.package}</td>
                <td className="py-3 px-4">${investment.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{investment.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    investment.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {investment.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-green-600">+${investment.returns.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <ActionMenu
                    onView={() => handleView(investment)}
                    onEdit={() => handleEdit(investment)}
                    onDelete={() => handleDelete(investment)}
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

export default InvestmentTable;