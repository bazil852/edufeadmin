import React from 'react';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface UserFiltersProps {
  onFilterChange: (filters: {
    search: string;
    signupDate: string;
    portfolioValue: string;
  }) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          className="bg-gray-50 text-gray-900 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55] border"
          onChange={(e) => onFilterChange({ search: e.target.value, signupDate: '', portfolioValue: '' })}
        />
      </div>
      
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Calendar size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          onChange={(e) => onFilterChange({ search: '', signupDate: e.target.value, portfolioValue: '' })}
        >
          <option value="">Sign-up Date</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">Last 3 Months</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <DollarSign size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          onChange={(e) => onFilterChange({ search: '', signupDate: '', portfolioValue: e.target.value })}
        >
          <option value="">Portfolio Value</option>
          <option value="0-10000">$0 - $10,000</option>
          <option value="10000-50000">$10,000 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000+">$100,000+</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;