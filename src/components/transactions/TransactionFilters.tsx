import React from 'react';
import { Search, Filter, Calendar, ArrowDownUp } from 'lucide-react';

interface TransactionFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onDateChange: (date: string) => void;
  onSortChange: (sort: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onSearch,
  onFilterChange,
  onDateChange,
  onSortChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search transactions..."
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#114A55]"
        />
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Filter size={20} className="text-gray-500" />
        <select 
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-transparent border-none focus:ring-0"
        >
          <option value="all">All Types</option>
          <option value="purchase">Purchases</option>
          <option value="sale">Sales</option>
          <option value="exchange">Exchanges</option>
          <option value="listing">Listings</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="deposit">Deposits</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Calendar size={20} className="text-gray-500" />
        <select 
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-transparent border-none focus:ring-0"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <ArrowDownUp size={20} className="text-gray-500" />
        <select 
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-transparent border-none focus:ring-0"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="amount_desc">Amount (High to Low)</option>
          <option value="amount_asc">Amount (Low to High)</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionFilters;