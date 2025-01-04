import React, { useState } from 'react';
import { Search, Filter, Plus, TrendingUp, Home, Car, Building2, ShoppingBag } from 'lucide-react';
import Modal from '../components/Modal';

const investmentData = [
  {
    id: 1,
    title: 'Tech Growth Fund',
    description: 'High-growth technology companies portfolio',
    roi: '+12%',
    minInvestment: 10000,
    duration: '24 months',
    investors: 127,
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'Real Estate Portfolio',
    description: 'Premium commercial properties in prime locations',
    roi: '+8%',
    minInvestment: 25000,
    duration: '36 months',
    investors: 89,
    icon: Home,
  },
  {
    id: 3,
    title: 'Car Rental Fleet',
    description: 'Luxury and electric vehicle rental business',
    roi: '+10%',
    minInvestment: 15000,
    duration: '18 months',
    investors: 64,
    icon: Car,
  },
  {
    id: 4,
    title: 'Retail Spaces',
    description: 'High-traffic retail locations portfolio',
    roi: '+9%',
    minInvestment: 20000,
    duration: '30 months',
    investors: 93,
    icon: Building2,
  },
  {
    id: 5,
    title: 'E-commerce Ventures',
    description: 'Digital retail and marketplace investments',
    roi: '+15%',
    minInvestment: 12000,
    duration: '24 months',
    investors: 156,
    icon: ShoppingBag,
  },
];

const Investments: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Investments</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
        >
          <Plus size={20} />
          New Investment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investmentData.map((investment) => (
          <div key={investment.id} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <investment.icon className="text-[#114A55]" size={24} />
              <span className="text-green-600 text-sm font-semibold">{investment.roi} ROI</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{investment.title}</h3>
            <p className="text-gray-600 mt-2">{investment.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Min Investment</span>
                <span className="text-gray-900 font-medium">${investment.minInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="text-gray-900 font-medium">{investment.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Investors</span>
                <span className="text-gray-900 font-medium">{investment.investors}</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Add Investment Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Investment"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Investment Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Investment</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected ROI (%)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
            >
              Create Investment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Investments;