import React from 'react';
import Logo from '../common/Logo';
import Logout from '../auth/Logout';
import { Icons } from '../common/Icons';

const ProfileView = () => {
  const user = {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '555-1234',
    role: 'Super Admin',
    joinedAt: '2024-01-15',
    avatar: null,
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Logo size="lg" />
        </div>
        <h2 style={{ color: '#4F2DBD', marginBottom: '0.25rem' }}>{user.name}</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{user.role}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <p><strong style={{ color: '#17152a' }}>Email:</strong> {user.email}</p>
            <p><strong style={{ color: '#17152a' }}>Phone:</strong> {user.phone}</p>
            <p><strong style={{ color: '#17152a' }}>Role:</strong> {user.role}</p>
            <p><strong style={{ color: '#17152a' }}>Member Since:</strong> {user.joinedAt}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-primary" style={{ width: 'auto' }}>
            <Icons.User size={16} style={{ marginRight: '0.5rem' }} />
            Change Password
          </button>
          <button className="btn btn-secondary" style={{ width: 'auto', backgroundColor: '#fff', color: '#4F2DBD', border: '1px solid #4F2DBD' }}>
            <Icons.Settings size={16} style={{ marginRight: '0.5rem' }} />
            Manage Devices
          </button>
        </div>

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

