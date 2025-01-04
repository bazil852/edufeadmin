import React from 'react';
import { Users, TrendingUp, Wallet, AlertCircle, ArrowUpRight, Clock, FileCheck } from 'lucide-react';
import { recentActivities } from '../data/dummyData';

const Dashboard: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%' },
    { icon: TrendingUp, label: 'Total Investments', value: '$2.5M', change: '+8%' },
    { icon: Wallet, label: 'Active Portfolios', value: '890', change: '+15%' },
    { icon: AlertCircle, label: 'Pending KYC', value: '45', change: '-5%' },
  ];

  const investmentData = [
    { label: 'Tech Growth Fund', value: 35 },
    { label: 'Real Estate', value: 25 },
    { label: 'Car Rental', value: 20 },
    { label: 'Retail Spaces', value: 15 },
    { label: 'E-commerce', value: 5 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <stat.icon className="text-[#114A55]" size={24} />
              <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-[#114A55] mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'investment' ? 'bg-green-100' :
                  activity.type === 'kyc' ? 'bg-blue-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'investment' ? <TrendingUp size={16} className="text-green-600" /> :
                   activity.type === 'kyc' ? <FileCheck size={16} className="text-blue-600" /> :
                   <Clock size={16} className="text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  {activity.amount && (
                    <p className="text-sm font-medium text-green-600">${activity.amount.toLocaleString()}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-[#114A55] mb-4">Investment Overview</h3>
          <div className="space-y-4">
            {investmentData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#114A55] h-2 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;