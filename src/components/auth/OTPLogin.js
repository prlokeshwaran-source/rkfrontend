import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const OTPLogin = () => {
  const [step, setStep] = useState('phone');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [formError, setFormError] = useState('');
  const { sendOtp, verifyOtp, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSendOtp = async (e) => {
    e.preventDefault();
    clearError();

    if (!phoneOrEmail.trim()) {
      setFormError('Phone number or email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(phoneOrEmail) && !/^[\d\s+\-()]+$/.test(phoneOrEmail)) {
      setFormError('Please enter a valid email or phone number');
      return;
    }

    setFormError('');

    try {
      await sendOtp(phoneOrEmail);
      setStep('otp');
    } catch (err) {
      console.error('Send OTP error:', err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearError();

    if (!otp || otp.length < 4) {
      setFormError('Please enter the complete OTP');
      return;
    }

    setFormError('');

    try {
      await verifyOtp({ phoneOrEmail, otp });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Verify OTP error:', err);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setOtp(value);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Logo size="lg" />

        <h1 className="auth-title">OTP Login</h1>
        <p className="auth-subtitle">
          {step === 'phone'
            ? 'Enter your phone or email to receive OTP'
            : 'Enter the OTP sent to your device'}
        </p>

        {(error || formError) && (
          <div className="alert alert-error">
            {formError || error}
          </div>
        )}

        {step === 'phone' && (
          <form className="auth-form" onSubmit={handleSendOtp} noValidate>
            <div className="form-group">
              <label htmlFor="phoneOrEmail" className="form-label">
                Phone Number or Email
              </label>
              <input
                id="phoneOrEmail"
                type="text"
                className={`form-input ${formError ? 'form-input-error' : ''}`}
                value={phoneOrEmail}
                onChange={(e) => {
                  setPhoneOrEmail(e.target.value);
                  setFormError('');
                }}
                placeholder="Enter phone number or email"
                autoComplete="tel"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form className="auth-form" onSubmit={handleVerifyOtp} noValidate>
            <div className="form-group">
              <label htmlFor="otp" className="form-label">
                OTP Code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                className={`form-input otp-input ${formError ? 'form-input-error' : ''}`}
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                autoComplete="one-time-code"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>
        )}

        <div className="otp-resend">
          <button
            type="button"
            className="btn btn-link-resend"
            onClick={() => {
              setStep('phone');
              setOtp('');
              setPhoneOrEmail('');
              setFormError('');
              clearError();
            }}
          >
            Use different number
          </button>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-back"
          onClick={() => navigate('/login')}
        >
          Back to login
        </button>

        <p className="auth-footer">
          <Link to="/register" className="link-auth">
            Need an account? Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPLogin;

