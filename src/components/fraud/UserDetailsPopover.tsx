import React, { useState } from 'react';
import { Mail, Phone, Ban, Copy, ExternalLink } from 'lucide-react';

interface UserDetailsPopoverProps {
  userName: string;
  email: string;
  phone: string;
  onBlock: () => void;
}

const UserDetailsPopover: React.FC<UserDetailsPopoverProps> = ({
  userName,
  email,
  phone,
  onBlock
}) => {
  const [showCopied, setShowCopied] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    await navigator.clipboard.writeText(text);
    setShowCopied(type);
    setTimeout(() => setShowCopied(null), 2000);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-4 w-72">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900">{userName}</h3>
          <button
            onClick={onBlock}
            className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
          >
            <Ban size={16} />
            Block User
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={16} />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(email, 'email')}
                className="text-gray-400 hover:text-gray-600"
                title="Copy email"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={handleEmailClick}
                className="text-gray-400 hover:text-gray-600"
                title="Send email"
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
          {showCopied === 'email' && (
            <span className="text-xs text-green-600">Email copied!</span>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={16} />
              <span className="text-sm">{phone}</span>
            </div>
            <button
              onClick={() => handleCopy(phone, 'phone')}
              className="text-gray-400 hover:text-gray-600"
              title="Copy phone"
            >
              <Copy size={14} />
            </button>
          </div>
          {showCopied === 'phone' && (
            <span className="text-xs text-green-600">Phone number copied!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopover;