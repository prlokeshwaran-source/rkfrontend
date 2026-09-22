import React, { useState } from 'react';
import Table from '../common/Table';
import StatusBadge from '../common/StatusBadge';
import { Icons } from '../common/Icons';
import { formatCurrency, formatDateTime } from '../../utils/formatDate';

const PaymentList = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [payments] = useState([
    {
      id: '#PAY-001',
      payer: 'John Smith',
      amount: 250.0,
      method: 'Credit Card',
      status: 'received',
      date: '2024-09-15T10:30:00',
    },
    {
      id: '#PAY-002',
      payer: 'Jane Doe',
      amount: 120.5,
      method: 'Bank Transfer',
      status: 'pending',
      date: '2024-09-15T08:15:00',
    },
    {
      id: '#PAY-003',
      payer: 'Robert Wilson',
      amount: 480.75,
      method: 'Credit Card',
      status: 'received',
      date: '2024-09-14T14:20:00',
    },
    {
      id: '#PAY-004',
      payer: 'Emily Davis',
      amount: 95.0,
      method: 'Wallet',
      status: 'pending',
      date: '2024-09-14T09:45:00',
    },
  ]);

  const filteredPayments = payments.filter((p) => {
    if (activeTab === 'received') return p.status === 'received';
    if (activeTab === 'pending') return p.status === 'pending';
    return true;
  });

  const columns = [
    { key: 'id', header: 'Payment ID' },
    { key: 'payer', header: 'Payer' },
    { key: 'amount', header: 'Amount', render: (value) => formatCurrency(value) },
    { key: 'method', header: 'Method' },
    { key: 'date', header: 'Date', render: (value) => formatDateTime(value) },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge status={value} /> },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Payment Management</h1>
      </div>

      <div className="tab-list">
        <button
          className={`tab ${activeTab === 'all' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Payments
        </button>
        <button
          className={`tab ${activeTab === 'received' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          Received
        </button>
        <button
          className={`tab ${activeTab === 'pending' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
      </div>

      <Table
        columns={columns}
        data={filteredPayments}
          actions={(payment) => (
            <button className="btn-action btn-view" title="View" onClick={() => console.log('View:', payment)}>
              <Icons.Edit size={14} />
            </button>
          )}
      />
    </div>
  );
};

export default PaymentList;

