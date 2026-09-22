import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icons } from '../common/Icons';
import Logout from '../auth/Logout';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/members': 'Member Management',
  '/approvals': 'User Approval',
  '/orders': 'Order Management',
  '/payments': 'Payment Management',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/profile': 'Profile',
  '/calls': 'Customer Calls',
};

const Header = ({ user, onMobileToggle }) => {
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] || 'Admin Panel';

  return (
    <>
      <header className="header">
        <div className="header-left">
          {onMobileToggle && (
            <button
              className="header-menu-btn"
              onClick={onMobileToggle}
              aria-label="Toggle navigation"
            >
              <Icons.Menu size={20} />
            </button>
          )}
        </div>
        <h2 className="header-title">{title}</h2>
        <div className="header-right">
          <button className="header-icon-btn" aria-label="Search">
            <Icons.Search size={18} />
          </button>
          <button className="header-icon-btn" aria-label="Notifications">
            <Icons.Bell size={18} />
          </button>
          <span className="header-user-name">
            {user?.name || user?.email || 'Admin'}
          </span>
          <div className="header-user-avatar">
            {getInitials(user?.name || user?.email || 'Admin')}
          </div>
          <Logout />
        </div>
      </header>
    </>
  );
};

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default Header;

