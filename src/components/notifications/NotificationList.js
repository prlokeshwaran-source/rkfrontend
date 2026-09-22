import React, { useState } from 'react';
import { Icons } from '../common/Icons';
import { formatDateTime } from '../../utils/formatDate';

const NOTIFICATION_ICONS = {
  payment: Icons.DollarSign,
  order: Icons.ShoppingCart,
  member: Icons.Users,
  approval: Icons.ClipboardCheck,
  warning: Icons.AlertCircle,
};

function getNotificationIcon(type) {
  return NOTIFICATION_ICONS[type] || Icons.Bell;
}

const NotificationList = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'payment',
      message: 'Payment received from John Smith ($250.00)',
      time: new Date(Date.now() - 3600000),
      unread: true,
    },
    {
      id: 2,
      type: 'order',
      message: 'New order #ORD-1238 placed by Jane Doe',
      time: new Date(Date.now() - 7200000),
      unread: true,
    },
    {
      id: 3,
      type: 'member',
      message: 'New member registered: Alice Johnson',
      time: new Date(Date.now() - 10800000),
      unread: false,
    },
    {
      id: 4,
      type: 'warning',
      message: 'Low stock alert for Product SKU-12345',
      time: new Date(Date.now() - 14400000),
      unread: true,
    },
    {
      id: 5,
      type: 'approval',
      message: 'User Carol White is pending approval',
      time: new Date(Date.now() - 18000000),
      unread: false,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return n.unread;
    if (filter === 'read') return !n.unread;
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
      </div>

      <div className="tab-list">
        <button
          className={`tab ${filter === 'all' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`tab ${filter === 'unread' ? 'tab-active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button
          className={`tab ${filter === 'read' ? 'tab-active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
      </div>

      <div className="card">
        {filteredNotifications.map((notification) => {
          const NotifIcon = getNotificationIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`notification-item ${notification.unread ? 'notification-unread' : 'notification-read'} notification-${notification.type}`}
            >
              <span className="notification-icon">
                <NotifIcon size={18} />
              </span>
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{formatDateTime(notification.time)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;

