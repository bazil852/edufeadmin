import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import FraudAlertList from '../components/fraud/FraudAlertList';
import FraudAlertDetail from '../components/fraud/FraudAlertDetail';
import Modal from '../components/Modal';
import { dummyFraudAlerts } from '../data/dummyFraudAlerts';
import { FraudAlert } from '../types/fraud';
import { useAuth } from '../contexts/AuthContext';

const FraudDetection: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);
  const [alerts, setAlerts] = useState(dummyFraudAlerts);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyFraud');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyFraud', newValue.toString());
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800"
          alt="Coming Soon"
          className="w-50 h-40  object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          Fraud Detection System Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're developing an advanced fraud detection system to help you identify and prevent
          suspicious activities, protecting your users and their investments.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Real-time fraud detection</li>
            <li>• Risk scoring and assessment</li>
            <li>• Behavioral analysis</li>
            <li>• Automated alert system</li>
          </ul>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            onClick={toggleDummyPage}
            className="mt-8 px-6 py-3 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 transition-colors"
          >
            View Demo Version
          </button>
        )}
      </div>
    );
  }

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
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Fraud Detection</h2>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Demo Version</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">{alerts.filter(a => a.status === 'new').length} New Alerts</span>
        </div>
        <button
          onClick={toggleDummyPage}
          className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
        >
          Back to Coming Soon
        </button>
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