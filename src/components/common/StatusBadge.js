import React from 'react';
import { getStatusConfig } from '../../utils/formatDate';
import { getStatusIcon } from './Icons';

const StatusBadge = ({ status, showDot = true }) => {
  const config = getStatusConfig(status);
  const IconComponent = getStatusIcon(status);

  return (
    <span className={`status-badge ${config.className}`}>
      {showDot && <span className="status-dot"></span>}
      {IconComponent && <IconComponent size={12} style={{ marginRight: '0.25rem' }} />}
      {config.label}
    </span>
  );
};

export default StatusBadge;

