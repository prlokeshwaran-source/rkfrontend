import React, { useState } from 'react';
import Table from '../common/Table';
import { Icons } from '../common/Icons';
import { formatDateTime } from '../../utils/formatDate';

const CallList = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [calls] = useState([
    {
      id: 1,
      customer: 'John Smith',
      phone: '555-1234',
      date: new Date(Date.now() - 1800000),
      status: 'completed',
      notes: 'Followed up on order',
    },
    {
      id: 2,
      customer: 'Jane Doe',
      phone: '555-1235',
      date: new Date(Date.now() + 3600000),
      status: 'upcoming',
      notes: 'Discuss renewal',
    },
    {
      id: 3,
      customer: 'Robert Wilson',
      phone: '555-1236',
      date: new Date(),
      status: 'pending',
      notes: 'Initial contact',
    },
  ]);

  const columns = [
    { key: 'customer', header: 'Customer Name' },
    { key: 'phone', header: 'Phone' },
    { key: 'date', header: 'Date', render: (value) => formatDateTime(value) },
    { key: 'notes', header: 'Notes' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Customer Calls</h1>
      </div>

      <div className="tab-list">
        <button
          className={`tab ${activeTab === 'today' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today's Calls
        </button>
        <button
          className={`tab ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <Table
        columns={columns}
        data={calls}
        actions={(call) => (
          <button className="btn-action btn-view" title="Call" onClick={() => console.log('Call:', call)}>
            <Icons.Phone size={14} />
          </button>
        )}
      />
    </div>
  );
};

export default CallList;

