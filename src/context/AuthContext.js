import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import tokenStorage from '../utils/tokenStorage';
import sessionManager from '../utils/sessionManager';

const AuthContext = createContext();

const MOCK_ADMIN = {
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: null,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = () => {
      if (tokenStorage.isTokenValid()) {
        const storedUser = tokenStorage.getToken();
        if (storedUser === 'mock_admin_token') {
          setUser(MOCK_ADMIN);
          setIsAuthenticated(true);
        } else {
          tokenStorage.clearStorage();
        }
      }
      setIsLoading(false);
    };

    initAuth();

    const unsubscribe = sessionManager.subscribe(() => {
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    });

    sessionManager.startSessionCheck();

    return () => {
      unsubscribe();
      sessionManager.stopSessionCheck();
    };
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      if (credentials.emailOrUsername === '' || credentials.password === '') {
        throw new Error('Please fill in all fields');
      }
      if (credentials.password.length < 3) {
        throw new Error('Invalid credentials');
      }
      tokenStorage.setToken('mock_admin_token', 3600);
      setUser(MOCK_ADMIN);
      setIsAuthenticated(true);
      return MOCK_ADMIN;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAdmin = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      if (credentials.email === '' || credentials.password === '') {
        throw new Error('Please fill in all fields');
      }
      if (credentials.password.length < 3) {
        throw new Error('Invalid admin credentials');
      }
      tokenStorage.setToken('mock_admin_token', 3600);
      setUser(MOCK_ADMIN);
      setIsAuthenticated(true);
      return MOCK_ADMIN;
    } catch (err) {
      setError(err.message || 'Admin login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendOtp = useCallback(async (phoneOrEmail) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!phoneOrEmail || phoneOrEmail.trim() === '') {
        throw new Error('Phone number or email is required');
      }
      return true;
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (otpPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!otpPayload.otp || otpPayload.otp.length < 4) {
        throw new Error('Invalid OTP');
      }
      tokenStorage.setToken('mock_admin_token', 3600);
      setUser(MOCK_ADMIN);
      setIsAuthenticated(true);
      return MOCK_ADMIN;
    } catch (err) {
      setError(err.message || 'Invalid OTP');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      return true;
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (resetPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!resetPayload.token || resetPayload.token.trim() === '') {
        throw new Error('Reset token is required');
      }
      if (!resetPayload.password || resetPayload.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      if (resetPayload.password !== resetPayload.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    } catch (err) {
      setError(err.message || 'Password reset failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      tokenStorage.clearStorage();
      sessionManager.stopSessionCheck();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        loginAdmin,
        sendOtp,
        verifyOtp,
        forgotPassword,
        resetPassword,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

