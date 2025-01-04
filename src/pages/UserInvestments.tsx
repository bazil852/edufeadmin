import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import InvestmentTable from '../components/investments/InvestmentTable';
import InvestmentSummary from '../components/investments/InvestmentSummary';
import InvestmentFilters from '../components/investments/InvestmentFilters';

const UserInvestments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">User Investments</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
          <Download size={20} />
          Export Data
        </button>
      </div>

      <InvestmentSummary />
      <InvestmentFilters />
      <InvestmentTable />
    </div>
  );
};

export default UserInvestments;