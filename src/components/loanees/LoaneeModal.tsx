import React, { useState } from 'react';
import { Calendar, DollarSign, User, Phone, Mail, MapPin, FileText } from 'lucide-react';
import Modal from '../Modal';
import { Loanee, Loan } from '../../types/loan';
import { commonLoanPurposes } from '../../data/dummyLoanees';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface LoaneeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Loanee>) => void;
  loanee?: Loanee | null;
}

const LoaneeModal: React.FC<LoaneeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loanee
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'loans' | 'documents'>('info');
  const [formData, setFormData] = useState({
    name: loanee?.name || '',
    email: loanee?.email || '',
    phone: loanee?.phone || '',
    nationalId: loanee?.nationalId || '',
    dateOfBirth: loanee?.dateOfBirth || '',
    city: loanee?.location.city || '',
    state: loanee?.location.state || '',
    country: loanee?.location.country || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      location: {
        city: formData.city,
        state: formData.state,
        country: formData.country
      }
    });
  };

  const renderPersonalInfo = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="mt-1 relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">National ID</label>
          <div className="mt-1 relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={formData.nationalId}
              onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <div className="mt-1 relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <div className="mt-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
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
          {loanee ? 'Update' : 'Create'} Loanee
        </button>
      </div>
    </form>
  );

  const renderLoans = () => (
    <div className="space-y-4">
      {loanee?.loans.map((loan: Loan) => (
        <div key={loan.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium">Loan {loan.referenceNumber}</h4>
              <p className="text-sm text-gray-500">{loan.purpose}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm ${
              loan.status === 'active' ? 'bg-green-100 text-green-800' :
              loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              loan.status === 'defaulted' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Amount</p>
              <p className="font-medium">{formatCurrency(loan.amount)}</p>
            </div>
            <div>
              <p className="text-gray-500">Outstanding</p>
              <p className="font-medium">{formatCurrency(loan.outstandingAmount)}</p>
            </div>
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(loan.startDate)}</p>
            </div>
            <div>
              <p className="text-gray-500">End Date</p>
              <p className="font-medium">{formatDate(loan.endDate)}</p>
            </div>
            <div>
              <p className="text-gray-500">Interest Rate</p>
              <p className="font-medium">{loan.interestRate}%</p>
            </div>
            <div>
              <p className="text-gray-500">Next Payment</p>
              <p className="font-medium">{formatDate(loan.nextPaymentDate)}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h5 className="font-medium mb-2">Payment History</h5>
            <div className="space-y-2">
              {loan.payments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{formatCurrency(payment.amount)}</p>
                    <p className="text-gray-500">{formatDate(payment.paymentDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700">{payment.paymentMethod.replace('_', ' ')}</p>
                    {payment.receiptUrl && (
                      <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-[#114A55] hover:underline">
                        View Receipt
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <div className="space-y-2">
          <FileText className="mx-auto text-gray-400" size={32} />
          <p className="text-gray-600">Drag and drop documents here, or click to browse</p>
          <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Browse Files
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Uploaded Documents</h4>
        <div className="border rounded-lg divide-y">
          {/* Sample documents - in a real app, these would come from the backend */}
          <div className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-gray-400" />
              <span>National ID.pdf</span>
            </div>
            <button className="text-red-600 hover:text-red-700">Delete</button>
          </div>
          <div className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-gray-400" />
              <span>Proof of Address.pdf</span>
            </div>
            <button className="text-red-600 hover:text-red-700">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={loanee ? `Edit Loanee: ${loanee.name}` : 'Add New Loanee'}
      size="wide"
    >
      <div className="space-y-6">
        <div className="border-b">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-4 px-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'info'
                  ? 'border-[#114A55] text-[#114A55]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Personal Information
            </button>
            {loanee && (
              <>
                <button
                  onClick={() => setActiveTab('loans')}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === 'loans'
                      ? 'border-[#114A55] text-[#114A55]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Loans
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === 'documents'
                      ? 'border-[#114A55] text-[#114A55]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Documents
                </button>
              </>
            )}
          </nav>
        </div>

        <div>
          {activeTab === 'info' && renderPersonalInfo()}
          {activeTab === 'loans' && renderLoans()}
          {activeTab === 'documents' && renderDocuments()}
        </div>
      </div>
    </Modal>
  );
};

export default LoaneeModal;