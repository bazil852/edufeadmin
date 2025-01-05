import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ROIConditionInput from './ROIConditionInput';
import { ROICondition } from '../../types/investment';

interface InvestmentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSubmit, onCancel }) => {
  const [roiConditions, setRoiConditions] = useState<ROICondition[]>([
    { months: 12, minAmount: 500, roiPercentage: 12 }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      minInvestmentAmount: Number(formData.get('minInvestmentAmount')),
      roiConditions
    };
    onSubmit(data);
  };

  const handleAddCondition = () => {
    setRoiConditions([
      ...roiConditions,
      { months: 12, minAmount: 500, roiPercentage: 12 }
    ]);
  };

  const handleUpdateCondition = (index: number, updatedCondition: ROICondition) => {
    const newConditions = [...roiConditions];
    newConditions[index] = updatedCondition;
    setRoiConditions(newConditions);
  };

  const handleRemoveCondition = (index: number) => {
    setRoiConditions(roiConditions.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows={3}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Investment Amount (L)
        </label>
        <input
          type="number"
          name="minInvestmentAmount"
          min="500"
          step="100"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            ROI Conditions
          </label>
          <button
            type="button"
            onClick={handleAddCondition}
            className="text-[#114A55] hover:text-[#114A55]/80 flex items-center gap-1"
          >
            <Plus size={16} />
            Add Condition
          </button>
        </div>

        <div className="space-y-4">
          {roiConditions.map((condition, index) => (
            <ROIConditionInput
              key={index}
              condition={condition}
              onChange={(updatedCondition) => handleUpdateCondition(index, updatedCondition)}
              onRemove={() => handleRemoveCondition(index)}
              isRemovable={roiConditions.length > 1}
            />
          ))}
        </div>
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