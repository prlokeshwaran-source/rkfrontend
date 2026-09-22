import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NAV_ICONS } from '../common/Icons';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
  { id: 'members', label: 'Members', icon: 'members', path: '/members' },
  { id: 'orders', label: 'Orders', icon: 'orders', path: '/orders' },
  { id: 'payments', label: 'Payments', icon: 'payments', path: '/payments' },
];

const BottomNav = ({ onOpenDrawer }) => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const IconComponent = NAV_ICONS[item.icon];
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            {IconComponent && <IconComponent size={20} />}
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}

      <button
        className="bottom-nav-item"
        title="More"
        onClick={onOpenDrawer}
        aria-label="Open menu"
      >
        <MoreIcon />
        <span className="bottom-nav-label">More</span>
      </button>
    </nav>
  );
};

const MoreIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export default BottomNav;

