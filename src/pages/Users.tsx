import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import ActionMenu from '../components/ActionMenu';
import { fetchUsers, fetchUserPortfolios } from '../services/api';
import UserDetailsModal from '../components/users/UserDetailsModal';
import UserFilters from '../components/users/UserFilters';
import KYCActionModal from '../components/users/KYCActionModal';
import UserPortfolioModal from '../components/users/portfolio/UserPortfolioModal';
import { User } from '../types/user';
import { sendKYCNotification } from '../utils/notificationUtils';

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedUserPortfolio, setSelectedUserPortfolio] = useState<any>(null);
  const [kycAction, setKYCAction] = useState<'hold' | 'reject'>('hold');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error loading users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleRowClick = async (user: User) => {
    try {
      const portfolios = await fetchUserPortfolios(user.id);
      setSelectedUserPortfolio({
        name: user.fullName,
        portfolios
      });
      setIsPortfolioModalOpen(true);
    } catch (error) {
      console.error('Error fetching user portfolios:', error);
    }
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
        user.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
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
        <button 
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2 disabled:opacity-50"
          disabled={isLoading}
        >
          <Download size={20} />
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <UserFilters onFilterChange={handleFilterChange} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="text-left py-3 px-4">Full Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Verification Status</th>
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
                    <td className="py-3 px-4">{user.fullName}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        user.isEmailVerified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isEmailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
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
          </>
        )}
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