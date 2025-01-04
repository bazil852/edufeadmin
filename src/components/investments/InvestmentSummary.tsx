import React from 'react';
import { TrendingUp, Users, Wallet } from 'lucide-react';

const InvestmentSummary: React.FC = () => {
  const summaryData = [
    {
      title: 'Total Invested',
      value: '$1.2M',
      change: '+15%',
      icon: TrendingUp,
    },
    {
      title: 'Active Investments',
      value: '156',
      change: '+8%',
      icon: Users,
    },
    {
      title: 'Total Returns',
      value: '$180K',
      change: '+12%',
      icon: Wallet,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryData.map((item) => (
        <div key={item.title} className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <item.icon size={24} className="text-[#114A55]" />
            <span className="text-green-600 text-sm font-semibold">{item.change}</span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{item.value}</h3>
          <p className="text-gray-600">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default InvestmentSummary;