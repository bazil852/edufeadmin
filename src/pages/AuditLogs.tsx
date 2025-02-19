import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import AuditLogList from '../components/audit/AuditLogList';
import AuditFilters from '../components/audit/AuditFilters';
import { exportToCSV } from '../utils/exportUtils';

interface APIAuditLog {
  id: number;
  action: string;
  details: any;
  ipAddress: string | null;
  createdAt: string;
}

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<APIAuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<APIAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/audit-logs`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch audit logs');
        }

        const data = await response.json();
        setLogs(data);
        setFilteredLogs(data);
      } catch (err) {
        console.error('Error fetching audit logs:', err);
        setError('Failed to load audit logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  const handleFilterChange = (filters: {
    search: string;
    action: string;
    dateRange: string;
  }) => {
    let filtered = [...logs];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(log =>
        log.action.toLowerCase().includes(searchLower) ||
        log.ipAddress?.toLowerCase().includes(searchLower)
      );
    }

    // Apply action filter
    if (filters.action) {
      filtered = filtered.filter(log =>
        log.action.includes(filters.action)
      );
    }

    // Apply date range filter
    if (filters.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case '24h':
          filterDate.setHours(filterDate.getHours() - 24);
          break;
        case '7d':
          filterDate.setDate(filterDate.getDate() - 7);
          break;
        case '30d':
          filterDate.setDate(filterDate.getDate() - 30);
          break;
        case '90d':
          filterDate.setDate(filterDate.getDate() - 90);
          break;
      }
      
      filtered = filtered.filter(log => new Date(log.createdAt) >= filterDate);
    }

    setFilteredLogs(filtered);
  };

  const handleExport = () => {
    const data = filteredLogs.map(log => ({
      Action: log.action,
      'IP Address': log.ipAddress || 'N/A',
      'Created At': new Date(log.createdAt).toLocaleString(),
      Details: log.details ? JSON.stringify(log.details) : 'N/A'
    }));

    exportToCSV(data, `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Audit Logs</h2>
        <button 
          onClick={handleExport}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2 disabled:opacity-50"
          disabled={isLoading || !!error}
        >
          <Download size={20} />
          Export Logs
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <AuditFilters onFilterChange={handleFilterChange} />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
        </div>
      ) : (
        <AuditLogList 
          logs={filteredLogs.map(log => ({
            id: log.id.toString(),
            action: log.action,
            employeeId: '1', // These fields are not in the API response
            employeeName: 'System',
            details: log.details || {},
            ipAddress: log.ipAddress || 'Unknown',
            timestamp: log.createdAt
          }))} 
        />
      )}
    </div>
  );
};

export default AuditLogs;