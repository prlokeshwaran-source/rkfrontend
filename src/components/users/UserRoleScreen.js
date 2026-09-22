import React, { useState } from 'react';
import { Icons } from '../common/Icons';
import Modal from '../common/Modal';
import Table from '../common/Table';

const PERMISSIONS = [
  'manage_users',
  'manage_roles',
  'manage_orders',
  'manage_payments',
  'manage_reports',
  'manage_settings',
  'manage_notifications',
  'manage_content',
];

const ROLES_DATA = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all features and settings',
    permissions: PERMISSIONS,
    userCount: 1,
    isSystem: true,
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Administrative access to most features',
    permissions: [
      'manage_users',
      'manage_orders',
      'manage_payments',
      'manage_reports',
    ],
    userCount: 3,
    isSystem: false,
  },
  {
    id: 3,
    name: 'Manager',
    description: 'Manage team and orders',
    permissions: [
      'manage_orders',
      'manage_reports',
      'manage_notifications',
    ],
    userCount: 8,
    isSystem: false,
  },
  {
    id: 4,
    name: 'Staff',
    description: 'Basic access for daily operations',
    permissions: [
      'manage_orders',
      'manage_payments',
    ],
    userCount: 15,
    isSystem: false,
  },
];

const UserRoleScreen = () => {
  const [roles, setRoles] = useState(ROLES_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', permissions: [] });

  const handleAdd = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setIsModalOpen(true);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (role) => {
    if (window.confirm(`Delete role "${role.name}"?`)) {
      setRoles(roles.filter((r) => r.id !== role.id));
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Role name is required');
      return;
    }

    if (editingRole) {
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id
            ? { ...r, name: formData.name, description: formData.description, permissions: formData.permissions }
            : r
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
        userCount: 0,
        isSystem: false,
      };
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
  };

  const handlePermissionChange = (permission) => {
    if (formData.permissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permission),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      });
    }
  };

  const columns = [
    { key: 'name', header: 'Role Name' },
    { key: 'description', header: 'Description' },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (value) => (
        <span style={{ color: 'var(--secondary-text)', fontSize: '0.875rem' }}>
          {value.length} permissions
        </span>
      ),
    },
    { key: 'userCount', header: 'Users', align: 'center' },
  ];

  return (
    <div className="user-role-screen">
      <div className="page-header">
        <h1 className="page-title">User Roles</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Icons.Plus size={18} style={{ marginRight: '0.5rem' }} />
          Add Role
        </button>
      </div>

      <Table
        columns={columns}
        data={roles}
        actions={(role) => (
          <>
            <button
              className="btn-action btn-view"
              title="View"
              onClick={() => handleEdit(role)}
            >
              <Icons.Edit size={14} />
            </button>
            {!role.isSystem && (
              <button
                className="btn-action btn-reject"
                title="Delete"
                onClick={() => handleDelete(role)}
              >
                <Icons.Trash2 size={14} />
              </button>
            )}
          </>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRole ? 'Edit Role' : 'Add New Role'}
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
          className="role-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="form-group">
            <label className="form-label">Role Name</label>
            <input
              className="form-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter role name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter role description"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Permissions</label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '0.5rem',
              }}
            >
              {PERMISSIONS.map((permission) => {
                const isChecked = formData.permissions.includes(permission);
                return (
                  <label
                    key={permission}
                    className="permission-checkbox"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      border: isChecked
                        ? '2px solid var(--primary)'
                        : '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: isChecked ? 'rgba(79, 43, 183, 0.05)' : 'var(--card)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePermissionChange(permission)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span style={{ fontSize: '0.875rem' }}>
                      {permission.replace(/_/g, ' ')}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserRoleScreen;
