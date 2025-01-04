import React from 'react';
import { Shield, MapPin, Monitor, CreditCard, Clock } from 'lucide-react';
import { FraudAlert } from '../../types/fraud';

interface FraudAlertDetailProps {
  alert: FraudAlert;
}

const FraudAlertDetail: React.FC<FraudAlertDetailProps> = ({ alert }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">User Information</h3>
          <div className="mt-2 space-y-2">
            <p className="text-gray-900">Name: {alert.userName}</p>
            <p className="text-gray-900">User ID: {alert.userId}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Alert Details</h3>
          <div className="mt-2 space-y-2">
            <p className="text-gray-900">Type: {alert.triggerType.split('_').join(' ')}</p>
            <p className="text-gray-900">Detected: {new Date(alert.detectedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Description</h3>
        <p className="mt-2 text-gray-900">{alert.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500">Metadata</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {alert.metadata.ipAddress && (
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-gray-400" />
              <span>IP: {alert.metadata.ipAddress}</span>
            </div>
          )}
          {alert.metadata.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <span>Location: {alert.metadata.location}</span>
            </div>
          )}
          {alert.metadata.deviceInfo && (
            <div className="flex items-center gap-2">
              <Monitor size={16} className="text-gray-400" />
              <span>Device: {alert.metadata.deviceInfo}</span>
            </div>
          )}
          {alert.metadata.transactionId && (
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-gray-400" />
              <span>Transaction: {alert.metadata.transactionId}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-500">Timeline</h3>
        <div className="mt-2 space-y-4">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-900">Alert Created</p>
              <p className="text-xs text-gray-500">{new Date(alert.detectedAt).toLocaleString()}</p>
            </div>
          </div>
          {alert.assignedTo && (
            <div className="flex items-start gap-3">
              <User size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-900">Assigned to {alert.assignedTo}</p>
                <p className="text-xs text-gray-500">{new Date(alert.lastUpdated).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FraudAlertDetail;