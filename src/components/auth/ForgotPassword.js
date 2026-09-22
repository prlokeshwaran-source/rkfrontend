import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) {
      setFormError('Email address is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address');
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
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Forgot password error:', err);
    }
  };

  const handleReset = () => {
    navigate('/reset-password');
  };

  if (isSubmitted) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <Logo size="lg" />

          <h1 className="auth-title">Check Your Email</h1>
          <p className="auth-subtitle">
            We've sent a password reset link to <strong>{email}</strong>
          </p>

          <div className="alert alert-success">
            If the email exists in our system, you will receive a reset link shortly.
          </div>

          <button
            type="button"
            className="btn btn-primary btn-login"
            onClick={handleReset}
          >
            Reset Password
          </button>

          <p className="auth-footer">
            <Link to="/login" className="link-auth">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Logo size="lg" />

        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">
          Enter your email address and we'll send you a reset link
        </p>

        {(error || formError) && (
          <div className="alert alert-error">
            {formError || error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
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
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;

