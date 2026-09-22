import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { Icons, NAV_ICONS } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

const ALL_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
  { id: 'customers', label: 'Customers', icon: 'users', path: '/customers' },
  { id: 'orders', label: 'Order Management', icon: 'orders', path: '/orders' },
  { id: 'payments', label: 'Payments', icon: 'payments', path: '/payments' },
  { id: 'wallet', label: 'Wallet', icon: 'dollar', path: '/wallet' },
  { id: 'training', label: 'Training', icon: 'book', path: '/training' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications', path: '/notifications' },
  { id: 'approvals', label: 'User Approval', icon: 'approval', path: '/approvals' },
  { id: 'roles', label: 'User Roles', icon: 'settings', path: '/roles' },
  { id: 'reports', label: 'Reports', icon: 'reports', path: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
  { id: 'profile', label: 'Profile', icon: 'profile', path: '/profile' },
  { id: 'calls', label: 'Customer Calls', icon: 'calls', path: '/calls' },
];

const Sidebar = ({ onMobileClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className="sidebar-scroll">
      <div className="sidebar-logo">
        <Logo size="md" showTagline={false} />
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {ALL_NAV_ITEMS.map((item) => {
            const IconComponent = NAV_ICONS[item.icon];
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id} className="sidebar-nav-item">
                <Link
                  to={item.path}
                  className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <span className="nav-icon">
                    {IconComponent && <IconComponent size={20} />}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-nav-link" onClick={handleLogoutClick}>
          <span className="nav-icon">
            <Icons.LogOut size={20} />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

