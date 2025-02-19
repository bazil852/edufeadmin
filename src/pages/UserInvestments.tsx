import React, { useState, useEffect } from 'react';
import { Download, Calendar, Clock } from 'lucide-react';
import InvestmentFilters from '../components/user-investments/InvestmentFilters';
import PaymentScheduleTable from '../components/user-investments/PaymentScheduleTable';
import TransferSummary from '../components/user-investments/TransferSummary';
import GracePeriodModal from '../components/user-investments/GracePeriodModal';
import { UserInvestment, TransferDetails } from '../types/userInvestment';
import { useAuth } from '../contexts/AuthContext';

const UserInvestments: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);
  const [isGracePeriodModalOpen, setIsGracePeriodModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<UserInvestment | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyUserInvestments');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyUserInvestments', newValue.toString());
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800"
          alt="Coming Soon"
          className="w-50 h-40 object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          User Investments Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're working hard to bring you a comprehensive user investments management system.
          This feature will allow you to track and manage all user investment activities in one place.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Real-time investment tracking</li>
            <li>• Payment schedule management</li>
            <li>• ROI calculations and projections</li>
            <li>• Investment portfolio analytics</li>
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

  // Example transfer details
  const transferDetails: TransferDetails = {
    accountBalance: 250000,
    pendingTransfers: 75000,
    expectedFees: 150,
    estimatedArrivalTime: '2-3 business days'
  };

  // Example user investment with payment schedule
  const exampleInvestment: UserInvestment = {
    id: '1',
    userId: '123',
    userName: 'John Smith',
    investmentId: 'inv_1',
    investmentName: 'Tech Growth Fund',
    amount: 50000,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    gracePeriod: {
      startDate: '2024-03-01',
      endDate: '2024-05-01'
    },
    returnRate: 12,
    totalReturns: 6000,
    receivedReturns: 1000,
    remainingReturns: 5000,
    nextPaymentDate: '2024-04-01',
    paymentSchedule: [
      {
        date: '2024-05-03',
        amount: 500,
        status: 'pending'
      },
      {
        date: '2024-06-03',
        amount: 500,
        status: 'pending'
      },
      {
        date: '2024-07-03',
        amount: 500,
        status: 'pending'
      }
    ],
    status: 'active'
  };

  const handleFilterChange = (filter: string) => {
    console.log('Filter changed:', filter);
    // Implement filter logic
  };

  const handleExtendGracePeriod = (months: number) => {
    console.log('Extend grace period by months:', months);
    setIsGracePeriodModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">User Investments</h2>
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
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Due Payments</h3>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
              {exampleInvestment.paymentSchedule.length} Pending
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-gray-400" />
              <span>Next payment: {exampleInvestment.nextPaymentDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-400" />
              <span>Grace period ends: {exampleInvestment.gracePeriod.endDate}</span>
            </div>
            <button
              onClick={() => setIsGracePeriodModalOpen(true)}
              className="w-full px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
            >
              Extend Grace Period
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <TransferSummary details={transferDetails} />
        </div>
      </div>

      <InvestmentFilters onFilterChange={handleFilterChange} />

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule</h3>
        <PaymentScheduleTable schedule={exampleInvestment.paymentSchedule} />
      </div>

      <GracePeriodModal
        isOpen={isGracePeriodModalOpen}
        onClose={() => setIsGracePeriodModalOpen(false)}
        onConfirm={handleExtendGracePeriod}
        currentGracePeriod={exampleInvestment.gracePeriod}
      />
    </div>
  );
};

export default UserInvestments;