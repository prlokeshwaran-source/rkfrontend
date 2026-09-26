import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../common/Icons';
import { dashboardApi, walletApi } from '../../api/index';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatDate';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
      const [dashRes, walletRes] = await Promise.allSettled([
        dashboardApi.getUserDashboard(),
        walletApi.getWallet(userId),
      ]);

      if (dashRes.status === 'fulfilled') {
        setDashboardData(dashRes.value);
      }
      if (walletRes.status === 'fulfilled') {
        setWalletData(walletRes.value);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  const stats = dashboardData
    ? [
        {
          label: 'Total Customers',
          value: dashboardData.totalCustomers || 0,
          icon: Icons.Users,
          color: 'var(--info)',
        },
        {
          label: 'Today Orders',
          value: dashboardData.todayOrders || 0,
          icon: Icons.ShoppingCart,
          color: 'var(--primary)',
        },
        {
          label: 'Today Revenue',
          value: formatCurrency(dashboardData.todayRevenue || 0),
          icon: Icons.DollarSign,
          color: 'var(--success)',
        },
        {
          label: 'Pending Calls',
          value: dashboardData.pendingCalls || 0,
          icon: Icons.Phone,
          color: 'var(--warning)',
        },
      ]
    : [
        { label: 'Total Customers', value: '0', icon: Icons.Users, color: 'var(--info)' },
        { label: 'Today Orders', value: '0', icon: Icons.ShoppingCart, color: 'var(--primary)' },
        { label: 'Today Revenue', value: '$0', icon: Icons.DollarSign, color: 'var(--success)' },
        { label: 'Pending Calls', value: '0', icon: Icons.Phone, color: 'var(--warning)' },
      ];

  const walletBalance = walletData?.balance
    ? formatCurrency(walletData.balance)
    : formatCurrency(0);
  const totalEarnings = walletData?.totalMembershipEarnings
    ? formatCurrency(walletData.totalMembershipEarnings)
    : '$0';

  return (
    <div className="dashboard-content">
      <section className="stats-section">
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
      </section>

      <section className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link className="quick-action-btn" to="/customers">
            <span className="quick-action-icon">
              <Icons.Users size={28} />
            </span>
            <span className="quick-action-label">Add Customer</span>
          </Link>
          <Link className="quick-action-btn" to="/orders">
            <span className="quick-action-icon">
              <Icons.ShoppingCart size={28} />
            </span>
            <span className="quick-action-label">Create Order</span>
          </Link>
          <Link className="quick-action-btn" to="/training">
            <span className="quick-action-icon">
              <Icons.Book size={28} />
            </span>
            <span className="quick-action-label">Add Training</span>
          </Link>
          <Link className="quick-action-btn" to="/notifications">
            <span className="quick-action-icon">
              <Icons.Bell size={28} />
            </span>
            <span className="quick-action-label">Send Notification</span>
          </Link>
        </div>
      </section>

      {walletData && (
        <section className="wallet-summary-section">
          <h2 className="section-title">Wallet Summary</h2>
          <div className="stats-grid" style={{ marginTop: 0 }}>
            <div className="stat-card">
              <div className="stat-icon" style={{ color: 'var(--success)' }}>
                <Icons.DollarSign size={24} />
              </div>
              <div className="stat-value" style={{ color: 'var(--success)' }}>
                {walletBalance}
              </div>
              <div className="stat-label">Balance</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ color: 'var(--info)' }}>
                <Icons.DollarSign size={24} />
              </div>
              <div className="stat-value" style={{ color: 'var(--info)' }}>
                {totalEarnings}
              </div>
              <div className="stat-label">Total Earnings</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
