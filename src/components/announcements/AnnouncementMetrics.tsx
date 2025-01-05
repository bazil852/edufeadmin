import React from 'react';
import { CheckCircle, XCircle, Clock, Users } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  total: number;
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, total, icon: Icon, color }) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <Icon size={20} className={color} />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-gray-500 text-sm mb-1">/ {total}</span>
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 mt-1">{percentage}% Success Rate</span>
      </div>
    </div>
  );
};

interface AnnouncementMetricsProps {
  metrics: {
    delivered: number;
    failed: number;
    pending: number;
    totalRecipients: number;
  };
}

const AnnouncementMetrics: React.FC<AnnouncementMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <MetricCard
        title="Successfully Delivered"
        value={metrics.delivered}
        total={metrics.totalRecipients}
        icon={CheckCircle}
        color="text-green-600"
      />
      <MetricCard
        title="Failed Deliveries"
        value={metrics.failed}
        total={metrics.totalRecipients}
        icon={XCircle}
        color="text-red-600"
      />
      <MetricCard
        title="Pending Delivery"
        value={metrics.pending}
        total={metrics.totalRecipients}
        icon={Clock}
        color="text-yellow-600"
      />
    </div>
  );
};

export default AnnouncementMetrics;