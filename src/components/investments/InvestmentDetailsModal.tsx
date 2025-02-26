import React from 'react';
import { TrendingUp, DollarSign, AlertTriangle, Calendar, Lock, Settings } from 'lucide-react';
import Modal from '../Modal';
import { Investment } from '../../types/investment';
import { formatCurrency } from '../../utils/formatters';

interface InvestmentDetailsModalProps {
  investment: Investment | null;
  isOpen: boolean;
  onClose: () => void;
}

const InvestmentDetailsModal: React.FC<InvestmentDetailsModalProps> = ({
  investment,
  isOpen,
  onClose,
}) => {
  if (!investment) return null;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Investment Details"
      size="wide"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{investment.name}</h3>
            <span className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${getRiskLevelColor(investment.riskLevel)}`}>
              {investment.riskLevel} Risk Level
            </span>
          </div>
          <AlertTriangle 
            size={24} 
            className={`${
              investment.riskLevel.toLowerCase() === 'high' 
                ? 'text-orange-500' 
                : investment.riskLevel.toLowerCase() === 'medium'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`} 
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign size={20} />
              <span className="text-sm font-medium">Minimum Investment</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              L{parseFloat(investment.minInvestmentAmount).toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <TrendingUp size={20} />
              <span className="text-sm font-medium">Fixed Return Rate</span>
            </div>
            <p className="text-2xl font-semibold text-green-600">
              +{parseFloat(investment.fixReturn)}%
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-4">Return Rates</h4>
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100/80 z-10 rounded-lg"></div>
            <div className="absolute top-2 right-2 z-20">
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                Temporarily Disabled
              </span>
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Minimum Return</p>
              <p className="text-lg font-semibold text-green-600">+{parseFloat(investment.minReturn)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Maximum Return</p>
              <p className="text-lg font-semibold text-green-600">+{parseFloat(investment.maxReturn)}%</p>
            </div>
            <div className="col-span-2 mt-2">
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Settings size={18} />
                Customize Return Rates
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Set specific return percentages for each investment category
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-4">Investment Timeline</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{new Date(investment.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date(investment.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Limit - Coming Soon */}
        <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-100/80"></div>
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Lock size={20} />
              <span className="text-sm font-medium">Investment Limit</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-gray-400">L10,000,000</p>
              <button
                disabled
                className="px-3 py-1 text-sm bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
              >
                Update Limit
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Set maximum investment limit to prevent platform overload
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InvestmentDetailsModal;