import React, { useState } from 'react';
import { Investment } from '../../types/investment';

interface InvestmentFormProps {
  onSubmit: (data: Partial<Investment>) => void;
  onCancel: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    minInvestmentAmount: '',
    minReturn: '',
    maxReturn: '',
    fixReturn: '',
    riskLevel: 'Low'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      minInvestmentAmount: parseFloat(formData.minInvestmentAmount),
      minReturn: parseFloat(formData.minReturn),
      maxReturn: parseFloat(formData.maxReturn),
      fixReturn: parseFloat(formData.fixReturn)
    };

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/investment-opportunities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create investment opportunity');
      }

      const newInvestment = await response.json();
      onSubmit(newInvestment);
    } catch (error) {
      console.error('Error creating investment:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Minimum Investment Amount (L)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.minInvestmentAmount}
          onChange={(e) => setFormData(prev => ({ ...prev, minInvestmentAmount: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Minimum Return (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formData.minReturn}
            onChange={(e) => setFormData(prev => ({ ...prev, minReturn: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Return (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formData.maxReturn}
            onChange={(e) => setFormData(prev => ({ ...prev, maxReturn: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Fixed Return (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={formData.fixReturn}
          onChange={(e) => setFormData(prev => ({ ...prev, fixReturn: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Risk Level</label>
        <select
          value={formData.riskLevel}
          onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          required
        >
          <option value="Low">Low</option>
          <option value="Lower">Lower</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
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
  );
};

export default InvestmentForm;