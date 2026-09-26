import { apiClient } from './apiClient';

const authApi = {
  login(emailOrPhone, password) {
    return apiClient.post('/auth/login', { emailOrPhone, password }).then((res) => res.data);
  },

  sendOtp(phoneOrEmail) {
    return apiClient.post('/auth/send-otp', { phoneOrEmail }).then((res) => res.data);
  },

  verifyOtp(phoneOrEmail, otp, extra = {}) {
    return apiClient
      .post('/auth/verify-otp', { phoneOrEmail, otp, ...extra })
      .then((res) => res.data);
  },

  register(userData) {
    return apiClient.post('/auth/register', userData).then((res) => res.data);
  },

  logout() {
    return apiClient.post('/auth/logout').then((res) => res.data);
  },

  refreshToken(refreshToken) {
    return apiClient.post('/auth/refresh-token', { refreshToken }).then((res) => res.data);
  },

  getProfile() {
    return apiClient.get('/users').then((res) => res.data);
  },

  updateProfile(userData) {
    return apiClient.put('/users', userData).then((res) => res.data);
  },

  forgotPassword(email) {
    return apiClient.post('/auth/forgot-password', { email }).then((res) => res.data);
  },

  resetPassword(token, password) {
    return apiClient.post('/auth/reset-password', { token, password }).then((res) => res.data);
  },
};

const dashboardApi = {
  getDashboard() {
    return apiClient.get('/dashboard').then((res) => res.data);
  },
  getAdminDashboard() {
    return apiClient.get('/dashboard/admin').then((res) => res.data);
  },
  getUserDashboard() {
    return apiClient.get('/dashboard/user').then((res) => res.data);
  },
  getManagerDashboard() {
    return apiClient.get('/dashboard/manager').then((res) => res.data);
  },
  getSuperAdminDashboard() {
    return apiClient.get('/dashboard/super-admin').then((res) => res.data);
  },
};

const customerApi = {
  getAll(params = {}) {
    return apiClient.get('/customers', { params }).then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/customers/${id}`).then((res) => res.data);
  },
  create(data) {
    return apiClient.post('/customers', data).then((res) => res.data);
  },
  update(id, data) {
    return apiClient.put(`/customers/${id}`, data).then((res) => res.data);
  },
  delete(id) {
    return apiClient.delete(`/customers/${id}`).then((res) => res.data);
  },
  changeStatus(id, status, remarks, changedById) {
    return apiClient
      .patch(`/customers/${id}/status`, { status, remarks, changedById })
      .then((res) => res.data);
  },
  assign(id, assignedToId) {
    return apiClient.patch(`/customers/${id}/assign`, { assignedToId }).then((res) => res.data);
  },
  getStatusHistory(id, params = {}) {
    return apiClient.get(`/customers/${id}/status-history`, { params }).then((res) => res.data);
  },
  getMemberships(customerId) {
    return apiClient.get(`/customers/${customerId}/memberships`).then((res) => res.data);
  },
};

const orderApi = {
  getAll(params = {}) {
    return apiClient.get('/orders', { params }).then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/orders/${id}`).then((res) => res.data);
  },
  getByNumber(orderNumber) {
    return apiClient.get(`/orders/number/${orderNumber}`).then((res) => res.data);
  },
  create(data) {
    return apiClient.post('/orders', data).then((res) => res.data);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/orders/${id}/status`, { status }).then((res) => res.data);
  },
  updatePaymentStatus(id, paymentStatus) {
    return apiClient.patch(`/orders/${id}/payment-status`, { paymentStatus }).then((res) => res.data);
  },
};

const paymentApi = {
  getAll(params = {}) {
    return apiClient.get('/payments', { params }).then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/payments/${id}`).then((res) => res.data);
  },
  create(data) {
    return apiClient.post('/payments', data).then((res) => res.data);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/payments/${id}/status`, { status }).then((res) => res.data);
  },
};

const walletApi = {
  getWallet() {
    return apiClient.get('/wallet').then((res) => res.data);
  },
  getBalance() {
    return apiClient.get('/wallet/balance').then((res) => res.data);
  },
  getTransactions(params = {}) {
    return apiClient.get('/wallet/transactions', { params }).then((res) => res.data);
  },
  getWalletByUserId(userId) {
    return apiClient.get(`/wallet/user/${userId}`).then((res) => res.data);
  },
};

const notificationApi = {
  getAll(params = {}) {
    return apiClient.get('/notifications', { params }).then((res) => res.data);
  },
  getPaginated(params = {}) {
    return apiClient.get('/notifications/paginated', { params }).then((res) => res.data);
  },
  getUnreadCount() {
    return apiClient.get('/notifications/unread-count').then((res) => res.data);
  },
  markAsRead(id) {
    return apiClient.patch(`/notifications/${id}/read`).then((res) => res.data);
  },
  markAllAsRead() {
    return apiClient.patch('/notifications/read-all').then((res) => res.data);
  },
  broadcast(data) {
    return apiClient.post('/notifications/broadcast', data).then((res) => res.data);
  },
};

const reportApi = {
  getDaily(params = {}) {
    return apiClient.get('/reports/daily', { params }).then((res) => res.data);
  },
  getMonthly(params = {}) {
    return apiClient.get('/reports/monthly', { params }).then((res) => res.data);
  },
  getSales(params = {}) {
    return apiClient.get('/reports/sales', { params }).then((res) => res.data);
  },
  getCommission(params = {}) {
    return apiClient.get('/reports/commission', { params }).then((res) => res.data);
  },
  getMembers(params = {}) {
    return apiClient.get('/reports/members', { params }).then((res) => res.data);
  },
  getPerformance(params = {}) {
    return apiClient.get('/reports/performance', { params }).then((res) => res.data);
  },
  export(params = {}) {
    return apiClient.get('/reports/export', { params, responseType: 'blob' });
  },
};

const trainingApi = {
  getAll() {
    return apiClient.get('/training/all').then((res) => res.data);
  },
  getActive() {
    return apiClient.get('/training').then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/training/${id}`).then((res) => res.data);
  },
  createAdmin(data) {
    return apiClient.post('/training/admin', data).then((res) => res.data);
  },
  updateAdmin(id, data) {
    return apiClient.put(`/training/admin/${id}`, data).then((res) => res.data);
  },
};

