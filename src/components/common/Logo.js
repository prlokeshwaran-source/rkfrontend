import React from 'react';
import { Icons } from './Icons';

const Logo = ({ size = 'md', showTagline = true }) => {
  const sizeClasses = {
    sm: 'logo-sm',
    md: 'logo-md',
    lg: 'logo-lg',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  return (
    <div className="logo-container">
      <div className={`logo ${sizeClasses[size] || sizeClasses.md}`}>
        <Icons.LayoutDashboard size={iconSizes[size] || iconSizes.md} />
      </div>
      {showTagline && <p className="logo-tagline">Admin Panel</p>}
    </div>
  );
};

export default Logo;

