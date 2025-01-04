import React from 'react';
import { Download } from 'lucide-react';
import AuditLogList from '../components/audit/AuditLogList';
import AuditFilters from '../components/audit/AuditFilters';
import { dummyAuditLogs } from '../data/dummyAuditLogs';

const AuditLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Audit Logs</h2>
        <button className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2">
          <Download size={20} />
          Export Logs
        </button>
      </div>

      <AuditFilters />
      <AuditLogList logs={dummyAuditLogs} />
    </div>
  );
};

export default AuditLogs;