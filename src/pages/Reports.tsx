import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import ReportsSummary from '../components/reports/ReportsSummary';
import InvestmentMetrics from '../components/reports/InvestmentMetrics';
import UserActivityChart from '../components/reports/UserActivityChart';
import ReportFilters from '../components/reports/ReportFilters';
import { useAuth } from '../contexts/AuthContext';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyReports');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyReports', newValue.toString());
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800"
          alt="Coming Soon"
          className="w-50 h-40 object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          Advanced Analytics Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're developing a comprehensive analytics and reporting system to help you
          gain valuable insights into your platform's performance and user behavior.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Real-time performance metrics</li>
            <li>• Custom report generation</li>
            <li>• Advanced data visualization</li>
            <li>• Automated reporting schedules</li>
          </ul>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            onClick={toggleDummyPage}
            className="mt-8 px-6 py-3 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 transition-colors"
          >
            View Demo Version
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Reports</h2>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Demo Version</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDummyPage}
            className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
          >
            Back to Coming Soon
          </button>
          <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
            <Download size={20} />
            Export Report
          </button>
        </div>
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