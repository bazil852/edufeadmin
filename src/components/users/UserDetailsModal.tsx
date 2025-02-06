import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { User, IdentityVerification } from '../../types/user';
import { fetchUserIdentityVerification } from '../../services/api';
import { FileCheck, X, Clock, Printer, Phone, Mail, Calendar } from 'lucide-react';

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateKycStatus: (userId: number, status: 'verified' | 'rejected' | 'pending') => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateKycStatus,
}) => {
  const [identityVerification, setIdentityVerification] = useState<IdentityVerification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIdentityVerification = async () => {
      if (user && isOpen) {
        setIsLoading(true);
        try {
          const data = await fetchUserIdentityVerification(user.id);
          setIdentityVerification(data);
        } catch (err) {
          setError('Failed to load identity verification details');
          console.error('Error loading identity verification:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadIdentityVerification();
  }, [user, isOpen]);

  if (!user) return null;

  const getVerificationStatusColor = (isVerified: boolean) => {
    return isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getIdImageUrl = (idUrl: string) => {
    return `${import.meta.env.VITE_S3_BUCKET_URL}/${idUrl}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" size="wide">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Personal Information</h4>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getVerificationStatusColor(user.isEmailVerified)}`}>
                  Email {user.isEmailVerified ? 'Verified' : 'Pending'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getVerificationStatusColor(user.isPhoneNoVerified)}`}>
                  Phone {user.isPhoneNoVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-900">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-gray-900">{user.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-900">{user.phoneNo || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Notifications</p>
                <p className="text-gray-900">{user.getNotifications ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            {user.bio && (
              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-gray-900 mt-1">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Identity Verification</h4>
          <div className="grid grid-cols-2 gap-6">
            {isLoading ? (
              <div className="col-span-2 flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
              </div>
            ) : error ? (
              <div className="col-span-2 text-red-600 text-center py-4">{error}</div>
            ) : identityVerification ? (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">{identityVerification.idType.replace('_', ' ')}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      identityVerification.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      identityVerification.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {identityVerification.status}
                    </span>
                  </div>
                  <img
                    src={getIdImageUrl(identityVerification.idUrl)}
                    alt="ID Document"
                    className="w-full rounded-lg border"
                  />
                  {identityVerification.rejectionReason && (
                    <p className="mt-2 text-sm text-red-600">
                      Reason: {identityVerification.rejectionReason}
                    </p>
                  )}
                  {identityVerification.reviewedAt && (
                    <p className="mt-2 text-sm text-gray-500">
                      Reviewed on: {formatDate(identityVerification.reviewedAt)}
                      {identityVerification.reviewedBy && ` by ${identityVerification.reviewedBy}`}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
                  <p className="text-gray-500 text-sm text-center">Additional documents can be uploaded here</p>
                </div>
              </>
            ) : (
              <div className="col-span-2 text-center py-4 text-gray-500">
                No identity verification documents found
              </div>
            )}
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