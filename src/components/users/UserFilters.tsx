import React ,{useState} from 'react';
import { Search, Filter, Calendar, Shield, Phone } from 'lucide-react';

interface UserFiltersProps {
  onFilterChange: (filters: {
    search: string;
    role: string;
    kycStatus: string;
    verificationStatus: string;
    dateRange: string;
  }) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    kycStatus: '',
    verificationStatus: '',
    dateRange: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="bg-gray-50 text-gray-900 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55] border"
        />
      </div>
      
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Filter size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          value={filters.role}
          onChange={(e) => handleFilterChange('role', e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="INVESTOR">Investors</option>
          <option value="ADMIN">Admins</option>
          <option value="SUPPORT">Support</option>
          <option value="MANAGER">Managers</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Shield size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          value={filters.kycStatus}
          onChange={(e) => handleFilterChange('kycStatus', e.target.value)}
        >
          <option value="">All KYC Status</option>
          <option value="VERIFIED">Verified</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
          <option value="NOT_SUBMITTED">Not Submitted</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Phone size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          value={filters.verificationStatus}
          onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
        >
          <option value="">All Verification</option>
          <option value="BOTH">Fully Verified</option>
          <option value="EMAIL">Email Only</option>
          <option value="PHONE">Phone Only</option>
          <option value="NONE">Not Verified</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Calendar size={20} className="text-gray-500" />
        <select 
          className="bg-transparent border-none focus:ring-0"
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">Last 3 Months</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;