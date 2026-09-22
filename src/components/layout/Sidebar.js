import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { Icons, NAV_ICONS } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

const ALL_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
  { id: 'members', label: 'Member Management', icon: 'members', path: '/members' },
  { id: 'approvals', label: 'User Approval', icon: 'approval', path: '/approvals' },
  { id: 'orders', label: 'Order Management', icon: 'orders', path: '/orders' },
  { id: 'payments', label: 'Payment Management', icon: 'payments', path: '/payments' },
  { id: 'reports', label: 'Reports', icon: 'reports', path: '/reports' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications', path: '/notifications' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
  { id: 'profile', label: 'Profile', icon: 'profile', path: '/profile' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
  { id: 'calls', label: 'Customer Calls', icon: 'calls', path: '/calls' },
  { id: 'roles', label: 'User Roles', icon: 'approval', path: '/roles' },
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

