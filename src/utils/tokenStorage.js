const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

export const tokenStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token, expiresIn) {
    localStorage.setItem(TOKEN_KEY, token);
    if (expiresIn) {
      const expiry = Date.now() + expiresIn * 1000;
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
    }
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  getTokenExpiry() {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry, 10) : null;
  },
  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;
    return Date.now() < expiry;
  },
  clearStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },
};

export default tokenStorage;

