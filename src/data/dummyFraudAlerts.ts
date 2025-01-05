import { FraudAlert } from '../types/fraud';

export const dummyFraudAlerts: FraudAlert[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Isabella Mejía',
    userEmail: 'isabella.m@example.com',
    userPhone: '+502 1234-5678',
    riskLevel: 'high',
    status: 'new',
    triggerType: 'unusual_transaction',
    description: 'Multiple large transactions in short time period',
    detectedAt: '2025-01-15T14:30:00',
    lastUpdated: '2025-01-15T14:30:00',
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
    userEmail: 'luis.paz@example.com',
    userPhone: '+502 2345-6789',
    riskLevel: 'critical',
    status: 'investigating',
    triggerType: 'multiple_failed_logins',
    description: '10 failed login attempts from different IP addresses',
    detectedAt: '2025-01-15T13:45:00',
    lastUpdated: '2025-01-15T14:00:00',
    assignedTo: 'Carmen Flores',
    metadata: {
      ipAddress: 'Multiple IPs',
      deviceInfo: 'Various devices detected'
    }
  },
  {
    id: '3',
    userId: '4',
    userName: 'Ana María Santos',
    userEmail: 'ana.santos@example.com',
    userPhone: '+502 3456-7890',
    riskLevel: 'medium',
    status: 'new',
    triggerType: 'ip_mismatch',
    description: 'Login attempt from unusual location',
    detectedAt: '2025-01-15T12:30:00',
    lastUpdated: '2025-01-15T12:30:00',
    metadata: {
      ipAddress: '203.45.67.89',
      location: 'Bangkok, Thailand',
      deviceInfo: 'Unknown Device'
    }
  },
  {
    id: '4',
    userId: '5',
    userName: 'José David Rodriguez',
    userEmail: 'jose.r@example.com',
    userPhone: '+502 4567-8901',
    riskLevel: 'high',
    status: 'investigating',
    triggerType: 'rapid_transactions',
    description: '5 withdrawal requests within 1 hour',
    detectedAt: '2025-01-15T11:15:00',
    lastUpdated: '2025-01-15T11:45:00',
    assignedTo: 'Eduardo Reyes',
    metadata: {
      transactionId: 'TRX-789012',
      amount: 75000
    }
  },
  {
    id: '5',
    userId: '6',
    userName: 'Maria Elena Vega',
    userEmail: 'maria.v@example.com',
    userPhone: '+502 5678-9012',
    riskLevel: 'critical',
    status: 'new',
    triggerType: 'suspicious_login',
    description: 'Login attempt after account lockout',
    detectedAt: '2025-01-15T10:00:00',
    lastUpdated: '2025-01-15T10:00:00',
    metadata: {
      ipAddress: '45.67.89.123',
      location: 'Moscow, Russia',
      deviceInfo: 'Linux/Firefox'
    }
  },
  {
    id: '6',
    userId: '7',
    userName: 'Carlos Ramirez',
    userEmail: 'carlos.r@example.com',
    userPhone: '+502 6789-0123',
    riskLevel: 'low',
    status: 'resolved',
    triggerType: 'multiple_accounts',
    description: 'Similar details found in 3 other accounts',
    detectedAt: '2025-01-15T09:30:00',
    lastUpdated: '2025-01-15T10:15:00',
    assignedTo: 'Sofia Valladares',
    metadata: {
      relatedAccounts: ['ACC-123', 'ACC-456', 'ACC-789']
    }
  },
  {
    id: '7',
    userId: '8',
    userName: 'Patricia Mendoza',
    userEmail: 'patricia.m@example.com',
    userPhone: '+502 7890-1234',
    riskLevel: 'high',
    status: 'new',
    triggerType: 'large_withdrawal',
    description: 'Withdrawal request exceeds historical pattern',
    detectedAt: '2025-01-15T08:45:00',
    lastUpdated: '2025-01-15T08:45:00',
    metadata: {
      transactionId: 'TRX-345678',
      amount: 100000,
      previousMax: 25000
    }
  }
];