import React from 'react';
import { Filter, Calendar } from 'lucide-react';

interface InvestmentFiltersProps {
  onFilterChange: (filter: string) => void;
}

const InvestmentFilters: React.FC<InvestmentFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Calendar size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Payments</option>
          <option value="due_now">Due Now</option>
          <option value="due_tomorrow">Due Tomorrow</option>
          <option value="due_week">Due Next 7 Days</option>
          <option value="due_month">Due This Month</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Filter size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
    </div>
  );
};

export default InvestmentFilters;