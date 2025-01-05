import { EmployeeRole } from '../types/employee';
import { roleDefinitions } from '../data/roleDefinitions';

export const hasPermission = (role: EmployeeRole, permission: string): boolean => {
  const roleDefinition = roleDefinitions.find(r => r.id === role);
  return roleDefinition?.permissions.includes(permission) || false;
};

export const canManageEmployees = (role: EmployeeRole): boolean => {
  return hasPermission(role, 'manage_employees');
};

export const canConfirmRepayments = (role: EmployeeRole): boolean => {
  return hasPermission(role, 'confirm_repayments');
};

export const canManageBankAccounts = (role: EmployeeRole): boolean => {
  return hasPermission(role, 'manage_bank_accounts');
};