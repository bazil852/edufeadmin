import { EmployeeRoleDefinition, RolePermission } from '../types/employee';

export const permissions: RolePermission[] = [
  {
    id: 'view_users',
    name: 'View Users',
    description: 'Can view user details and portfolios',
    module: 'users'
  },
  {
    id: 'manage_users',
    name: 'Manage Users',
    description: 'Can modify user details and settings',
    module: 'users'
  },
  {
    id: 'view_investments',
    name: 'View Investments',
    description: 'Can view investment details',
    module: 'investments'
  },
  {
    id: 'manage_investments',
    name: 'Manage Investments',
    description: 'Can create and modify investments',
    module: 'investments'
  },
  {
    id: 'view_employees',
    name: 'View Employees',
    description: 'Can view employee details',
    module: 'employees'
  },
  {
    id: 'manage_employees',
    name: 'Manage Employees',
    description: 'Can add, modify, or remove employees',
    module: 'employees'
  },
  {
    id: 'process_repayments',
    name: 'Process Repayments',
    description: 'Can process user repayments',
    module: 'finance'
  },
  {
    id: 'confirm_repayments',
    name: 'Confirm Repayments',
    description: 'Can confirm user repayments',
    module: 'finance'
  },
  {
    id: 'manage_bank_accounts',
    name: 'Manage Bank Accounts',
    description: 'Can manage Edufe\'s official bank accounts',
    module: 'finance'
  }
];

export const roleDefinitions: EmployeeRoleDefinition[] = [
  {
    id: 'basic_admin',
    name: 'Basic Admin',
    description: 'Can perform most administrative tasks with some restrictions',
    permissions: [
      'view_users',
      'manage_users',
      'view_investments',
      'manage_investments',
      'view_employees',
      'process_repayments'
    ]
  },
  {
    id: 'finance_admin',
    name: 'Finance Admin',
    description: 'Has additional financial management capabilities',
    permissions: [
      'view_users',
      'manage_users',
      'view_investments',
      'manage_investments',
      'view_employees',
      'process_repayments',
      'confirm_repayments'
    ]
  },
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Has full system access and control',
    permissions: [
      'view_users',
      'manage_users',
      'view_investments',
      'manage_investments',
      'view_employees',
      'manage_employees',
      'process_repayments',
      'confirm_repayments',
      'manage_bank_accounts'
    ]
  }
];