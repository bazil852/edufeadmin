import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { categories, tags } from '../../data/dummyEducationalContent';

const ContentFilters: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search content..."
          className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#114A55]"
        />
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Filter size={20} className="text-gray-500" />
        <select className="bg-transparent border-none focus:ring-0">
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
        <Calendar size={20} className="text-gray-500" />
        <select className="bg-transparent border-none focus:ring-0">
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>
  );
};

export default ContentFilters;