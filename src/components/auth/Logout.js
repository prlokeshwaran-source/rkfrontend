import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Icons } from '../common/Icons';

const Logout = () => {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <button
      className="btn btn-logout"
      onClick={handleLogout}
      disabled={isLoading}
    >
      <Icons.LogOut size={16} style={{ marginRight: isLoading ? '0' : '0.5rem' }} />
      {isLoading ? 'Logging out...' : ''}
    </button>
  );
};

export default Logout;

