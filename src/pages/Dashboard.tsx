import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Wallet, AlertCircle, Clock, FileCheck, Briefcase, DollarSign, Calendar } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';

interface DashboardStats {
  totalUsers: number;
  totalInvestments: string;
  activePortfolios: number;
  pendingVerifications: number;
  avgPortfolioPerUser: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard-statistics`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard statistics');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#114A55]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers.toString()}
          change=""
          link="/users"
        />
        <DashboardCard
          icon={TrendingUp}
          title="Total Investments"
          value={`$${parseFloat(stats.totalInvestments).toLocaleString()}`}
          change=""
          link="/investments"
        />
        <DashboardCard
          icon={Wallet}
          title="Active Portfolios"
          value={stats.activePortfolios.toString()}
          change=""
          link="/user-investments"
        />
        <DashboardCard
          icon={AlertCircle}
          title="Pending Verifications"
          value={stats.pendingVerifications.toString()}
          change=""
          link="/users"
        />
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-xl font-bold text-[#114A55] mb-4">Average Statistics</h3>
        <p className="text-lg">
          Average Portfolios per User: <span className="font-semibold">{parseFloat(stats.avgPortfolioPerUser).toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;