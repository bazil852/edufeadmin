import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  link?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, value, change, link }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => link && navigate(link)}
      className={`bg-white rounded-xl p-6 shadow-sm border ${link ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div className="flex items-center justify-between">
        <Icon className="text-[#114A55]" size={24} />
        <span className={`text-sm font-semibold ${
          change.startsWith('+') ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
};

export default DashboardCard;