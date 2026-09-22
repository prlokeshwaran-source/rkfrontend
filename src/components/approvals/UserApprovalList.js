import React, { useState } from 'react';
import Table from '../common/Table';
import StatusBadge from '../common/StatusBadge';
import { Icons } from '../common/Icons';

const UserApprovalList = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [users] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '555-1234',
      submittedAt: '2024-09-15',
      status: 'pending',
      type: 'individual',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '555-1235',
      submittedAt: '2024-09-14',
      status: 'pending',
      type: 'business',
    },
    {
      id: 3,
      name: 'Carol White',
      email: 'carol@example.com',
      phone: '555-1236',
      submittedAt: '2024-09-13',
      status: 'approved',
      approvedAt: '2024-09-14',
      type: 'individual',
    },
    {
      id: 4,
      name: 'David Lee',
      email: 'david@example.com',
      phone: '555-1237',
      submittedAt: '2024-09-12',
      status: 'rejected',
      reviewedAt: '2024-09-13',
      type: 'business',
    },
  ]);

  const filteredUsers = users.filter((u) => {
    if (activeTab === 'pending') return u.status === 'pending';
    if (activeTab === 'approved') return u.status === 'approved';
    if (activeTab === 'rejected') return u.status === 'rejected';
    return true;
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'type', header: 'Type' },
    { key: 'submittedAt', header: 'Submitted' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge status={value} /> },
  ];

  const handleApprove = (user) => {
    console.log('Approved:', user);
  };

  const handleReject = (user) => {
    console.log('Rejected:', user);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Approval</h1>
      </div>

      <div className="tab-list">
        <button
          className={`tab ${activeTab === 'pending' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={`tab ${activeTab === 'approved' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
        <button
          className={`tab ${activeTab === 'rejected' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </button>
      </div>

      <Table
        columns={columns}
        data={filteredUsers}
        actions={(user) =>
          user.status === 'pending' ? (
            <>
              <button className="btn-action btn-approve" title="Approve" onClick={() => handleApprove(user)}>
                <Icons.Check size={14} />
              </button>
              <button className="btn-action btn-reject" title="Reject" onClick={() => handleReject(user)}>
                <Icons.X size={14} />
              </button>
            </>
          ) : (
            <button className="btn-action btn-view" title="View" onClick={() => console.log('View:', user)}>
              <Icons.Edit size={14} />
            </button>
          )
        }
      />
    </div>
  );
};

export default UserApprovalList;

