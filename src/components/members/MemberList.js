import React, { useState } from 'react';
import Table from '../common/Table';
import SearchFilter from '../common/SearchFilter';
import StatusBadge from '../common/StatusBadge';
import Modal from '../common/Modal';
import MemberForm from './MemberForm';
import { Icons } from '../common/Icons';

const MemberList = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [members] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '555-1234', status: 'active', joinDate: '2024-09-15', tier: 'Gold' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '555-1235', status: 'pending', joinDate: '2024-09-14', tier: 'Silver' },
    { id: 3, name: 'Robert Wilson', email: 'robert@example.com', phone: '555-1236', status: 'inactive', joinDate: '2024-09-10', tier: 'Bronze' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '555-1237', status: 'active', joinDate: '2024-09-12', tier: 'Gold' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '555-1238', status: 'pending', joinDate: '2024-09-13', tier: 'Silver' },
  ]);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'tier', header: 'Tier' },
    { key: 'joinDate', header: 'Join Date' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge status={value} /> },
  ];

  const handleView = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = (member) => {
    if (window.confirm(`Delete ${member.name}?`)) {
      console.log('Delete confirmed for member:', member);
    }
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsFormOpen(true);
  };

  const filters = {
    tier: {
      value: '',
      options: [
        { value: 'gold', label: 'Gold' },
        { value: 'silver', label: 'Silver' },
        { value: 'bronze', label: 'Bronze' },
      ],
    },
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Member Management</h1>
        <button className="btn btn-primary" onClick={handleAddMember}>
          <Icons.Plus size={18} style={{ marginRight: '0.5rem' }} />
          Add Member
        </button>
      </div>

      <SearchFilter placeholder="Search members..." filters={filters} />

      <Table
        columns={columns}
        data={members}
        actions={(member) => (
          <>
            <button className="btn-action btn-view" title="View" onClick={() => handleView(member)}>
              <Icons.Eye size={14} />
            </button>
            <button className="btn-action btn-edit" title="Edit" onClick={() => handleEdit(member)}>
              <Icons.Edit size={14} />
            </button>
            <button className="btn-action btn-reject" title="Delete" onClick={() => handleDelete(member)}>
              <Icons.Trash2 size={14} />
            </button>
          </>
        )}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Member Details">
        {selectedMember && (
          <div className="member-detail">
            <p><strong>Name:</strong> {selectedMember.name}</p>
            <p><strong>Email:</strong> {selectedMember.email}</p>
            <p><strong>Phone:</strong> {selectedMember.phone}</p>
            <p><strong>Tier:</strong> {selectedMember.tier}</p>
            <p><strong>Status:</strong> <StatusBadge status={selectedMember.status} /></p>
            <p><strong>Join Date:</strong> {selectedMember.joinDate}</p>
          </div>
        )}
      </Modal>

      {isFormOpen && (
        <MemberForm
          member={selectedMember}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedMember(null);
          }}
        />
      )}
    </div>
  );
};

export default MemberList;

