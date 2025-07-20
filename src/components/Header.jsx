import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "SHOP", path: "/shop" },
  { label: "FRESH STOCKS", path: "/fresh" },
  { label: "CONTACT", path: "/contact" }
];

const Header = () => {
  const [show, setShow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const curr = window.scrollY;
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

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (e.target.closest && !e.target.closest(".mobile-nav, .hamburger")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`sticky-header header-slide ${show ? "header-show" : "header-hide"}`} style={{zIndex: 2000}}>
      <div className="header-content" style={{ justifyContent: "flex-start", gap: 0, marginLeft: "6px" }}>
        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 36,
            height: 36,
            marginRight: 8,
            cursor: "pointer",
            zIndex: 2100
          }}
        >
          <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 0, margin: "3px 0", transition: "all 0.2s", display: "block" }} />
          <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 0, margin: "3px 0", transition: "all 0.2s", display: "block" }} />
          <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 0, margin: "3px 0", transition: "all 0.2s", display: "block" }} />
        </button>
        <span className="blend-text" style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1.5}}>BLUE TOKAI COFFEE ROASTERIES</span>
      </div>
      {/* Desktop nav */}
      <div className="header-content desktop-nav" style={{ display: "flex" }}>
        {navLinks.map(link => (
          <button className="nav-btn" key={link.label} onClick={() => handleNav(link.path)}><span className="blend-text">{link.label}</span></button>
        ))}
      </div>
      {/* Mobile nav slide-out */}
      <nav
        id="mobile-nav"
        className="mobile-nav"
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? 0 : "-100vw",
          width: "70vw",
          maxWidth: 320,
          height: "100vh",
          background: "#000",
          color: "#fff",
          boxShadow: menuOpen ? "2px 0 16px rgba(0,0,0)" : "none",
          transition: "left 0.28s cubic-bezier(.4,0,.2,1)",
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
          paddingTop: 41,
          gap: 0
        }}
        aria-hidden={!menuOpen}
      >
        {navLinks.map(link => (
          <button
            className="nav-btn"
            key={link.label}
            style={{
              width: "100%",
              border: "none",
              textAlign: "left",
              padding: "18px 28px",
              fontSize: 18,
              background: "none",
              color: "#fff"
            }}
            onClick={() => handleNav(link.path)}
          >
            <span className="blend-text">{link.label}</span>
          </button>
        ))}
      </nav>
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-nav { display: none !important; }
          .hamburger { display: none !important; }
        }
        .mobile-nav::-webkit-scrollbar { width: 0; background: transparent; }
      `}</style>
    </header>
  );
};

export default Header; 