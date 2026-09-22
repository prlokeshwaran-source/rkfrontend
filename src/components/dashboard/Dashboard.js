import React from 'react';
import SummaryStats from './SummaryStats';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <section className="stats-section">
        <SummaryStats />
      </section>

      <section className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <QuickActions />
      </section>

      <section className="activity-section">
        <RecentActivity />
      </section>
    </div>
  );
};

export default Dashboard;

