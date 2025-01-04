import React from 'react';
import { Search, Filter, Clock } from 'lucide-react';

const TicketFilters: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tickets..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55]"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Filter size={20} className="text-gray-500" />
          <select className="bg-transparent border-none focus:ring-0">
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Clock size={20} className="text-gray-500" />
          <select className="bg-transparent border-none focus:ring-0">
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;