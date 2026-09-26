import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi, dashboardApi, walletApi, notificationApi } from '../api/index';
import tokenStorage from '../utils/tokenStorage';
import sessionManager from '../utils/sessionManager';

const AuthContext = createContext();

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
    const initAuth = async () => {
      if (tokenStorage.isTokenValid()) {
        try {
          const response = await authApi.getProfile();
          const userData = response.data || response;
          const resolvedId = userData?.id || userData?.userId || null;
          setUser({
            ...userData,
            id: resolvedId || Date.now(),
            userId: resolvedId,
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Session validation failed:', err);
          tokenStorage.clearStorage();
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
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
      const response = await authApi.login(credentials.emailOrPhone, credentials.password);
      const { accessToken, refreshToken, name, email, phone, role } = response;

      tokenStorage.setToken(accessToken, 3600);
      tokenStorage.setRefreshToken(refreshToken);

      const userData = {
        id: Date.now(),
        name: name || email,
        email,
        phone,
        role,
      };
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAdmin = useCallback(async (credentials) => {
    return login(credentials);
  }, [login]);

  const sendOtp = useCallback(async (phoneOrEmail) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.sendOtp(phoneOrEmail);
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send OTP';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (otpPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.verifyOtp(
        otpPayload.phoneOrEmail,
        otpPayload.otp,
        { password: otpPayload.password, name: otpPayload.name }
      );
      const { accessToken, refreshToken, name, email, phone, role, id, userId } = response;
      const resolvedId = id || userId || null;

      tokenStorage.setToken(accessToken, 3600);
      tokenStorage.setRefreshToken(refreshToken);

      const userData = {
        id: resolvedId || Date.now(),
        userId: resolvedId,
        name: name || email,
        email,
        phone,
        role,
      };
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid OTP';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.register(userData);
      const { accessToken, refreshToken, name, email, phone, role, id, userId } = response;
      const resolvedId = id || userId || null;

      tokenStorage.setToken(accessToken, 3600);
      tokenStorage.setRefreshToken(refreshToken);

      const newUserData = {
        id: resolvedId || Date.now(),
        userId: resolvedId,
        name: name || email,
        email,
        phone,
        role,
      };
      setUser(newUserData);
      setIsAuthenticated(true);
      return newUserData;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.forgotPassword(email);
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset email';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (resetPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!resetPayload.token) {
        throw new Error('Reset token is required');
      }
      if (!resetPayload.password || resetPayload.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      if (resetPayload.password !== resetPayload.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await authApi.resetPassword(resetPayload.token, resetPayload.password);
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Password reset failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      tokenStorage.clearStorage();
      sessionManager.stopSessionCheck();
      setUser(null);
      setIsAuthenticated(false);
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
        userId: user?.id || user?.userId || null,
        isAuthenticated,
        isLoading,
        error,
        login,
        loginAdmin,
        sendOtp,
        verifyOtp,
        register,
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

export { dashboardApi, walletApi, notificationApi };
export default AuthContext;
