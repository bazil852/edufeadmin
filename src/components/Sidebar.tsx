import React from 'react';
import { NavLink } from 'react-router-dom';
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

const Sidebar: React.FC = () => {
  const links = [
    { to: "/", icon: Layout, label: "Dashboard" },
    { to: "/users", icon: Users, label: "Users" },
    { to: "/employees", icon: Building2, label: "Employees" },
    { to: "/investments", icon: Briefcase, label: "Investments" },
    { to: "/user-investments", icon: DollarSign, label: "User Investments" },
    { to: "/transactions", icon: History, label: "Transactions" },
    { to: "/loanees", icon: Landmark, label: "Loanees" },
    { to: "/announcements", icon: Megaphone, label: "Announcements" },
    { to: "/education", icon: GraduationCap, label: "Education" },
    { to: "/fraud-detection", icon: ShieldAlert, label: "Fraud Detection" },
    { to: "/chats", icon: MessageSquare, label: "Chats" },
    { to: "/tickets", icon: Ticket, label: "Tickets" },
    { to: "/audit-logs", icon: FileText, label: "Audit Logs" },
    { to: "/reports", icon: PieChart, label: "Reports" },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r flex-shrink-0">
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="p-4">
          <ul className="space-y-2">
            {links.map((link) => (
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
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;