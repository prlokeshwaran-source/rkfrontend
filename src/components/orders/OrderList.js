import React, { useState } from 'react';
import Table from '../common/Table';
import StatusBadge from '../common/StatusBadge';
import { Icons } from '../common/Icons';
import { formatCurrency } from '../../utils/formatDate';

const OrderList = () => {
  const [orders] = useState([
    {
      id: '#ORD-1234',
      customer: 'John Smith',
      items: 3,
      total: 250.0,
      status: 'pending',
      date: '2024-09-15',
      paymentStatus: 'paid',
    },
    {
      id: '#ORD-1235',
      customer: 'Jane Doe',
      items: 1,
      total: 120.5,
      status: 'processing',
      date: '2024-09-14',
      paymentStatus: 'pending',
    },
    {
      id: '#ORD-1236',
      customer: 'Robert Wilson',
      items: 5,
      total: 480.75,
      status: 'completed',
      date: '2024-09-13',
      paymentStatus: 'paid',
    },
    {
      id: '#ORD-1237',
      customer: 'Emily Davis',
      items: 2,
      total: 95.0,
      status: 'cancelled',
      date: '2024-09-12',
      paymentStatus: 'refunded',
    },
  ]);

  const columns = [
    { key: 'id', header: 'Order ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'items', header: 'Items', align: 'center' },
    { key: 'total', header: 'Total', render: (value) => formatCurrency(value) },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge status={value} /> },
    { key: 'paymentStatus', header: 'Payment', render: (value) => <StatusBadge status={value} /> },
    { key: 'date', header: 'Date' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Order Management</h1>
        <button className="btn btn-primary">
          <Icons.Plus size={18} style={{ marginRight: '0.5rem' }} />
          Create Order
        </button>
      </div>

      <Table
        columns={columns}
        data={orders}
          actions={(order) => (
            <button className="btn-action btn-view" title="View" onClick={() => console.log('View:', order)}>
              <Icons.Edit size={14} />
            </button>
          )}
      />
    </div>
  );
};

export default OrderList;

