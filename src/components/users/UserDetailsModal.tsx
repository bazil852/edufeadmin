import React from 'react';
import Modal from '../Modal';
import { User } from '../../types';
import { FileCheck, X, Clock, Printer } from 'lucide-react';
import { printUserDetails } from '../../utils/printUtils';

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateKycStatus: (userId: string, status: 'verified' | 'rejected' | 'pending') => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateKycStatus,
}) => {
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handlePrint = () => {
    if (user) {
      printUserDetails(user);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" size="wide">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Personal Information</h4>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(user.kycStatus)}`}>
                {user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="text-gray-900">{user.joinedAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="text-gray-900">{user.isVerified ? 'Verified' : 'Unverified'}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <Printer size={20} />
            Print Details
          </button>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Bank Name</p>
              <p className="text-gray-900">Banco Industrial</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="text-gray-900">0175-0001-1234-5678</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-gray-900">Savings</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Swift/BIC Code</p>
              <p className="text-gray-900">INDGGTGCXXX</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Branch</p>
              <p className="text-gray-900">Central Branch - Guatemala City</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Portfolio</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-gray-900">${user.portfolio.totalInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Investments</p>
              <p className="text-gray-900">{user.portfolio.activeInvestments}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">KYC Documents</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Photo ID</p>
              <img
                src="https://i.postimg.cc/d121ZWks/image.png"
                alt="ID Document"
                className="w-full rounded-lg border"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Driver's License/Passport</p>
              <img
                src="https://i.postimg.cc/L5mstzLz/image.png"
                alt="License/Passport"
                className="w-full rounded-lg border"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={() => onUpdateKycStatus(user.id, 'verified')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FileCheck size={20} />
              Approve KYC
            </button>
            <button
              onClick={() => onUpdateKycStatus(user.id, 'rejected')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <X size={20} />
              Reject KYC
            </button>
            <button
              onClick={() => onUpdateKycStatus(user.id, 'pending')}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
            >
              <Clock size={20} />
              Hold KYC
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;