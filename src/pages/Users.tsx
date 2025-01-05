import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ActionMenu from '../components/ActionMenu';
import { dummyUsers } from '../data/dummyData';
import UserDetailsModal from '../components/users/UserDetailsModal';
import UserFilters from '../components/users/UserFilters';
import KYCActionModal from '../components/users/KYCActionModal';
import UserPortfolioModal from '../components/users/portfolio/UserPortfolioModal';
import { User } from '../types';
import { sendKYCNotification } from '../utils/notificationUtils';

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedUserPortfolio, setSelectedUserPortfolio] = useState<any>(null);
  const [kycAction, setKYCAction] = useState<'hold' | 'reject'>('hold');
  const [users, setUsers] = useState(dummyUsers);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleRowClick = (user: User) => {
    const portfolioData = {
      name: user.name,
      totalPortfolios: 3,
      totalWorth: user.portfolio.totalInvestment,
      nextPayout: {
        date: '2024-04-01',
        amount: 5000
      },
      distributions: [
        { name: 'Tech Growth Fund', amount: 50000, percentage: 40 },
        { name: 'Real Estate', amount: 45000, percentage: 36 },
        { name: 'Car Rental', amount: 30000, percentage: 24 }
      ],
      portfolios: [
        {
          id: '1',
          name: 'Tech Growth Fund',
          totalAmount: 50000,
          investments: [
            {
              id: '1',
              name: 'AI Startups Portfolio',
              amount: 30000,
              returnRate: 12.5,
              startDate: '2024-01-01',
              endDate: '2025-01-01'
            },
            {
              id: '2',
              name: 'Blockchain Ventures',
              amount: 20000,
              returnRate: 15.8,
              startDate: '2024-02-01',
              endDate: '2025-02-01'
            }
          ]
        },
        {
          id: '2',
          name: 'Real Estate Portfolio',
          totalAmount: 45000,
          investments: [
            {
              id: '3',
              name: 'Commercial Properties',
              amount: 25000,
              returnRate: 8.5,
              startDate: '2024-01-15',
              endDate: '2025-01-15'
            },
            {
              id: '4',
              name: 'Residential Units',
              amount: 20000,
              returnRate: 7.2,
              startDate: '2024-02-15',
              endDate: '2025-02-15'
            }
          ]
        },
        {
          id: '3',
          name: 'Car Rental Fleet',
          totalAmount: 30000,
          investments: [
            {
              id: '5',
              name: 'Luxury Vehicles',
              amount: 18000,
              returnRate: 10.5,
              startDate: '2024-03-01',
              endDate: '2025-03-01'
            },
            {
              id: '6',
              name: 'Electric Cars',
              amount: 12000,
              returnRate: 11.2,
              startDate: '2024-03-15',
              endDate: '2025-03-15'
            }
          ]
        }
      ]
    };
    
    setSelectedUserPortfolio(portfolioData);
    setIsPortfolioModalOpen(true);
  };

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
  };

  const handleFilterChange = (filters: { search: string; signupDate: string; portfolioValue: string }) => {
    let filtered = [...users];

    if (filters.search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.signupDate) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.signupDate) {
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
      }
      
      filtered = filtered.filter(user => new Date(user.joinedAt) >= filterDate);
    }

    if (filters.portfolioValue) {
      const [min, max] = filters.portfolioValue.split('-').map(Number);
      filtered = filtered.filter(user => {
        const value = user.portfolio.totalInvestment;
        if (max) {
          return value >= min && value <= max;
        }
        return value >= min;
      });
    }

    setFilteredUsers(filtered);
  };

  const handleUpdateKycStatus = async (userId: string, status: 'verified' | 'rejected' | 'hold', reason?: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, kycStatus: status } : user
    );
    
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    if ((status === 'rejected' || status === 'hold') && reason) {
      const user = users.find(u => u.id === userId);
      if (user) {
        await sendKYCNotification({
          userId,
          userName: user.name,
          action: status === 'hold' ? 'hold' : 'reject',
          reason
        });
      }
    }
  };

  const handleKYCAction = (action: 'hold' | 'reject') => {
    if (selectedUser) {
      setKYCAction(action);
      setIsKYCModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Users</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
          <Download size={20} />
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="mb-6">
          <UserFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">KYC Status</th>
                <th className="text-left py-3 px-4">Portfolio Value</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="text-gray-700 border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(user)}
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.kycStatus === 'verified' 
                        ? 'bg-green-100 text-green-800'
                        : user.kycStatus === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">${user.portfolio.totalInvestment.toLocaleString()}</td>
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu
                      onEdit={() => handleEdit(user)}
                      onDelete={() => handleDelete(user)}
                      onView={() => handleView(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailsModal
        user={selectedUser}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedUser(null);
        }}
        onUpdateKycStatus={(userId, status) => {
          if (status === 'hold' || status === 'rejected') {
            handleKYCAction(status);
          } else {
            handleUpdateKycStatus(userId, status);
          }
        }}
      />

      {selectedUser && (
        <KYCActionModal
          isOpen={isKYCModalOpen}
          onClose={() => setIsKYCModalOpen(false)}
          onConfirm={(reason) => {
            handleUpdateKycStatus(selectedUser.id, kycAction, reason);
            setIsKYCModalOpen(false);
          }}
          action={kycAction}
          userName={selectedUser.name}
        />
      )}

      {selectedUserPortfolio && (
        <UserPortfolioModal
          isOpen={isPortfolioModalOpen}
          onClose={() => {
            setIsPortfolioModalOpen(false);
            setSelectedUserPortfolio(null);
          }}
          userData={selectedUserPortfolio}
        />
      )}
    </div>
  );
};

export default Users;