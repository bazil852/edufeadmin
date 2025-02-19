import React, { useState } from 'react';
import { Download, Calendar, Filter, Search } from 'lucide-react';
import { AccountsPayable, PaymentSchedule } from '../types/payment';
import AccountsPayableTable from '../components/reports/AccountsPayableTable';
import PaymentScheduleCard from '../components/reports/PaymentScheduleCard';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('all');
  const [investmentType, setInvestmentType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy payment schedules
  const [schedules] = useState<PaymentSchedule[]>([
    {
      id: '1',
      day: 15,
      type: 'interest',
      isActive: true,
      nextRun: '2024-04-15',
      description: 'Monthly interest payments for all active investments'
    },
    {
      id: '2',
      day: 30,
      type: 'capital',
      isActive: true,
      nextRun: '2024-04-30',
      description: 'Capital repayments for completed investment terms'
    }
  ]);

  // Dummy accounts payable data
  const [accountsPayable] = useState<AccountsPayable[]>([
    {
      userId: '1',
      userName: 'John Smith',
      investmentId: 'inv_1',
      investmentName: 'Tech Growth Fund',
      capitalAmount: 10000,
      interestAmount: 1200,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      nextPaymentDate: '2024-04-15',
      totalPaid: 2400,
      remainingBalance: 8800
    },
    {
      userId: '2',
      userName: 'Sarah Johnson',
      investmentId: 'inv_2',
      investmentName: 'Real Estate Portfolio',
      capitalAmount: 25000,
      interestAmount: 2500,
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      nextPaymentDate: '2024-04-15',
      totalPaid: 5000,
      remainingBalance: 22500
    }
  ]);

  const handleToggleSchedule = (id: string) => {
    console.log('Toggle schedule:', id);
  };

  const handleProcessPayment = (accountId: string) => {
    console.log('Process payment:', accountId);
  };

  const handleViewDetails = (accountId: string) => {
    console.log('View details:', accountId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Accounts Payable</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg hover:bg-[#114A55]/90 flex items-center gap-2">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Payment Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {schedules.map(schedule => (
          <PaymentScheduleCard
            key={schedule.id}
            schedule={schedule}
            onToggle={handleToggleSchedule}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by user or investment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#114A55]"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Calendar size={20} className="text-gray-500" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent border-none focus:ring-0"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">Last 3 Months</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <Filter size={20} className="text-gray-500" />
          <select 
            value={investmentType}
            onChange={(e) => setInvestmentType(e.target.value)}
            className="bg-transparent border-none focus:ring-0"
          >
            <option value="all">All Investments</option>
            <option value="tech">Tech Growth Fund</option>
            <option value="real_estate">Real Estate Portfolio</option>
            <option value="car_rental">Car Rental Fleet</option>
          </select>
        </div>
      </div>

      {/* Accounts Payable Table */}
      <div className="bg-white rounded-lg border">
        <AccountsPayableTable
          accounts={accountsPayable}
          onProcessPayment={handleProcessPayment}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
};

export default Reports;