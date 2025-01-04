import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const ReportFilters: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Calendar size={20} className="text-gray-500" />
          <select className="bg-transparent border-none focus:ring-0">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>Custom range</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Filter size={20} className="text-gray-500" />
          <select className="bg-transparent border-none focus:ring-0">
            <option>All Investments</option>
            <option>Tech Growth Fund</option>
            <option>Real Estate</option>
            <option>Car Rental</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;