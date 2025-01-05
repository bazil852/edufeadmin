import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import DateRangeSelector from './DateRangeSelector';

interface ROICardProps {
  title: string;
  value: number;
  percentage: number;
}

const ROICard: React.FC<ROICardProps> = ({ title, value, percentage }) => {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>
      <div className="flex items-end gap-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">${value.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-600">+{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICard;