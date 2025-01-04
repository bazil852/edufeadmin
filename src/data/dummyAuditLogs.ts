import { AuditLog } from '../types/audit';

export const dummyAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'user.update',
    employeeId: '3',
    employeeName: 'Carmen Flores',
    details: {
      recordId: '2',
      recordType: 'user',
      changes: {
        kycStatus: {
          from: 'pending',
          to: 'verified'
        }
      }
    },
    ipAddress: '192.168.1.100',
    timestamp: '2024-03-15 14:30:00'
  },
  {
    id: '2',
    action: 'investment.create',
    employeeId: '2',
    employeeName: 'Eduardo Reyes',
    details: {
      recordId: '5',
      recordType: 'investment',
      metadata: {
        name: 'Tech Growth Fund',
        amount: 250000
      }
    },
    ipAddress: '192.168.1.101',
    timestamp: '2024-03-15 13:45:00'
  },
  {
    id: '3',
    action: 'ticket.assign',
    employeeId: '3',
    employeeName: 'Carmen Flores',
    details: {
      recordId: '1',
      recordType: 'ticket',
      changes: {
        assignedTo: {
          from: null,
          to: 'Carmen Flores'
        }
      }
    },
    ipAddress: '192.168.1.102',
    timestamp: '2024-03-15 12:15:00'
  }
];