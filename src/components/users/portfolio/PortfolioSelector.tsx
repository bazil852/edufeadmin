import React from 'react';
import { Briefcase } from 'lucide-react';

interface PortfolioSelectorProps {
  portfolios: Array<{
    id: string;
    name: string;
    totalAmount: number;
  }>;
  selectedPortfolioId: string;
  onSelect: (portfolioId: string) => void;
}

const PortfolioSelector: React.FC<PortfolioSelectorProps> = ({
  portfolios,
  selectedPortfolioId,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Portfolio</label>
      <div className="grid grid-cols-3 gap-4">
        {portfolios.map((portfolio) => (
          <button
            key={portfolio.id}
            onClick={() => onSelect(portfolio.id)}
            className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
              selectedPortfolioId === portfolio.id
                ? 'border-[#114A55] bg-[#114A55]/5'
                : 'border-gray-200 hover:border-[#114A55]/50'
            }`}
          >
            <Briefcase
              size={20}
              className={selectedPortfolioId === portfolio.id ? 'text-[#114A55]' : 'text-gray-400'}
            />
            <div className="text-left">
              <p className={`font-medium ${
                selectedPortfolioId === portfolio.id ? 'text-[#114A55]' : 'text-gray-900'
              }`}>
                {portfolio.name}
              </p>
              <p className="text-sm text-gray-500">
                ${portfolio.totalAmount.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSelector;