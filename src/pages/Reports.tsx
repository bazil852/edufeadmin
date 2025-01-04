import React from 'react';
import { Download } from 'lucide-react';
import ReportsSummary from '../components/reports/ReportsSummary';
import InvestmentMetrics from '../components/reports/InvestmentMetrics';
import UserActivityChart from '../components/reports/UserActivityChart';
import ReportFilters from '../components/reports/ReportFilters';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Reports</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
          <Download size={20} />
          Export Report
        </button>
      </div>

      <ReportFilters />
      <ReportsSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvestmentMetrics />
        <UserActivityChart />
      </div>
    </div>
  );
};

export default Reports;