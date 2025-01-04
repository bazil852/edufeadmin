import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Modal from '../Modal';
import SearchableSelect from '../common/SearchableSelect';
import { Ticket } from '../../types/ticket';
import { dummyUsers } from '../../data/dummyData';
import { dummyEmployees } from '../../data/dummyData';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, ticket }) => {
  const [comment, setComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const userOptions = dummyUsers.map(user => ({
    value: user.id,
    label: `${user.name} (${user.email})`
  }));

  const employeeOptions = dummyEmployees.map(employee => ({
    value: employee.id,
    label: `${employee.name} - ${employee.role}`
  }));

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ticket ? 'Ticket Details' : 'Create New Ticket'}
      size="wide"
    >
      <div className="space-y-6">
        {ticket ? (
          <>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{ticket.title}</h3>
                <p className="text-gray-600 mt-2">{ticket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <select
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={ticket.priority}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <select
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={ticket.status}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <SearchableSelect
                  options={employeeOptions}
                  value={selectedEmployee}
                  onChange={setSelectedEmployee}
                  placeholder="Select employee to assign..."
                  label="Assign to Employee"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Comments</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {ticket.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-lg ${
                        comment.isInternal ? 'bg-yellow-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{comment.userName}</span>
                        <span className="text-xs text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                      {comment.isInternal && (
                        <span className="text-xs text-yellow-600 mt-2 block">Internal Note</span>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmitComment} className="mt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full rounded-lg border p-3 h-24"
                      />
                      <div className="mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isInternal}
                            onChange={(e) => setIsInternal(e.target.checked)}
                          />
                          <span className="text-sm text-gray-600">Internal note</span>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#114A55] text-white p-2 rounded-lg hover:bg-[#114A55]/90"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <form className="space-y-4">
            <SearchableSelect
              options={userOptions}
              value={selectedUser}
              onChange={setSelectedUser}
              placeholder="Select a user..."
              label="User"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Related</option>
                  <option value="billing">Billing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <SearchableSelect
                  options={employeeOptions}
                  value={selectedEmployee}
                  onChange={setSelectedEmployee}
                  placeholder="Select employee..."
                  label="Assign to"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90"
              >
                Create Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default TicketModal;