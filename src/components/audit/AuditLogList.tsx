import React from 'react';
import { Clock, User, FileText } from 'lucide-react';
import { AuditLog } from '../../types/audit';
import { formatActivityDate } from '../../utils/dateUtils';

interface AuditLogListProps {
  logs: AuditLog[];
}

const AuditLogList: React.FC<AuditLogListProps> = ({ logs }) => {
  const getActionIcon = (action: string) => {
    if (action.startsWith('user')) return User;
    if (action.startsWith('investment')) return FileText;
    return Clock;
  };

  const formatAction = (action: string) => {
    const [entity, operation] = action.split('.');
    return `${operation.charAt(0).toUpperCase() + operation.slice(1)} ${entity}`;
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">Action</th>
              <th className="text-left py-3 px-4">Employee</th>
              <th className="text-left py-3 px-4">Details</th>
              <th className="text-left py-3 px-4">IP Address</th>
              <th className="text-left py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const Icon = getActionIcon(log.action);
              return (
                <tr key={log.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-[#114A55]" />
                      <span>{formatAction(log.action)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{log.employeeName}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {log.details.changes ? (
                        Object.entries(log.details.changes).map(([field, value]: [string, any]) => (
                          <div key={field} className="text-gray-600">
                            {field}: {value.from} → {value.to}
                          </div>
                        ))
                      ) : log.details.metadata ? (
                        Object.entries(log.details.metadata).map(([key, value]) => (
                          <div key={key} className="text-gray-600">
                            {key}: {value}
                          </div>
                        ))
                      ) : null}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{log.ipAddress}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{formatActivityDate(log.timestamp)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogList;