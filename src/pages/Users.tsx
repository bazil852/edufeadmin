import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ActionMenu from '../components/ActionMenu';
import { dummyUsers } from '../data/dummyData';
import UserDetailsModal from '../components/users/UserDetailsModal';
import { User } from '../types';

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(dummyUsers);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
  };

  const handleUpdateKycStatus = (userId: string, status: 'verified' | 'rejected' | 'pending') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, kycStatus: status } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Users</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90">
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="bg-gray-50 text-gray-900 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55] border"
            />
          </div>
          <button className="flex items-center space-x-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-100">
            <Filter size={20} />
            <span>Filter</span>
          </button>
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
              {users.map((user) => (
                <tr key={user.id} className="text-gray-700 border-b">
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
                  <td className="py-3 px-4">
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateKycStatus={handleUpdateKycStatus}
      />
    </div>
  );
};

export default Users;