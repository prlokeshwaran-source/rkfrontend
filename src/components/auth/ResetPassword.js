import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';
import { Icons } from '../common/Icons';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState('');
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tokenFromUrl =
    location.search &&
    new URLSearchParams(location.search).get('token');

  const [resetToken] = useState(tokenFromUrl || '');

  const validate = () => {
    if (!resetToken && !token) {
      setFormError('Reset token is required');
      return false;
    }
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    const finalToken = token || resetToken;

    try {
      await resetPassword({ token: finalToken, password, confirmPassword });
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Logo size="lg" />

        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">Enter your new password below</p>

        {(error || formError) && (
          <div className="alert alert-error">
            {formError || error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {!tokenFromUrl && (
            <div className="form-group">
              <label htmlFor="token" className="form-label">
                Reset Token
              </label>
              <input
                id="token"
                type="text"
                className="form-input"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter reset token"
                autoComplete="one-time-code"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="input-with-icon">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <Icons.EyeOff size={18} />
                ) : (
                  <Icons.Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <div className="input-with-icon">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowConfirm(!showConfirm)}
                disabled={isLoading}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? (
                  <Icons.EyeOff size={18} />
                ) : (
                  <Icons.Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/login" className="link-auth">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

