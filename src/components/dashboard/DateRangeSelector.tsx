import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  onChange: (range: string) => void;
  value: string;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onChange, value }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
      <Calendar size={20} className="text-gray-500" />
      <select 
        className="bg-transparent border-none focus:ring-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="24h">Last 24 Hours</option>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="90d">Last 90 Days</option>
        <option value="1y">Last Year</option>
        <option value="custom">Custom Range</option>
      </select>
    </div>
  );
};

export default DateRangeSelector;