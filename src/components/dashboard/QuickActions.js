import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../common/Icons';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Add Member', icon: Icons.Users, path: '/members' },
    { label: 'Create Order', icon: Icons.ShoppingCart, path: '/orders' },
    { label: 'View Reports', icon: Icons.BarChart3, path: '/reports' },
    { label: 'Send Notification', icon: Icons.Bell, path: '/notifications' },
  ];

  return (
    <div className="quick-actions-grid">
      {actions.map((action, index) => {
        const IconComponent = action.icon;
        return (
          <button
            key={index}
            className="quick-action-btn"
            onClick={() => navigate(action.path)}
          >
            <span className="quick-action-icon">
              <IconComponent size={28} />
            </span>
            <span className="quick-action-label">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;

