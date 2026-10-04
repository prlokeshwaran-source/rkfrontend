import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';
import { Icons } from '../common/Icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const validate = () => {
    if (!email.trim()) {
      setFormError('Email is required');
      return false;
    }
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Logo size="lg" />

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Login to your admin account</p>

        {(error || formError) && (
          <div className="alert alert-error">
            {formError || error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
              <input
                id="email"
                type="email"
                className={`form-input ${formError ? 'form-input-error' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError('');
                }}
                placeholder="Enter your email"
                autoComplete="username"
                disabled={isLoading}
              />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-with-icon">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
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

          <div className="form-options">
            <Link to="/forgot-password" className="link-forgot">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="link-auth">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

