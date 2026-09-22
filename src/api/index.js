import apiClient from './index';

const authApi = {
  login(emailOrPhone, password) {
    return apiClient.post('/auth/login', { emailOrPhone, password });
  },

  sendOtp(phoneOrEmail) {
    return apiClient.post('/auth/send-otp', { phoneOrEmail });
  },

  verifyOtp(phoneOrEmail, otp, extra = {}) {
    return apiClient.post('/auth/verify-otp', { phoneOrEmail, otp, ...extra });
  },

  register(userData) {
    return apiClient.post('/auth/register', userData);
  },

  logout() {
    return apiClient.post('/auth/logout');
  },

  refreshToken(refreshToken) {
    return apiClient.post('/auth/refresh-token', { refreshToken });
  },

  getProfile() {
    return apiClient.get('/users');
  },

  updateProfile(userData) {
    return apiClient.put('/users', userData);
  },
};

const dashboardApi = {
  getDashboard() {
    return apiClient.get('/dashboard');
  },
  getAdminDashboard() {
    return apiClient.get('/dashboard/admin');
  },
  getUserDashboard() {
    return apiClient.get('/dashboard/user');
  },
  getManagerDashboard() {
    return apiClient.get('/dashboard/manager');
  },
  getSuperAdminDashboard() {
    return apiClient.get('/dashboard/super-admin');
  },
};

const customerApi = {
  getAll(params = {}) {
    return apiClient.get('/customers', { params });
  },
  getById(id) {
    return apiClient.get(`/customers/${id}`);
  },
  create(data) {
    return apiClient.post('/customers', data);
  },
  update(id, data) {
    return apiClient.put(`/customers/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/customers/${id}`);
  },
  changeStatus(id, status, remarks, changedById) {
    return apiClient.patch(`/customers/${id}/status`, { status, remarks, changedById });
  },
  assign(id, assignedToId) {
    return apiClient.patch(`/customers/${id}/assign`, { assignedToId });
  },
  getStatusHistory(id, params = {}) {
    return apiClient.get(`/customers/${id}/status-history`, { params });
  },
  getMemberships(customerId) {
    return apiClient.get(`/customers/${customerId}/memberships`);
  },
};

const orderApi = {
  getAll(params = {}) {
    return apiClient.get('/orders', { params });
  },
  getById(id) {
    return apiClient.get(`/orders/${id}`);
  },
  getByNumber(orderNumber) {
    return apiClient.get(`/orders/number/${orderNumber}`);
  },
  create(data) {
    return apiClient.post('/orders', data);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/orders/${id}/status`, { status });
  },
  updatePaymentStatus(id, paymentStatus) {
    return apiClient.patch(`/orders/${id}/payment-status`, { paymentStatus });
  },
};

const paymentApi = {
  getAll(params = {}) {
    return apiClient.get('/payments', { params });
  },
  getById(id) {
    return apiClient.get(`/payments/${id}`);
  },
  create(data) {
    return apiClient.post('/payments', data);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/payments/${id}/status`, { status });
  },
};

const walletApi = {
  getWallet() {
    return apiClient.get('/wallet');
  },
  getBalance() {
    return apiClient.get('/wallet/balance');
  },
  getTransactions(params = {}) {
    return apiClient.get('/wallet/transactions', { params });
  },
  getWalletByUserId(userId) {
    return apiClient.get(`/wallet/user/${userId}`);
  },
};

const notificationApi = {
  getAll(params = {}) {
    return apiClient.get('/notifications', { params });
  },
  getPaginated(params = {}) {
    return apiClient.get('/notifications/paginated', { params });
  },
  getUnreadCount() {
    return apiClient.get('/notifications/unread-count');
  },
  markAsRead(id) {
    return apiClient.patch(`/notifications/${id}/read`);
  },
  markAllAsRead() {
    return apiClient.patch('/notifications/read-all');
  },
  broadcast(data) {
    return apiClient.post('/notifications/broadcast', data);
  },
};

const reportApi = {
  getDaily(params = {}) {
    return apiClient.get('/reports/daily', { params });
  },
  getMonthly(params = {}) {
    return apiClient.get('/reports/monthly', { params });
  },
  getSales(params = {}) {
    return apiClient.get('/reports/sales', { params });
  },
  getCommission(params = {}) {
    return apiClient.get('/reports/commission', { params });
  },
  getMembers(params = {}) {
    return apiClient.get('/reports/members', { params });
  },
  getPerformance(params = {}) {
    return apiClient.get('/reports/performance', { params });
  },
  export(params = {}) {
    return apiClient.get('/reports/export', { params, responseType: 'blob' });
  },
};

const trainingApi = {
  getAll() {
    return apiClient.get('/training/all');
  },
  getActive() {
    return apiClient.get('/training');
  },
  getById(id) {
    return apiClient.get(`/training/${id}`);
  },
  createAdmin(data) {
    return apiClient.post('/training/admin', data);
  },
  updateAdmin(id, data) {
    return apiClient.put(`/training/admin/${id}`, data);
  },
};

const settingsApi = {
  get() {
    return apiClient.get('/admin/settings');
  },
  updateGeneral(data) {
    return apiClient.put('/admin/settings/general', data);
  },
  updateCommission(data) {
    return apiClient.put('/admin/settings/commission', data);
  },
  updateNotification(data) {
    return apiClient.put('/admin/settings/notification', data);
  },
  updatePayment(data) {
    return apiClient.put('/admin/settings/payment', data);
  },
};

const followupApi = {
  getAll(params = {}) {
    return apiClient.get('/followups', { params });
  },
  getById(id) {
    return apiClient.get(`/followups/${id}`);
  },
  create(data) {
    return apiClient.post('/followups', data);
  },
  complete(id) {
    return apiClient.patch(`/followups/${id}/complete`);
  },
  delete(id) {
    return apiClient.delete(`/followups/${id}`);
  },
  getToday() {
    return apiClient.get('/followups/today');
  },
  getUpcoming() {
    return apiClient.get('/followups/upcoming');
  },
};

const commissionApi = {
  getAll(params = {}) {
    return apiClient.get('/commissions', { params });
  },
  getById(id) {
    return apiClient.get(`/commissions/${id}`);
  },
  approve(id) {
    return apiClient.patch(`/commissions/${id}/approve`);
  },
  reject(id, data) {
    return apiClient.patch(`/commissions/${id}/reject`, data);
  },
  calculate(paymentId) {
    return apiClient.post(`/commissions/calculate/${paymentId}`);
  },
  getPending() {
    return apiClient.get('/commissions/pending');
  },
  getMyCommissions() {
    return apiClient.get('/commissions/my-commissions');
  },
};

const userApi = {
  getAll(params = {}) {
    return apiClient.get('/users', { params });
  },
  getById(id) {
    return apiClient.get(`/users/${id}`);
  },
  create(data) {
    return apiClient.post('/users', data);
  },
  update(id, data) {
    return apiClient.put(`/users/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/users/${id}`);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/users/${id}/status`, { status });
  },
};

const membershipApi = {
  getActive() {
    return apiClient.get('/membership-plans');
  },
  getAll() {
    return apiClient.get('/membership-plans/all');
  },
  getById(id) {
    return apiClient.get(`/membership-plans/${id}`);
  },
  getByCustomer(customerId) {
    return apiClient.get(`/customers/${customerId}/memberships`);
  },
};

export {
  authApi,
  dashboardApi,
  customerApi,
  orderApi,
  paymentApi,
  walletApi,
  notificationApi,
  reportApi,
  trainingApi,
  settingsApi,
  followupApi,
  commissionApi,
  userApi,
  membershipApi,
};

export default apiClient;
