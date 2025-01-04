import React from 'react';
import { Search, Filter } from 'lucide-react';

const ChatFilters: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#114A55]"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-500" />
        <select className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#114A55]">
          <option value="all">All Chats</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
};

export default ChatFilters;