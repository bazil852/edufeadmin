import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import DateRangeSelector from './DateRangeSelector';

interface AverageMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  suffix?: string;
}

const AverageMetricCard: React.FC<AverageMetricCardProps> = ({ title, value, icon: Icon, suffix }) => {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon size={24} className="text-[#114A55]" />
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageMetricCard;