import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import Table from '../common/Table';
import SearchFilter from '../common/SearchFilter';
import StatusBadge from '../common/StatusBadge';
import { customerApi, followupApi } from '../../api/index';
import { formatDateTime } from '../../utils/formatDate';

const CUSTOMER_STATUS_CONFIG = {
  NEW: { label: 'New', className: 'status-pending', color: 'var(--info)' },
  CALLED: { label: 'Called', className: 'status-cancelled', color: 'var(--error)' },
  INTERESTED: { label: 'Interested', className: 'status-pending', color: 'var(--warning)' },
  JOINED: { label: 'Joined', className: 'status-active', color: 'var(--success)' },
};

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [followups, setFollowups] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [custRes, folRes] = await Promise.allSettled([
        customerApi.getAll(),
        followupApi.getToday(),
      ]);

      if (custRes.status === 'fulfilled') {
        setCustomers(custRes.value || []);
      }
      if (folRes.status === 'fulfilled') {
        setFollowups(folRes.value || []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      !searchTerm ||
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm);
    const matchesStatus = !statusFilter || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'phone', header: 'Phone' },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => {
        const config = CUSTOMER_STATUS_CONFIG[value] || CUSTOMER_STATUS_CONFIG.NEW;
        return <span className={`status-badge ${config.className}`}>{config.label}</span>;
      },
    },
    { key: 'joinedAt', header: 'Join Date', render: (value) => formatDateTime(value) },
  ];

  return (
    <div className="customer-list-screen">
      <div className="page-header">
        <h1 className="page-title">Customer List</h1>
        <button className="btn btn-primary" onClick={() => (window.location.href = '/customers/add')}>
          <Icons.Plus size={18} style={{ marginRight: '0.5rem' }} />
          Add Customer
        </button>
      </div>

      <SearchFilter
        placeholder="Search customers..."
        onSearch={setSearchTerm}
        filters={{
          status: {
            value: statusFilter,
            options: [
              { value: 'NEW', label: 'New' },
              { value: 'CALLED', label: 'Called' },
              { value: 'INTERESTED', label: 'Interested' },
              { value: 'JOINED', label: 'Joined' },
            ],
          },
        }}
        onFilter={(filters) => setStatusFilter(filters.status?.value || '')}
      />

      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={filteredCustomers}
          actions={(customer) => (
            <>
              <button
                className="btn-action btn-view"
                title="View"
                onClick={() => (window.location.href = `/customers/${customer.id}`)}
              >
                <Icons.Edit size={14} />
              </button>
              <button
                className="btn-action btn-edit"
                title="Follow-up"
                onClick={() => console.log('Schedule follow-up:', customer)}
              >
                <Icons.Phone size={14} />
              </button>
            </>
          )}
        />
      )}
    </div>
  );
};

export default CustomerList;
