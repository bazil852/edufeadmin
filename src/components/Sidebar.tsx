import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Briefcase, 
  PieChart, 
  Building2, 
  Layout, 
  DollarSign, 
  MessageSquare, 
  Ticket, 
  FileText,
  Megaphone,
  ShieldAlert,
  Landmark,
  History,
  GraduationCap
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  isComingSoon?: boolean;
}

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const activeLinks: NavItem[] = [
    { to: "/", icon: Layout, label: "Dashboard" },
    { to: "/users", icon: Users, label: "Users" },
    ...(isAdmin ? [{ to: "/employees", icon: Building2, label: "Employees" }] : []),
    { to: "/investments", icon: Briefcase, label: "Investments" },
    { to: "/announcements", icon: Megaphone, label: "Announcements" },
    { to: "/education", icon: GraduationCap, label: "Education" },
    { to: "/audit-logs", icon: FileText, label: "Audit Logs" },
  ];

  const comingSoonLinks: NavItem[] = [
    { to: "/user-investments", icon: DollarSign, label: "User Investments", isComingSoon: true },
    { to: "/transactions", icon: History, label: "Transactions", isComingSoon: true },
    { to: "/loanees", icon: Landmark, label: "Loanees", isComingSoon: true },
    { to: "/fraud-detection", icon: ShieldAlert, label: "Fraud Detection", isComingSoon: true },
    { to: "/chats", icon: MessageSquare, label: "Chats", isComingSoon: true },
    { to: "/tickets", icon: Ticket, label: "Tickets", isComingSoon: true },
    { to: "/reports", icon: PieChart, label: "Reports", isComingSoon: true }
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r flex-shrink-0">
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="p-4">
          <div className="space-y-6">
            <ul className="space-y-2">
              {activeLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#114A55] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    <link.icon size={20} />
                    <span className="font-montserrat">{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Coming Soon
              </h3>
              <ul className="space-y-2">
                {comingSoonLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#114A55] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon size={20} />
                      <span className="font-montserrat">{link.label}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      Soon
                    </span>
                  </NavLink>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;