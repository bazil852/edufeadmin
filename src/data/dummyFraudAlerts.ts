import { FraudAlert } from '../types/fraud';

export const dummyFraudAlerts: FraudAlert[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Isabella Mejía',
    riskLevel: 'high',
    status: 'new',
    triggerType: 'unusual_transaction',
    description: 'Multiple large transactions in short time period',
    detectedAt: '2024-03-15T14:30:00Z',
    lastUpdated: '2024-03-15T14:30:00Z',
    metadata: {
      ipAddress: '192.168.1.100',
      location: 'Guatemala City, Guatemala',
      transactionId: 'TRX-123456',
      amount: 50000
    }
  },
  {
    id: '2',
    userId: '3',
    userName: 'Luis Fernando Paz',
    riskLevel: 'critical',
    status: 'investigating',
    triggerType: 'multiple_failed_logins',
    description: '10 failed login attempts from different IP addresses',
    detectedAt: '2024-03-15T13:45:00Z',
    lastUpdated: '2024-03-15T14:00:00Z',
    assignedTo: 'Carmen Flores',
    metadata: {
      ipAddress: 'Multiple IPs',
      deviceInfo: 'Various devices detected'
    }
  }
];