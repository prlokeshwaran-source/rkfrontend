export const STATUS_COLORS = {
  active: 'success',
  approved: 'success',
  completed: 'success',
  received: 'success',
  paid: 'success',
  pending: 'warning',
  inactive: 'gray',
  processing: 'info',
  cancelled: 'error',
  rejected: 'error',
  failed: 'error',
};

export const getStatusConfig = (status) => {
  const config = {
    active: {
      label: 'Active',
      className: 'status-active',
      color: 'var(--success)',
    },
    pending: {
      label: 'Pending',
      className: 'status-pending',
      color: 'var(--warning)',
    },
    inactive: {
      label: 'Inactive',
      className: 'status-inactive',
       color: 'var(--secondary-text)',
    },
    approved: {
      label: 'Approved',
      className: 'status-approved',
      color: 'var(--success)',
    },
    rejected: {
      label: 'Rejected',
      className: 'status-rejected',
      color: 'var(--error)',
    },
    completed: {
      label: 'Completed',
      className: 'status-completed',
      color: 'var(--success)',
    },
    processing: {
      label: 'Processing',
      className: 'status-processing',
      color: 'var(--info)',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'status-cancelled',
      color: 'var(--error)',
    },
  };

  return config[status?.toLowerCase()] || config.pending;
};

export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

