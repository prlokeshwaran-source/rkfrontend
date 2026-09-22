import tokenStorage from './tokenStorage';

class SessionManager {
  constructor() {
    this.sessionCheckInterval = null;
    this.listeners = new Set();
  }

  startSessionCheck() {
    this.checkSession();
    this.sessionCheckInterval = setInterval(() => {
      this.checkSession();
    }, 60000);
  }

  stopSessionCheck() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
  }

  checkSession() {
    if (!tokenStorage.isTokenValid()) {
      this.handleSessionExpired();
    }
  }

  handleSessionExpired() {
    tokenStorage.clearStorage();
    this.notifyListeners();
  }

  refreshSession() {
    tokenStorage.clearStorage();
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Session listener error:', e);
      }
    });
  }

  getSessionInfo() {
    return {
      isAuthenticated: tokenStorage.isTokenValid(),
      token: tokenStorage.getToken(),
      hasRefreshToken: !!tokenStorage.getRefreshToken(),
      tokenExpiry: tokenStorage.getTokenExpiry(),
    };
  }

  destroy() {
    this.stopSessionCheck();
    this.listeners.clear();
    tokenStorage.clearStorage();
  }
}

const sessionManager = new SessionManager();
export default sessionManager;

