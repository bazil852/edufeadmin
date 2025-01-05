import React, { useState } from 'react';
import Modal from '../../Modal';
import PortfolioSelector from './PortfolioSelector';
import PortfolioSummary from './PortfolioSummary';
import PortfolioDistribution from './PortfolioDistribution';
import PortfolioInvestments from './PortfolioInvestments';

interface Portfolio {
  id: string;
  name: string;
  totalAmount: number;
  investments: Array<{
    id: string;
    name: string;
    amount: number;
    returnRate: number;
    startDate: string;
    endDate: string;
  }>;
}

interface UserPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    totalPortfolios: number;
    totalWorth: number;
    nextPayout: {
      date: string;
      amount: number;
    };
    portfolios: Portfolio[];
    distributions: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
  };
}

const UserPortfolioModal: React.FC<UserPortfolioModalProps> = ({
  isOpen,
  onClose,
  userData
}) => {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(
    userData.portfolios[0]?.id || ''
  );

  const selectedPortfolio = userData.portfolios.find(
    p => p.id === selectedPortfolioId
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Portfolio Details - ${userData.name}`}
      size="wide"
    >
      <div className="space-y-6">
        <PortfolioSelector
          portfolios={userData.portfolios}
          selectedPortfolioId={selectedPortfolioId}
          onSelect={setSelectedPortfolioId}
        />

        <PortfolioSummary
          totalPortfolios={userData.totalPortfolios}
          totalWorth={userData.totalWorth}
          nextPayout={userData.nextPayout}
        />
        
        <div className="grid grid-cols-2 gap-6">
          <PortfolioDistribution distributions={userData.distributions} />
          <div className="border-l pl-6">
            {selectedPortfolio && (
              <PortfolioInvestments
                portfolios={[{
                  name: selectedPortfolio.name,
                  investments: selectedPortfolio.investments
                }]}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserPortfolioModal;