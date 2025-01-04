import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TicketList from '../components/tickets/TicketList';
import TicketFilters from '../components/tickets/TicketFilters';
import TicketModal from '../components/tickets/TicketModal';
import { Ticket } from '../types/ticket';

const Tickets: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#114A55] font-montserrat">User Tickets</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#114A55] text-white px-4 py-2 rounded-lg font-montserrat hover:bg-[#114A55]/90 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Ticket
        </button>
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