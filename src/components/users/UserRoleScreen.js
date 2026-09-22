import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { userApi } from '../../api/index';
import { formatDateTime } from '../../utils/formatDate';

const ROLES = [
  { value: 'ROLE_SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ROLE_ADMIN', label: 'Admin' },
  { value: 'ROLE_MANAGER', label: 'Manager' },
  { value: 'ROLE_USER', label: 'User' },
];

const UserRoleScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'ROLE_USER',
    status: 'PENDING',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userApi.getAll();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'ROLE_USER',
      status: 'PENDING',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      password: '',
      role: user.roles?.[0]?.name || 'ROLE_USER',
      status: user.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Name and email are required');
      return;
    }

    try {
      if (editingUser) {
        await userApi.update(editingUser.id, {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          status: formData.status,
          roles: [{ name: formData.role }],
        });
      } else {
        await userApi.create({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error('Save failed:', err);
      alert(err.response?.data?.message || 'Failed to save user');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      ACTIVE: { className: 'status-active', label: 'Active' },
      PENDING: { className: 'status-pending', label: 'Pending' },
      INACTIVE: { className: 'status-inactive', label: 'Inactive' },
      REJECTED: { className: 'status-rejected', label: 'Rejected' },
    };
    const config = statusMap[status] || statusMap.PENDING;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'roles',
      header: 'Role',
      render: (roles) => roles?.[0]?.name?.replace('ROLE_', '').replace('_', ' ') || 'User',
    },
    { key: 'status', header: 'Status', render: (value) => getStatusBadge(value) },
    { key: 'createdAt', header: 'Created', render: (value) => formatDateTime(value) },
  ];

  return (
    <div className="user-role-screen">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Icons.Plus size={18} style={{ marginRight: '0.5rem' }} />
          Add User
        </button>
      </div>

      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={users}
          actions={(user) => (
            <button className="btn-action btn-view" title="Edit" onClick={() => handleEdit(user)}>
              <Icons.Edit size={14} />
            </button>
          )}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        footer={
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Icons.Save size={16} style={{ marginRight: '0.5rem' }} />
              Save
            </button>
          </div>
        }
      >
        <form
          className="user-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone"
            />
          </div>

          {!editingUser && (
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="filter-select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="filter-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="INACTIVE">Inactive</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserRoleScreen;
