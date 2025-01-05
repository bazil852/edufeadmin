export type FraudRiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type FraudAlertStatus = 'new' | 'investigating' | 'resolved' | 'false-positive';
export type FraudTriggerType = 
  | 'suspicious_login'
  | 'multiple_failed_logins'
  | 'unusual_transaction'
  | 'large_withdrawal'
  | 'multiple_accounts'
  | 'ip_mismatch'
  | 'rapid_transactions';

export interface FraudAlert {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  riskLevel: FraudRiskLevel;
  status: FraudAlertStatus;
  triggerType: FraudTriggerType;
  description: string;
  detectedAt: string;
  lastUpdated: string;
  assignedTo?: string;
  metadata: {
    ipAddress?: string;
    location?: string;
    deviceInfo?: string;
    transactionId?: string;
    amount?: number;
  };
}