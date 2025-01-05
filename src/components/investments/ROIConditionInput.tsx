import React from 'react';
import { Trash2 } from 'lucide-react';
import { ROICondition } from '../../types/investment';

interface ROIConditionInputProps {
  condition: ROICondition;
  onChange: (updatedCondition: ROICondition) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

const ROIConditionInput: React.FC<ROIConditionInputProps> = ({
  condition,
  onChange,
  onRemove,
  isRemovable
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
        <select
          value={condition.months}
          onChange={(e) => onChange({ ...condition, months: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        >
          <option value={12}>12 months</option>
          <option value={24}>24 months</option>
          <option value={36}>36 months</option>
          <option value={48}>48 months</option>
          <option value={60}>60 months</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Minimum Amount (L)</label>
        <input
          type="number"
          min="500"
          step="100"
          value={condition.minAmount}
          onChange={(e) => onChange({ ...condition, minAmount: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">ROI (%)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={condition.roiPercentage}
          onChange={(e) => onChange({ ...condition, roiPercentage: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
        />
      </div>

      {isRemovable && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default ROIConditionInput;