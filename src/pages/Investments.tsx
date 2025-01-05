import React, { useState } from 'react';
import { Plus, Filter, Calendar } from 'lucide-react';
import Modal from '../components/Modal';
import InvestmentForm from '../components/investments/InvestmentForm';
import MarginUpdateModal from '../components/investments/MarginUpdateModal';
import { Investment, MarginUpdateOptions } from '../types/investment';
import { dummyInvestments } from '../data/dummyInvestments';

const Investments: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMarginModalOpen, setIsMarginModalOpen] = useState(false);
  const [currentMargin, setCurrentMargin] = useState(25); // Default 25%
  const [investments, setInvestments] = useState(dummyInvestments);

  const handleCreateInvestment = (data: Partial<Investment>) => {
    console.log('Create investment:', data);
    setIsAddModalOpen(false);
  };

  const handleUpdateMargin = (options: MarginUpdateOptions) => {
    console.log('Update margin:', options);
    setCurrentMargin(options.percentage);
    setIsMarginModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Investments</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsMarginModalOpen(true)}
            className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
          >
            Update Return Margin
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
          >
            <Plus size={20} />
            New Investment
          </button>
        </div>
      </div>

      {/* Investment cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <div key={investment.id} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-sm ${
                investment.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {investment.status}
              </span>
              <span className="text-sm text-gray-500">
                Margin: {investment.edufeMargin}%
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{investment.title}</h3>
            <p className="text-gray-600 mt-2">{investment.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Min Investment</span>
                <span className="text-gray-900 font-medium">
                  L{investment.minInvestmentAmount.toLocaleString()}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">ROI Conditions:</span>
                {investment.roiConditions.map((condition, index) => (
                  <div key={index} className="text-sm flex justify-between">
                    <span>{condition.months} months</span>
                    <span className="text-green-600">+{condition.roiPercentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* New Investment Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Investment"
        size="wide"
      >
        <InvestmentForm
          onSubmit={handleCreateInvestment}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Margin Update Modal */}
      <MarginUpdateModal
        isOpen={isMarginModalOpen}
        onClose={() => setIsMarginModalOpen(false)}
        onConfirm={handleUpdateMargin}
        currentMargin={currentMargin}
      />
    </div>
  );
};

export default Investments;