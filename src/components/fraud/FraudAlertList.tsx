import React from 'react';
import { Shield, Clock, User } from 'lucide-react';
import { FraudAlert, FraudRiskLevel } from '../../types/fraud';
import ActionMenu from '../ActionMenu';

interface FraudAlertListProps {
  alerts: FraudAlert[];
  onView: (alert: FraudAlert) => void;
  onAssign: (alert: FraudAlert) => void;
  onUpdateStatus: (alert: FraudAlert, status: FraudAlert['status']) => void;
}

const FraudAlertList: React.FC<FraudAlertListProps> = ({
  alerts,
  onView,
  onAssign,
  onUpdateStatus
}) => {
  const getRiskLevelColor = (level: FraudRiskLevel) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: FraudAlert['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false-positive': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">Risk Level</th>
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Trigger</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Detected</th>
              <th className="text-left py-3 px-4">Assigned To</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b">
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(alert.riskLevel)}`}>
                    {alert.riskLevel.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span>{alert.userName}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gray-400" />
                    <span>{alert.triggerType.split('_').join(' ')}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(alert.status)}`}>
                    {alert.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{new Date(alert.detectedAt).toLocaleString()}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {alert.assignedTo || '-'}
                </td>
                <td className="py-3 px-4">
                  <ActionMenu
                    onView={() => onView(alert)}
                    onEdit={() => onAssign(alert)}
                    onDelete={() => onUpdateStatus(alert, 'resolved')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FraudAlertList;