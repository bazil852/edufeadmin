import React from 'react';
import { roleDefinitions } from '../../data/roleDefinitions';
import { EmployeeRole } from '../../types/employee';

interface RoleSelectorProps {
  value: EmployeeRole;
  onChange: (role: EmployeeRole) => void;
  disabled?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as EmployeeRole)}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#114A55] focus:outline-none focus:ring-1 focus:ring-[#114A55] disabled:bg-gray-100"
      >
        <option value="">Select a role</option>
        {roleDefinitions.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelector;