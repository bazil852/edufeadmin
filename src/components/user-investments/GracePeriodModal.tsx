import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Modal from '../Modal';

interface GracePeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (months: number) => void;
  currentGracePeriod: { startDate: string; endDate: string };
}

const GracePeriodModal: React.FC<GracePeriodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentGracePeriod
}) => {
  const [additionalMonths, setAdditionalMonths] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(additionalMonths);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Extend Grace Period"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Grace Period
          </label>
          <div className="mt-1 flex items-center gap-2 text-gray-600">
            <Calendar size={16} />
            <span>{new Date(currentGracePeriod.startDate).toLocaleDateString()} - </span>
            <span>{new Date(currentGracePeriod.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Months
          </label>
          <select
            value={additionalMonths}
            onChange={(e) => setAdditionalMonths(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          >
            {[1, 2, 3, 4, 5, 6].map((months) => (
              <option key={months} value={months}>
                {months} {months === 1 ? 'month' : 'months'}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Note: Extending the grace period will recalculate the monthly returns accordingly.
          </p>
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
            Extend Period
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GracePeriodModal;