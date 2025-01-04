export type AuditAction = 
  | 'user.create'
  | 'user.update'
  | 'user.delete'
  | 'investment.create'
  | 'investment.update'
  | 'investment.delete'
  | 'ticket.create'
  | 'ticket.update'
  | 'ticket.assign'
  | 'employee.create'
  | 'employee.update'
  | 'employee.delete';

export interface AuditLog {
  id: string;
  action: AuditAction;
  employeeId: string;
  employeeName: string;
  details: {
    recordId: string;
    recordType: string;
    changes?: Record<string, any>;
    metadata?: Record<string, any>;
  };
  ipAddress: string;
  timestamp: string;
}