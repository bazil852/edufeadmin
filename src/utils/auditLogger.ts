import { AuditAction, AuditLog } from '../types/audit';

export const logAuditEvent = (
  action: AuditAction,
  employeeId: string,
  employeeName: string,
  details: AuditLog['details']
): void => {
  const auditLog: AuditLog = {
    id: crypto.randomUUID(),
    action,
    employeeId,
    employeeName,
    details,
    ipAddress: '192.168.1.100', // In a real app, get from the request
    timestamp: new Date().toISOString()
  };

  // In a real app, this would send to your backend/logging service
  console.log('Audit Log:', auditLog);
};