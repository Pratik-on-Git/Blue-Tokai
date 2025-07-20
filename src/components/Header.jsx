import React, { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky-header" role="banner">
      <div className="header-content" style={{ justifyContent: "flex-start", alignItems: "center", minHeight: 48 }}>
        <button
          className="hamburger"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
          <span style={{ width: 24, height: 2, background: "#fff", margin: "3px 0", display: "block" }} />
          <span style={{ width: 24, height: 2, background: "#fff", margin: "3px 0", display: "block" }} />
          <span style={{ width: 24, height: 2, background: "#fff", margin: "3px 0", display: "block" }} />
        </button>
        <span className="blend-text brand" style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1.5 }}>BLUE TOKAI COFFEE ROASTERIES</span>
      </div>
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? 0 : "-100vw",
          width: "80vw",
          maxWidth: 320,
          minWidth: 180,
          height: "100vh",
          background: "#000",
          color: "#fff",
          boxShadow: menuOpen ? "2px 0 16px rgba(0,0,0,0.18)" : "none",
          transition: "left 0.28s cubic-bezier(.4,0,.2,1)",
          zIndex: 2050,
          display: "flex",
          flexDirection: "column",
          paddingTop: 48,
          gap: 0
        }}
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
              color: "#fff",
              borderBottom: "1px solid #232323"
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
        .mobile-nav.open { left: 0 !important; }
      `}</style>
    </header>
  );
};

export default Header; 