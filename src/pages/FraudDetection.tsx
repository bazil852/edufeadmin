import React, { useState } from 'react';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import FraudAlertList from '../components/fraud/FraudAlertList';
import FraudAlertDetail from '../components/fraud/FraudAlertDetail';
import Modal from '../components/Modal';
import { dummyFraudAlerts } from '../data/dummyFraudAlerts';
import { FraudAlert } from '../types/fraud';

const FraudDetection: React.FC = () => {
  const [alerts, setAlerts] = useState(dummyFraudAlerts);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewAlert = (alert: FraudAlert) => {
    setSelectedAlert(alert);
    setIsDetailModalOpen(true);
  };

  const handleAssignAlert = (alert: FraudAlert) => {
    console.log('Assign alert:', alert);
  };

  const handleUpdateStatus = (alert: FraudAlert, status: FraudAlert['status']) => {
    setAlerts(alerts.map(a => 
      a.id === alert.id ? { ...a, status } : a
    ));
  };

  const handleBlockUser = (userId: string) => {
    // In a real app, this would make an API call to block the user
    console.log('Blocking user:', userId);
    // Update alerts to show user is blocked
    setAlerts(alerts.map(alert =>
      alert.userId === userId
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Fraud Detection</h2>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
            {alerts.filter(a => a.status === 'new').length} New Alerts
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search alerts..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#114A55]"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
            <Filter size={20} className="text-gray-500" />
            <select className="bg-transparent border-none focus:ring-0">
              <option value="">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
            <AlertTriangle size={20} className="text-gray-500" />
            <select className="bg-transparent border-none focus:ring-0">
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="false-positive">False Positive</option>
            </select>
          </div>
        </div>
      </div>

      <FraudAlertList
        alerts={alerts}
        onView={handleViewAlert}
        onAssign={handleAssignAlert}
        onUpdateStatus={handleUpdateStatus}
        onBlockUser={handleBlockUser}
      />

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Fraud Alert Details"
      >
        {selectedAlert && <FraudAlertDetail alert={selectedAlert} />}
      </Modal>
    </div>
  );
};

export default FraudDetection;