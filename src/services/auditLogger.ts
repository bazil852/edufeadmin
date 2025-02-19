import { User } from '../types/user';

interface AuditLogPayload {
  user: User;
  action: string;
  description: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
}

export const logAuditEvent = async (payload: AuditLogPayload): Promise<void> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/audit-log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        user: payload.user.id,
        action: payload.action,
        description: payload.description,
        ipAddress: payload.ipAddress || ip,
        metadata: payload.metadata,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to log audit event');
    }
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
};

// Common audit actions
export const AuditActions = {
  USER: {
    LOGIN: 'User Login',
    LOGOUT: 'User Logout',
    CREATE: 'User Created',
    UPDATE: 'User Updated',
    DELETE: 'User Deleted',
    KYC_APPROVED: 'KYC Approved',
    KYC_REJECTED: 'KYC Rejected',
    KYC_HOLD: 'KYC Put On Hold'
  },
  INVESTMENT: {
    CREATE: 'Investment Created',
    UPDATE: 'Investment Updated',
    DELETE: 'Investment Deleted',
    STATUS_CHANGE: 'Investment Status Changed'
  },
  EMPLOYEE: {
    CREATE: 'Employee Created',
    UPDATE: 'Employee Updated',
    DELETE: 'Employee Deleted',
    ROLE_CHANGE: 'Employee Role Changed'
  },
  ANNOUNCEMENT: {
    CREATE: 'Announcement Created',
    UPDATE: 'Announcement Updated',
    DELETE: 'Announcement Deleted',
  },
  EDUCATION: {
    CREATE: 'Educational Content Created',
    UPDATE: 'Educational Content Updated',
    DELETE: 'Educational Content Deleted'
  }
} as const;