import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import { useAuth } from '../../context/AuthContext';
import { Icons } from '../common/Icons';

const Layout = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileClose = () => setMobileOpen(false);
  const handleMobileToggle = () => setMobileOpen(!mobileOpen);
  const handleOpenDrawer = () => setMobileOpen(true);

  return (
    <div className="layout-container">
      {isMobile && (
        <div
          className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
          onClick={handleMobileClose}
        />
      )}

      <div className={`sidebar-wrapper ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-sidebar-close" onClick={handleMobileClose}>
          <Icons.X size={20} />
        </button>
        <Sidebar onMobileClose={handleMobileClose} />
      </div>

      <div className="main-content">
        <Header user={user} onMobileToggle={isMobile ? handleMobileToggle : null} />
        <main className={`page-content ${isMobile ? 'with-bottom-nav' : ''}`}>
          <Outlet />
        </main>
      </div>

      {isMobile && <BottomNav onOpenDrawer={handleOpenDrawer} />}
    </div>
  );
};

export default Layout;

