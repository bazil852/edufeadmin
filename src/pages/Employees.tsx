import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import ActionMenu from '../components/ActionMenu';
import EmployeeForm from '../components/employees/EmployeeForm';
import { dummyEmployees } from '../data/dummyData';
import { Employee } from '../types';

const Employees: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (data: any) => {
    console.log('Add employee:', data);
    setIsAddModalOpen(false);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    console.log('Delete employee:', employee);
  };

  const handleView = (employee: Employee) => {
    console.log('View employee:', employee);
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
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
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
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyEmployees.map((employee) => (
                <tr key={employee.id} className="text-gray-700 border-b">
                  <td className="py-3 px-4">{employee.name}</td>
                  <td className="py-3 px-4">{employee.email}</td>
                  <td className="py-3 px-4">{employee.role}</td>
                  <td className="py-3 px-4">{employee.department}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <ActionMenu
                      onEdit={() => handleEdit(employee)}
                      onDelete={() => handleDelete(employee)}
                      onView={() => handleView(employee)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
      >
        <EmployeeForm 
          onSubmit={handleAddEmployee}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Employees;