const settingsApi = {
  get() {
    return apiClient.get('/admin/settings').then((res) => res.data);
  },
  updateGeneral(data) {
    return apiClient.put('/admin/settings/general', data).then((res) => res.data);
  },
  updateCommission(data) {
    return apiClient.put('/admin/settings/commission', data).then((res) => res.data);
  },
  updateNotification(data) {
    return apiClient.put('/admin/settings/notification', data).then((res) => res.data);
  },
  updatePayment(data) {
    return apiClient.put('/admin/settings/payment', data).then((res) => res.data);
  },
};

const followupApi = {
  getAll(params = {}) {
    return apiClient.get('/followups', { params }).then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/followups/${id}`).then((res) => res.data);
  },
  create(data) {
    return apiClient.post('/followups', data).then((res) => res.data);
  },
  complete(id) {
    return apiClient.patch(`/followups/${id}/complete`).then((res) => res.data);
  },
  delete(id) {
    return apiClient.delete(`/followups/${id}`).then((res) => res.data);
  },
  getToday() {
    return apiClient.get('/followups/today').then((res) => res.data);
  },
  getUpcoming() {
    return apiClient.get('/followups/upcoming').then((res) => res.data);
  },
};

const commissionApi = {
  getAll(params = {}) {
    return apiClient.get('/commissions', { params }).then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/commissions/${id}`).then((res) => res.data);
  },
  approve(id) {
    return apiClient.patch(`/commissions/${id}/approve`).then((res) => res.data);
  },
  reject(id, data) {
    return apiClient.patch(`/commissions/${id}/reject`, data).then((res) => res.data);
  },
  calculate(paymentId) {
    return apiClient.post(`/commissions/calculate/${paymentId}`).then((res) => res.data);
  },
  getPending() {
    return apiClient.get('/commissions/pending').then((res) => res.data);
  },
  getMyCommissions() {
    return apiClient.get('/commissions/my-commissions').then((res) => res.data);
  },
};

const userApi = {
  getAll(params = {}) {
    return apiClient.get('/users', { params }).then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/users/${id}`).then((res) => res.data);
  },
  create(data) {
    return apiClient.post('/users', data).then((res) => res.data);
  },
  update(id, data) {
    return apiClient.put(`/users/${id}`, data).then((res) => res.data);
  },
  delete(id) {
    return apiClient.delete(`/users/${id}`).then((res) => res.data);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/users/${id}/status`, { status }).then((res) => res.data);
  },
};

const membershipApi = {
  getActive() {
    return apiClient.get('/membership-plans').then((res) => res.data);
  },
  getAll() {
    return apiClient.get('/membership-plans/all').then((res) => res.data);
  },
  getById(id) {
    return apiClient.get(`/membership-plans/${id}`).then((res) => res.data);
  },
  getByCustomer(customerId) {
    return apiClient.get(`/customers/${customerId}/memberships`).then((res) => res.data);
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