import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Ticket } from '../../types/ticket';
import { dummyTickets } from '../../data/dummyTickets';
import { formatActivityDate } from '../../utils/dateUtils';

interface TicketListProps {
  onViewTicket: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({ onViewTicket }) => {
  const tickets: Ticket[] = dummyTickets;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Priority</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Assigned To</th>
              <th className="text-left py-3 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewTicket(ticket)}
              >
                <td className="py-3 px-4">{ticket.title}</td>
                <td className="py-3 px-4">{ticket.userName}</td>
                <td className="py-3 px-4">{ticket.type}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 px-4">{ticket.assignedTo || '-'}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{formatActivityDate(ticket.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;