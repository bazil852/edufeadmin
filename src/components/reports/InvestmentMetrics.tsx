import React from 'react';

const InvestmentMetrics: React.FC = () => {
  const metrics = [
    { name: 'Tech Growth Fund', amount: '$800,000', percentage: 32 },
    { name: 'Real Estate Portfolio', amount: '$650,000', percentage: 26 },
    { name: 'Car Rental Fleet', amount: '$450,000', percentage: 18 },
    { name: 'Retail Spaces', amount: '$350,000', percentage: 14 },
    { name: 'E-commerce Ventures', amount: '$250,000', percentage: 10 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-xl font-semibold text-[#114A55] mb-6">Investment Distribution</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{metric.name}</span>
              <span className="text-sm font-medium text-gray-900">{metric.amount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#114A55] h-2 rounded-full"
                style={{ width: `${metric.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentMetrics;