import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import sessionManager from '../utils/sessionManager';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://rkbackend-chf2.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data && typeof data === 'object' && 'data' in data) {
      return { ...response, data: data.data };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = tokenStorage.getRefreshToken();
      if (refresh) {
        try {
          const res = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken: refresh });
          const { accessToken, refreshToken: newRefresh } = res.data.data || res.data;
          tokenStorage.setToken(accessToken);
          if (newRefresh) tokenStorage.setRefreshToken(newRefresh);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          tokenStorage.clearStorage();
          sessionManager.destroy();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        tokenStorage.clearStorage();
        sessionManager.destroy();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, BASE_URL, tokenStorage, sessionManager };
export default apiClient;