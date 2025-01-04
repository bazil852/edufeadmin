import React, { useState } from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';
import LanguageSwitch from './LanguageSwitch';
import NotificationCenter from './notifications/NotificationCenter';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { unreadCount } = useNotifications();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-2 h-16">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://i.postimg.cc/ydwjw0yr/image-removebg-preview-3.png" 
            alt="Edufe Logo" 
            className="h-12 w-auto"
          />
        </div>
        <div className="flex items-center space-x-6">
          <LanguageSwitch />
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 text-[#114A55] hover:bg-gray-100 rounded-full relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationCenter
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>
          <button className="p-2 text-[#114A55] hover:bg-gray-100 rounded-full">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-3 border-l pl-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <button className="p-2 text-[#114A55] hover:bg-gray-100 rounded-full">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;