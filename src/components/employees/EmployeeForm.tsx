import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import { EmployeeRole } from '../../types/employee';

interface EmployeeFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  currentUserRole?: EmployeeRole;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ 
  onSubmit, 
  onCancel,
  currentUserRole = 'super_admin'
}) => {
  const [role, setRole] = useState<EmployeeRole>('basic_admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData),
      role
    };
    onSubmit(data);
  };

  // Only super_admin can assign any role
  // finance_admin can only assign basic_admin
  // basic_admin cannot assign roles
  const canAssignRoles = currentUserRole === 'super_admin' || 
    (currentUserRole === 'finance_admin' && role === 'basic_admin');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <RoleSelector
          value={role}
          onChange={setRole}
          disabled={!canAssignRoles}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select 
            name="department"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          >
            <option value="">Select a department</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Support">Support</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55]"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;