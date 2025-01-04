import React from 'react';
import { TrendingUp, Users, Wallet, ArrowUpRight } from 'lucide-react';

const ReportsSummary: React.FC = () => {
  const summaryData = [
    {
      title: 'Total Investments',
      value: '$2.5M',
      change: '+15%',
      icon: TrendingUp,
    },
    {
      title: 'Active Investors',
      value: '1,234',
      change: '+8%',
      icon: Users,
    },
    {
      title: 'Average Investment',
      value: '$25,000',
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
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-semibold">{item.change}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mt-4">{item.value}</h3>
          <p className="text-gray-600">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportsSummary;