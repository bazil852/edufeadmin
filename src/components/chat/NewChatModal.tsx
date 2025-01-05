import React, { useState } from 'react';
import Modal from '../Modal';
import { User } from '../../types';
import SearchableSelect from '../common/SearchableSelect';
import { dummyUsers } from '../../data/dummyData';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (userId: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onStartChat
}) => {
  const [selectedUser, setSelectedUser] = useState('');

  const userOptions = dummyUsers.map(user => ({
    value: user.id,
    label: `${user.name} (${user.email})`
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      onStartChat(selectedUser);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Start New Chat"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchableSelect
          options={userOptions}
          value={selectedUser}
          onChange={setSelectedUser}
          placeholder="Select a user..."
          label="Select User"
        />

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
            disabled={!selectedUser}
            className="px-4 py-2 bg-[#114A55] text-white rounded-lg hover:bg-[#114A55]/90 disabled:opacity-50"
          >
            Start Chat
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewChatModal;