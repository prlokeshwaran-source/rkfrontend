import React, { useState } from 'react';
import { Icons } from '../common/Icons';

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    companyName: 'RK Admin',
    emailNotifcations: true,
    smsNotifications: false,
    commissionRate: '10',
    currency: 'USD',
    timezone: 'UTC',
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="tab-list">
        <button className="tab tab-active tab-purple">General</button>
        <button className="tab">Commission</button>
        <button className="tab">Payments</button>
        <button className="tab">Notifications</button>
        <button className="tab">User Roles</button>
      </div>

      <div className="card">
        <div className="setting-group">
          <div className="setting-group-title">General Settings</div>

          <div className="setting-row">
            <div>
              <label className="setting-label">Company Name</label>
              <p className="setting-description">Your organization's name</p>
            </div>
            <input
              type="text"
              className="form-input"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              style={{ width: '200px' }}
            />
          </div>

          <div className="setting-row">
            <div>
              <label className="setting-label">Timezone</label>
              <p className="setting-description">Default timezone for reports</p>
            </div>
            <select
              className="filter-select"
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              style={{ width: '200px' }}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="GMT">GMT</option>
            </select>
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-group-title">Notification Settings</div>

          <div className="setting-row">
            <label className="setting-label">Email Notifications</label>
            <input
              type="checkbox"
              checked={settings.emailNotifcations}
              onChange={(e) => setSettings({ ...settings, emailNotifcations: e.target.checked })}
            />
          </div>

          <div className="setting-row">
            <label className="setting-label">SMS Notifications</label>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-group-title">Payment Settings</div>

          <div className="setting-row">
            <div>
              <label className="setting-label">Currency</label>
            </div>
            <select
              className="filter-select"
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              style={{ width: '200px' }}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>

          <div className="setting-row">
            <div>
              <label className="setting-label">Commission Rate (%)</label>
            </div>
            <input
              type="number"
              className="form-input"
              value={settings.commissionRate}
              onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
              style={{ width: '200px' }}
            />
          </div>
        </div>

        <div className="setting-row">
          <button className="btn btn-primary">
            <Icons.Save size={16} style={{ marginRight: '0.5rem' }} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;

