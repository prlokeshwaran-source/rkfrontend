import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import { walletApi } from '../../api/index';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDateTime } from '../../utils/formatDate';

const WalletScreen = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await walletApi.getWallet(userId);
      setWallet(data);
    } catch (err) {
      console.error('Failed to fetch wallet:', err);
      setWallet(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="wallet-screen">
      <div className="page-header">
        <h1 className="page-title">Wallet</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--success)' }}>
            <Icons.DollarSign size={24} />
          </div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {wallet ? formatCurrency(wallet.balance) : '$0.00'}
          </div>
          <div className="stat-label">Current Balance</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--success)' }}>
            <Icons.DollarSign size={24} />
          </div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {wallet ? formatCurrency(wallet.totalMembershipEarnings) : '$0.00'}
          </div>
          <div className="stat-label">Membership Earnings</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--info)' }}>
            <Icons.DollarSign size={24} />
          </div>
          <div className="stat-value" style={{ color: 'var(--info)' }}>
            {wallet ? formatCurrency(wallet.totalHandbookEarnings) : '$0.00'}
          </div>
          <div className="stat-label">Handbook Earnings</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--warning)' }}>
            <Icons.DollarSign size={24} />
          </div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>
            {wallet ? formatCurrency(wallet.totalBonus) : '$0.00'}
          </div>
          <div className="stat-label">Bonus</div>
        </div>
      </div>

      {wallet?.recentTransactions && wallet.recentTransactions.length > 0 && (
        <div className="card">
          <h3 className="card-title">Recent Transactions</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {wallet.recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.transactionType}</td>
                  <td>{tx.description}</td>
                  <td>{formatCurrency(tx.amount)}</td>
                  <td>{formatDateTime(tx.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WalletScreen;
