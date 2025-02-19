import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface AuditFiltersProps {
  onFilterChange: (filters: {
    search: string;
    action: string;
    dateRange: string;
  }) => void;
}

const AuditFilters: React.FC<AuditFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    dateRange: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55]"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Filter size={20} className="text-gray-500" />
          <select 
            className="bg-transparent border-none focus:ring-0"
            value={filters.action}
            onChange={(e) => handleFilterChange('action', e.target.value)}
          >
            <option value="">All Actions</option>
            <option value="User">User Actions</option>
            <option value="KYC">KYC Actions</option>
            <option value="Investment">Investment Actions</option>
            <option value="Employee">Employee Actions</option>
            <option value="Educational">Educational Actions</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Calendar size={20} className="text-gray-500" />
          <select 
            className="bg-transparent border-none focus:ring-0"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AuditFilters;