import axios from 'axios';

// CRA proxies /api to the Spring Boot server during local development.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use((response) => response, (error) => {
  const body = error.response?.data;
  const message = body?.message || body?.error || error.message || 'Request failed';
  return Promise.reject(new Error(message));
});

const q = (params) => ({ params });
export const adminApi = {
  login: (body) => api.post('/admin/auth/login', body).then(r => r.data),
  dashboard: () => api.get('/admin/dashboard').then(r => r.data),
  reportSummary: () => api.get('/admin/reports/summary').then(r => r.data),
  profile: () => api.get('/admin/profile').then(r => r.data),
  updateProfile: (body) => api.patch('/admin/profile', body).then(r => r.data),
  receivedNotifications: () => api.get('/admin/notifications/received').then(r => r.data),
  list: (module, status) => api.get(`/admin/${encodeURIComponent(module)}`, q(status && status !== 'all' ? { status } : {})).then(r => r.data),
  get: (module, id) => api.get(`/admin/${encodeURIComponent(module)}/${encodeURIComponent(id)}`).then(r => r.data),
  create: (module, body) => api.post(`/admin/${encodeURIComponent(module)}`, body).then(r => r.data),
  update: (module, id, body) => api.put(`/admin/${encodeURIComponent(module)}/${encodeURIComponent(id)}`, body).then(r => r.data),
  remove: (module, id) => api.delete(`/admin/${encodeURIComponent(module)}/${encodeURIComponent(id)}`),
  approval: (id, body) => api.patch(`/admin/approvals/${encodeURIComponent(id)}`, body).then(r => r.data),
  uploadTrainingDocument: (body) => api.post('/admin/training/documents', body, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
};

export const userApi = {
  login: (body) => api.post('/users/login', body).then(r => r.data),
};

export const memberApi = {
  dashboard: (phone) => api.get('/partner/dashboard', q({ phone })).then(r => r.data),
  customers: (phone, status) => api.get('/partner/customers', q({ phone, ...(status && status !== 'all' ? { status } : {}) })).then(r => r.data),
  addCustomer: (phone, body) => api.post('/partner/customers', body, q({ phone })).then(r => r.data),
  updateCustomer: (phone, id, body) => api.patch(`/partner/customers/${encodeURIComponent(id)}`, body, q({ phone })).then(r => r.data),
  wallet: (phone) => api.get('/partner/wallet', q({ phone })).then(r => r.data),
  training: () => api.get('/partner/training').then(r => r.data),
  notifications: (phone) => api.get('/partner/notifications', q({ phone })).then(r => r.data),
  profile: (phone) => api.get('/partner/profile', q({ phone })).then(r => r.data),
  updateProfile: (phone, body) => api.patch('/partner/profile', body, q({ phone })).then(r => r.data),
  changePassword: (phone, body) => api.patch('/partner/profile/password', body, q({ phone })),
};

export default api;
