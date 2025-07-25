import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import LoginModal from "./common/LoginModal";
import SearchContainer from "./common/SearchContainer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "SHOP", path: "/shop" },
  { label: "EQUIPMENTS", path: "/equipments" },
  { label: "CONTACT", path: "/contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const curr = window.scrollY;
          // Only hide if scrolling down and past 40px
          if (curr > lastScrollY.current && curr > 40) {
            setShow(false);
          } else {
            setShow(true);
          }
          lastScrollY.current = curr;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle menu mount/unmount for animation
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuVisible(true);
    } else {
      // Wait for animation before unmount
      const timeout = setTimeout(() => setMobileMenuVisible(false), 350);
      return () => clearTimeout(timeout);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`sticky-header header-slide ${show ? "header-show" : "header-hide"}`}>
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Mobile menu bar button (hamburger) */}
          <button
            className="mobile-menu-btn"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            style={{ marginRight: 12, display: 'none' }}
          >
            <span style={{ display: 'inline-block', width: 24, height: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </span>
          </button>
          <span className="blend-text" style={{ marginLeft: 8, marginRight: 16 }}>BLUE TOKAI COFFEE ROASTERIES</span>
          
        </div>
        <div className="header-content desktop-nav">
          {navItems.map(item => (
            <button className="nav-btn" key={item.label} onClick={() => navigate(item.path)}><span className="blend-text">{item.label}</span></button>
          ))}
          <button className="nav-btn" onClick={() => {
            if (isAuthenticated) {
              setShowDashboard(true);
            } else {
              setShowLogin(true);
            }
          }}>
            <span className="blend-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'0.4em'}}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
              </svg>
              {isAuthenticated ? 'DASHBOARD' : 'LOGIN'}
            </span>
          </button>
        </div>
        {/* Mobile menu drawer with animation */}
        {mobileMenuVisible && (
          <div className={`mobile-menu-overlay${mobileMenuOpen ? ' open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            <div className={`mobile-menu-drawer${mobileMenuOpen ? ' open' : ''}`} onClick={e => e.stopPropagation()}>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">&times;</button>
              
                <nav className="mobile-menu-nav">
                {navItems.map(item => (
                  <button className="nav-btn mobile-nav-btn" key={item.label} onClick={() => { setMobileMenuOpen(false); navigate(item.path); }}>
                    <span className="blend-text">{item.label}</span>
                  </button>
                ))}
                <button className="nav-btn mobile-nav-btn" onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAuthenticated) {
                    setShowDashboard(true);
                  } else {
                    setShowLogin(true);
                  }
                }}>
                  <span className="blend-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'0.4em'}}>
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
                    </svg>
                    {isAuthenticated ? 'DASHBOARD' : 'LOGIN'}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>
      {/* Dashboard Modal */}
      {showDashboard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.32)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowDashboard(false)}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            padding: '2.5em 3em',
            minWidth: 320,
            minHeight: 180,
            position: 'relative',
            textAlign: 'center',
          }} onClick={e => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }} onClick={() => setShowDashboard(false)}>&times;</button>
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Welcome, {user?.name || 'User'}!</div>
            <div style={{ fontSize: 18, color: '#555', marginBottom: 24 }}>{user?.email}</div>
            <button style={{ padding: '12px 32px', background: '#ff7a00', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer' }} onClick={() => { dispatch(logout()); setShowDashboard(false); }}>Logout</button>
          </div>
        </div>
      )}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      {/* Breadcrumb CSS and Mobile Menu CSS */}
      <style>{`
        /* Hide desktop nav on mobile */

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .header-content { gap: 0px !important; }
          .mobile-menu-btn { display: inline-flex !important; background: none; border: none; cursor: pointer; align-items: center; }
        }
        /* Mobile menu overlay and drawer */
        .mobile-menu-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.32);
          z-index: 9999;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-menu-drawer {
          background: #181818;
          color: #fff;
          min-width: 220px;
          max-width: 80vw;
          min-height: 100vh;
          box-shadow: 2px 0 16px rgba(0,0,0,0.18);
          padding: 2.2em 1.2em 1.2em 1.2em;
          display: flex;
          flex-direction: column;
          position: relative;
          transform: translateX(-100%);
          opacity: 0.7;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu-drawer.open {
          transform: translateX(0);
          opacity: 1;
        }
        .mobile-menu-close {
          position: absolute;
          top: 0.7em;
          right: 1em;
          background: none;
          border: none;
          color: #fff;
          font-size: 2.2em;
          cursor: pointer;
        }
        .mobile-menu-nav {
          display: flex;
          flex-direction: column;
          gap: 1.2em;
          margin-top: 2.5em;
        }
        .mobile-nav-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.1em;
          text-align: left;
          padding: 0.7em 0;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Header; 