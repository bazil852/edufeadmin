import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionDetails from '../components/transactions/TransactionDetails';
import { Transaction } from '../types/transaction';
import { dummyTransactions } from '../data/dummyTransactions';

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

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
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Transaction History</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
          <Download size={20} />
          Export Transactions
        </button>
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