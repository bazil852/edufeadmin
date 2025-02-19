import React, { useState, useEffect } from 'react';
import { Plus, Filter, Calendar, AlertTriangle } from 'lucide-react';
import Modal from '../components/Modal';
import InvestmentForm from '../components/investments/InvestmentForm';
import MarginUpdateModal from '../components/investments/MarginUpdateModal';
import InvestmentDetailsModal from '../components/investments/InvestmentDetailsModal';
import { Investment, MarginUpdateOptions } from '../types/investment';
import { fetchInvestmentOpportunities } from '../services/api';

const Investments: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMarginModalOpen, setIsMarginModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [currentMargin, setCurrentMargin] = useState(25);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvestments = async () => {
      try {
        const data = await fetchInvestmentOpportunities();
        setInvestments(data);
      } catch (err) {
        setError('Failed to load investment opportunities');
        console.error('Error loading investments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInvestments();
  }, []);

  const handleCreateInvestment = (data: Partial<Investment>) => {
    console.log('Create investment:', data);
    setIsAddModalOpen(false);
  };

  const handleUpdateMargin = (options: MarginUpdateOptions) => {
    console.log('Update margin:', options);
    setCurrentMargin(options.percentage);
    setIsMarginModalOpen(false);
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'lower':
        return 'bg-emerald-100 text-emerald-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map((investment) => (
            <div key={investment.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-sm ${getRiskLevelColor(investment.riskLevel)}`}>
                  {investment.riskLevel} Risk
                </span>
                <AlertTriangle 
                  size={20} 
                  className={`${
                    investment.riskLevel.toLowerCase() === 'high' 
                      ? 'text-orange-500' 
                      : investment.riskLevel.toLowerCase() === 'medium'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`} 
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{investment.name}</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Min Investment</span>
                  <span className="text-gray-900 font-medium">
                    L{parseFloat(investment.minInvestmentAmount).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Minimum Return</span>
                    <span className="text-green-600">+{parseFloat(investment.minReturn)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Maximum Return</span>
                    <span className="text-green-600">+{parseFloat(investment.maxReturn)}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Fixed Return</span>
                    <span className="text-green-600">+{parseFloat(investment.fixReturn)}%</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedInvestment(investment);
                  setIsDetailsModalOpen(true);
                }}
                className="w-full mt-4 px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

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

      <InvestmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedInvestment(null);
        }}
        investment={selectedInvestment}
      />
    </div>
  );
};

export default Investments;