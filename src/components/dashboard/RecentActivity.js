import React from 'react';
import { Icons } from '../common/Icons';
import { formatDateTime } from '../../utils/formatDate';

const ACTIVITY_ICONS = {
  member: Icons.Users,
  order: Icons.ShoppingCart,
  payment: Icons.CreditCard,
  approval: Icons.ClipboardCheck,
};

function getActivityIcon(type) {
  return ACTIVITY_ICONS[type] || Icons.Bell;
}

const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'member', message: 'New member registered: John Smith', time: new Date() },
    { id: 2, type: 'order', message: 'Order #12345 placed', time: new Date(Date.now() - 3600000) },
    { id: 3, type: 'payment', message: 'Payment received: $250.00', time: new Date(Date.now() - 7200000) },
    { id: 4, type: 'approval', message: 'User approved: Jane Doe', time: new Date(Date.now() - 10800000) },
  ];

  return (
    <div className="activity-card">
      <h3 className="activity-title">Recent Activity</h3>
      <ul className="activity-list">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.type);
          return (
            <li key={activity.id} className="activity-item">
              <span className="activity-type">
                <IconComponent size={16} />
              </span>
              <span className="activity-message">{activity.message}</span>
              <span className="activity-time">{formatDateTime(activity.time)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivity;

