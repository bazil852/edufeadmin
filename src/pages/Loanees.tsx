import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import LoaneeList from '../components/loanees/LoaneeList';
import LoaneeFilters from '../components/loanees/LoaneeFilters';
import LoaneeModal from '../components/loanees/LoaneeModal';
import { dummyLoanees } from '../data/dummyLoanees';
import { Loanee } from '../types/loan';

const Loanees: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanee, setSelectedLoanee] = useState<Loanee | null>(null);
  const [loanees, setLoanees] = useState(dummyLoanees);

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
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Loanees</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Loanee
        </button>
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