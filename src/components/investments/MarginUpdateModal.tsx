import React, { useState } from 'react';
import Modal from '../Modal';
import { MarginUpdateOptions } from '../../types/investment';

interface MarginUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: MarginUpdateOptions) => void;
  currentMargin: number;
}

const MarginUpdateModal: React.FC<MarginUpdateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentMargin
}) => {
  const [percentage, setPercentage] = useState(currentMargin);
  const [updateType, setUpdateType] = useState<'all' | 'new_only'>('new_only');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      type: updateType,
      percentage
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Return Margin"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Margin Percentage
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Apply Changes To
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="new_only"
                checked={updateType === 'new_only'}
                onChange={(e) => setUpdateType(e.target.value as 'new_only')}
                className="text-[#114A55] focus:ring-[#114A55]"
              />
              <span className="text-sm text-gray-700">New investments only</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="all"
                checked={updateType === 'all'}
                onChange={(e) => setUpdateType(e.target.value as 'all')}
                className="text-[#114A55] focus:ring-[#114A55]"
              />
              <span className="text-sm text-gray-700">All investments (including existing)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
          >
            Update Margin
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MarginUpdateModal;