import React from 'react';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';

const LoaneeFilters: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search loanees..."
          className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55]"
        />
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Filter size={20} className="text-gray-500" />
        <select className="bg-transparent border-none focus:ring-0">
          <option value="">Loan Status</option>
          <option value="active">Active Loans</option>
          <option value="pending">Pending Approval</option>
          <option value="settled">Settled</option>
          <option value="defaulted">Defaulted</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <DollarSign size={20} className="text-gray-500" />
        <select className="bg-transparent border-none focus:ring-0">
          <option value="">Loan Amount</option>
          <option value="0-1000">$0 - $1,000</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000+">$10,000+</option>
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Calendar size={20} className="text-gray-500" />
        <select className="bg-transparent border-none focus:ring-0">
          <option value="">Payment Status</option>
          <option value="upcoming">Upcoming Payments</option>
          <option value="overdue">Overdue Payments</option>
          <option value="paid">Paid This Month</option>
        </select>
      </div>
    </div>
  );
};

export default LoaneeFilters;