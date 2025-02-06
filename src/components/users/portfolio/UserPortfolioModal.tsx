import React, { useState } from 'react';
import Modal from '../../Modal';
import { Portfolio } from '../../../types/portfolio';
import { formatCurrency } from '../../../utils/formatters';
import { TrendingUp, Calendar } from 'lucide-react';

interface UserPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    portfolios: Portfolio[];
  };
}

const UserPortfolioModal: React.FC<UserPortfolioModalProps> = ({
  isOpen,
  onClose,
  userData
}) => {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(
    userData.portfolios[0]?.id || null
  );

  const selectedPortfolio = userData.portfolios.find(p => p.id === selectedPortfolioId);
  const totalPortfolioValue = userData.portfolios.reduce(
    (sum, p) => sum + parseFloat(p.totalValue), 
    0
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Portfolio Details - ${userData.name}`}
      size="wide"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Portfolios</h3>
            <p className="text-2xl font-semibold">{userData.portfolios.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Value</h3>
            <p className="text-2xl font-semibold text-green-600">
              {formatCurrency(totalPortfolioValue)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Listed Portfolios</h3>
            <p className="text-2xl font-semibold">
              {userData.portfolios.filter(p => p.isListedOnMarketplace).length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolios</h3>
            <div className="space-y-3">
              {userData.portfolios.map((portfolio) => (
                <button
                  key={portfolio.id}
                  onClick={() => setSelectedPortfolioId(portfolio.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedPortfolioId === portfolio.id
                      ? 'border-[#114A55] bg-[#114A55]/5'
                      : 'hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{portfolio.name}</h4>
                    {portfolio.isListedOnMarketplace && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Listed
                      </span>
                    )}
                  </div>
                  <p className="text-green-600 font-medium">
                    {formatCurrency(parseFloat(portfolio.totalValue))}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Created {formatDate(portfolio.createdAt)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-8">
            {selectedPortfolio ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedPortfolio.name} Details
                  </h3>
                  {selectedPortfolio.isListedOnMarketplace && selectedPortfolio.priceToSell && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Listed Price</p>
                      <p className="text-lg font-semibold text-green-600">
                        {formatCurrency(parseFloat(selectedPortfolio.priceToSell))}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Investments</h4>
                  <div className="space-y-4">
                    {selectedPortfolio.investments.map((investment) => (
                      <div
                        key={investment.id}
                        className="bg-white p-4 rounded-lg border"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <TrendingUp size={16} className="text-[#114A55]" />
                              <span className="font-medium">
                                {formatCurrency(parseFloat(investment.amountInvested))}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <Calendar size={16} />
                              <span>{investment.timePeriod} Year{investment.timePeriod > 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              investment.interestType === 'Compound'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {investment.interestType} Interest
                            </span>
                            <p className="text-sm text-gray-500 mt-2">
                              Created {formatDate(investment.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a portfolio to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserPortfolioModal;