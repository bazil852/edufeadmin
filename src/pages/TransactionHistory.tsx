import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionDetails from '../components/transactions/TransactionDetails';
import { Transaction } from '../types/transaction';
import { dummyTransactions } from '../data/dummyTransactions';
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyTransactions');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyTransactions', newValue.toString());
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
          alt="Coming Soon"
          className="w-50 h-40  object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          Transaction History Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're building a powerful transaction tracking system to help you monitor and manage all financial activities
          across the platform with ease and precision.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Real-time transaction monitoring</li>
            <li>• Advanced filtering and search capabilities</li>
            <li>• Detailed transaction analytics</li>
            <li>• Export and reporting tools</li>
          </ul>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            onClick={toggleDummyPage}
            className="mt-8 px-6 py-3 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 transition-colors"
          >
            View Demo Version
          </button>
        )}
      </div>
    );
  }

  const handleSearch = (query: string) => {
    const filtered = dummyTransactions.filter(transaction => 
      transaction.userName.toLowerCase().includes(query.toLowerCase()) ||
      transaction.description.toLowerCase().includes(query.toLowerCase())
    );
    setTransactions(filtered);
  };

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setTransactions(dummyTransactions);
    } else {
      const filtered = dummyTransactions.filter(transaction => 
        transaction.type === filter
      );
      setTransactions(filtered);
    }
  };

  const handleDateChange = (date: string) => {
    const now = new Date();
    let filterDate = new Date();

    switch (date) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        filterDate.setDate(filterDate.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(filterDate.getMonth() - 1);
        break;
      case 'quarter':
        filterDate.setMonth(filterDate.getMonth() - 3);
        break;
      case 'year':
        filterDate.setFullYear(filterDate.getFullYear() - 1);
        break;
      default:
        setTransactions(dummyTransactions);
        return;
    }

    const filtered = dummyTransactions.filter(transaction => 
      new Date(transaction.createdAt) >= filterDate &&
      new Date(transaction.createdAt) <= now
    );
    setTransactions(filtered);
  };

  const handleSortChange = (sort: string) => {
    const sorted = [...transactions].sort((a, b) => {
      switch (sort) {
        case 'date_desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date_asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'amount_desc':
          return b.amount - a.amount;
        case 'amount_asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
    setTransactions(sorted);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Transaction History</h2>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Demo Version</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDummyPage}
            className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
          >
            Back to Coming Soon
          </button>
          <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
            <Download size={20} />
            Export Transactions
          </button>
        </div>
      </div>

      <TransactionFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onDateChange={handleDateChange}
        onSortChange={handleSortChange}
      />

      <TransactionList
        transactions={transactions}
        onViewDetails={handleViewDetails}
      />

      {selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default TransactionHistory;