export type EmployeeRole = 'basic_admin' | 'finance_admin' | 'super_admin';

export interface RolePermission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface EmployeeRoleDefinition {
  id: EmployeeRole;
  name: string;
  description: string;
  permissions: string[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  department: string;
  joinedAt: string;
  status: 'active' | 'inactive';
}