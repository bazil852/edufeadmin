import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import LoaneeList from '../components/loanees/LoaneeList';
import LoaneeFilters from '../components/loanees/LoaneeFilters';
import LoaneeModal from '../components/loanees/LoaneeModal';
import { dummyLoanees } from '../data/dummyLoanees';
import { Loanee } from '../types/loan';
import { useAuth } from '../contexts/AuthContext';

const Loanees: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanee, setSelectedLoanee] = useState<Loanee | null>(null);
  const [loanees, setLoanees] = useState(dummyLoanees);

  // Check localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyLoanees');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyLoanees', newValue.toString());
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"
          alt="Coming Soon"
          className="w-50 h-40  object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          Loan Management Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're developing a comprehensive loan management system to help you track and manage
          borrower information, loan disbursements, and repayment schedules all in one place.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Borrower profile management</li>
            <li>• Loan application processing</li>
            <li>• Payment tracking and scheduling</li>
            <li>• Risk assessment tools</li>
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

  const handleView = (loanee: Loanee) => {
    setSelectedLoanee(loanee);
    setIsModalOpen(true);
  };

  const handleAddLoanee = (data: Partial<Loanee>) => {
    // In a real app, this would be an API call
    console.log('Add loanee:', data);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Loanees</h2>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Demo Version</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDummyPage}
            className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
          >
            Back to Coming Soon
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Loanee
          </button>
        </div>
      </div>

      <LoaneeFilters />
      <LoaneeList loanees={loanees} onView={handleView} />

      <LoaneeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLoanee(null);
        }}
        onSubmit={handleAddLoanee}
        loanee={selectedLoanee}
      />
    </div>
  );
}

export default Loanees;