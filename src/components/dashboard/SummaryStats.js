import React from 'react';
import { Icons } from '../common/Icons';

const SummaryStats = () => {
  const stats = [
    { label: "Today's Members", value: '142', icon: Icons.Users, color: 'var(--info)' },
    { label: "Today's Orders", value: '89', icon: Icons.ShoppingCart, color: 'var(--primary)' },
    { label: 'Revenue', value: '$12,450', icon: Icons.DollarSign, color: 'var(--success)' },
    { label: 'Pending Calls', value: '23', icon: Icons.Phone, color: 'var(--warning)' },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <IconComponent size={24} />
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryStats;

