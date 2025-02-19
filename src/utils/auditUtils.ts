import { User, FileText, Clock } from 'lucide-react';

export const getActionIcon = (action: string) => {
  const actionLower = action.toLowerCase();
  if (actionLower.includes('user') || actionLower.includes('kyc')) return User;
  if (actionLower.includes('investment') || actionLower.includes('content')) return FileText;
  return Clock;
};

export const formatAction = (action: string) => {
  if (!action) return 'Unknown Action';
  return action;
};