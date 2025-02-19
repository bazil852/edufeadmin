import React, { useState,useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import EmployeeForm from '../components/employees/EmployeeForm';
import { fetchUsers, deleteUser } from '../services/api';
import { logAuditEvent, AuditActions } from '../services/auditLogger';
import { User } from '../types/user';
import { useAuth } from '../contexts/AuthContext';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Employees: React.FC = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role !== 'ADMIN') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState<User[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const users = await fetchUsers();
        const nonInvestorUsers = users.filter(user => user.role !== 'INVESTOR');
        setEmployees(nonInvestorUsers);
        setFilteredEmployees(nonInvestorUsers);
      } catch (err) {
        setError('Failed to load employees');
        console.error('Error loading employees:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployees();
  }, [refreshTrigger]);

  useEffect(() => {
    let filtered = [...employees];

    if (searchQuery) {
      filtered = filtered.filter(employee =>
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(employee => employee.role === departmentFilter);
    }

    setFilteredEmployees(filtered);
  }, [searchQuery, departmentFilter, employees]);

  const handleAddEmployee = async (data: any) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
      const isEdit = !!selectedEmployee;
      
      const formData = {
        ...data,
        role: data.role
      };

      const url = isEdit 
        ? `${import.meta.env.VITE_API_URL}/user/edit-employee/${selectedEmployee?.id}`
        : `${import.meta.env.VITE_API_URL}/user/register-employee`;

      const response = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? 'update' : 'add'} employee`);
      }

      const employee = await response.json();
      
      if (isEdit) {
        // Log employee update
        await logAuditEvent({
          user: currentUser!,
          action: AuditActions.EMPLOYEE.UPDATE,
          ipAddress: ip,
          description: `Employee ${employee.fullName} was updated`,
          metadata: {
            employeeId: employee.id,
            oldRole: selectedEmployee.role,
            newRole: data.role,
            changes: {
              role: data.role !== selectedEmployee.role ? { from: selectedEmployee.role, to: data.role } : undefined,
              email: data.email !== selectedEmployee.email ? { from: selectedEmployee.email, to: data.email } : undefined,
              phoneNo: data.phoneNo !== selectedEmployee.phoneNo ? { from: selectedEmployee.phoneNo, to: data.phoneNo } : undefined
            }
          }
        });

        setEmployees(prev => prev.map(emp => emp.id === employee.id ? employee : emp));
        setFilteredEmployees(prev => prev.map(emp => emp.id === employee.id ? employee : emp));
      } else {
        // Log employee creation
        await logAuditEvent({
          user: currentUser!,
          action: AuditActions.EMPLOYEE.CREATE,
          ipAddress: ip,
          description: `New employee ${employee.fullName} was created`,
          metadata: {
            employeeId: employee.id,
            role: employee.role,
            email: employee.email
          }
        });

        setEmployees(prev => [...prev, employee]);
        setFilteredEmployees(prev => [...prev, employee]);
      }
      
      setIsAddModalOpen(false);
      setSelectedEmployee(null);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error('Error adding employee:', err);
      // Handle error (show error message to user)
    }
  };

  const handleDelete = (employee: User) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;

    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${selectedEmployee.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      // Log employee deletion
      await logAuditEvent({
        user: currentUser!,
        action: AuditActions.EMPLOYEE.DELETE,
        ipAddress: ip,
        description: `Employee ${selectedEmployee.fullName} was deleted`,
        metadata: {
          employeeId: selectedEmployee.id,
          role: selectedEmployee.role,
          email: selectedEmployee.email
        }
      });

      // Update local state
      const updatedEmployees = employees.filter(emp => emp.id !== selectedEmployee.id);
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Failed to delete employee');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'SUPPORT':
        return 'bg-blue-100 text-blue-800';
      case 'MANAGER':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Employees</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 text-gray-900 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55] border"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
            <Filter size={20} className="text-gray-500" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="BASIC">BASIC</option>
              <option value="FINANCE">FINANCE</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="text-gray-700 border-b">
                    <td className="py-3 px-4">{employee.fullName}</td>
                    <td className="py-3 px-4">{employee.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(employee.role)}`}>
                        {employee.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{employee.phoneNo || '-'}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsAddModalOpen(true);
                          }}
                          className="text-[#114A55] hover:text-[#114A55]/80 px-3 py-1 rounded-md hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee)}
                          className="text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedEmployee(null);
          setRefreshTrigger(prev => prev + 1);
        }}
        title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          initialData={selectedEmployee}
          onCancel={() => {
            setIsAddModalOpen(false);
            setSelectedEmployee(null);
            setRefreshTrigger(prev => prev + 1);
          }}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.fullName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Employees;