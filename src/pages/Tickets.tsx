import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TicketList from '../components/tickets/TicketList';
import TicketFilters from '../components/tickets/TicketFilters';
import TicketModal from '../components/tickets/TicketModal';
import { Ticket } from '../types/ticket';
import { useAuth } from '../contexts/AuthContext';

const Tickets: React.FC = () => {
  const { user } = useAuth();
  const [showDummyPage, setShowDummyPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const savedPreference = localStorage.getItem('showDummyTickets');
    if (savedPreference) {
      setShowDummyPage(savedPreference === 'true');
    }
  }, []);

  const toggleDummyPage = () => {
    const newValue = !showDummyPage;
    setShowDummyPage(newValue);
    localStorage.setItem('showDummyTickets', newValue.toString());
  };

  if (!showDummyPage) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800"
          alt="Coming Soon"
          className="w-50 h-40  object-cover rounded-xl mb-8 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[#114A55] mb-4 text-center">
          Support Ticket System Coming Soon
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          We're building a comprehensive ticket management system to help you track and resolve
          user inquiries efficiently and effectively.
        </p>
        <div className="space-y-4 text-center">
          <p className="text-gray-500">Expected features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Ticket categorization and prioritization</li>
            <li>• Automated ticket routing</li>
            <li>• SLA tracking and management</li>
            <li>• Performance analytics</li>
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

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">User Tickets</h2>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Demo Version</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDummyPage}
            className="px-4 py-2 border border-[#114A55] text-[#114A55] rounded-lg hover:bg-[#114A55]/10"
          >
            Back to Coming Soon
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
          >
            <Plus size={20} />
            Create Ticket
          </button>
        </div>
      </div>

      <TicketFilters />
      <TicketList onViewTicket={handleViewTicket} />
      
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default Tickets;