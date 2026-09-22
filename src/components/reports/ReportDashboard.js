import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { Icons } from '../common/Icons';
import { formatCurrency } from '../../utils/formatDate';

const ReportDashboard = () => {
  const [activeReport, setActiveReport] = useState('daily');

  const salesData = [
    { day: 'Mon', revenue: 1245, orders: 12 },
    { day: 'Tue', revenue: 1580, orders: 15 },
    { day: 'Wed', revenue: 980, orders: 9 },
    { day: 'Thu', revenue: 2100, orders: 22 },
    { day: 'Fri', revenue: 1875, orders: 18 },
    { day: 'Sat', revenue: 950, orders: 8 },
    { day: 'Sun', revenue: 1100, orders: 11 },
  ];

  const recentReports = [
    { id: 1, name: 'Daily Sales Report', date: '2024-09-15', status: 'completed' },
    { id: 2, name: 'Monthly Commission Report', date: '2024-09-01', status: 'completed' },
    { id: 3, name: 'Member Report', date: '2024-09-10', status: 'pending' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
      </div>

      <div className="tab-list">
        <button
          className={`tab ${activeReport === 'daily' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveReport('daily')}
        >
          Daily
        </button>
        <button
          className={`tab ${activeReport === 'monthly' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveReport('monthly')}
        >
          Monthly
        </button>
        <button
          className={`tab ${activeReport === 'sales' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveReport('sales')}
        >
          Sales
        </button>
        <button
          className={`tab ${activeReport === 'commission' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveReport('commission')}
        >
          Commission
        </button>
        <button
          className={`tab ${activeReport === 'member' ? 'tab-active tab-purple' : ''}`}
          onClick={() => setActiveReport('member')}
        >
          Member
        </button>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Revenue Overview</h3>
        <div className="chart-bar-container">
          {salesData.map((item) => (
            <div key={item.day} className="chart-bar-item">
              <div
                className="chart-bar"
                style={{ height: `${(item.revenue / 2500) * 100}%` }}
                title={`${item.day}: ${formatCurrency(item.revenue)}`}
              ></div>
              <span className="chart-bar-label">{item.day}</span>
              <span className="chart-bar-value">{formatCurrency(item.revenue)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="section-title">Recent Reports</h3>
        <button className="btn btn-primary btn-sm">
          <Icons.Save size={14} style={{ marginRight: '0.5rem' }} />
          Export PDF
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report) => (
              <tr key={report.id}>
                <td>{report.name}</td>
                <td>{report.date}</td>
                <td><StatusBadge status={report.status} /></td>
                <td>
                  <button className="btn-action btn-view">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDashboard;

