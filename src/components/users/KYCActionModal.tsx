import React, { useState } from 'react';
import Modal from '../Modal';

interface KYCActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  action: 'hold' | 'reject';
  userName: string;
}

const commonReasons = {
  hold: [
    'Additional documentation required',
    'Document quality issues',
    'Information mismatch',
    'Verification in progress',
    'Pending additional verification',
    'Address proof needed',
    'Bank statement required'
  ],
  reject: [
    'Invalid documentation',
    'Suspicious activity detected',
    'Multiple submission attempts',
    'Non-compliant with requirements',
    'Expired documents',
    'Fraudulent documents suspected',
    'Identity mismatch'
  ]
};

const KYCActionModal: React.FC<KYCActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  userName,
}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    const finalReason = selectedReason === 'custom' ? customReason : selectedReason;
    if (finalReason) {
      onConfirm(finalReason);
      setSelectedReason('');
      setCustomReason('');
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`${action === 'hold' ? 'Hold' : 'Reject'} KYC Verification`}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          You are about to {action} KYC verification for <span className="font-medium">{userName}</span>.
          Please provide a reason for this action.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Reason
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#114A55]"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            {commonReasons[action].map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
            <option value="custom">Other (specify)</option>
          </select>
        </div>

        {selectedReason === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Reason
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#114A55]"
              rows={3}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Enter custom reason..."
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedReason || (selectedReason === 'custom' && !customReason)}
            className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default KYCActionModal;