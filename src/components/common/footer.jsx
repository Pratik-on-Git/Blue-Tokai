import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

const CATEGORY_FILTERS = [
  "Single Origin & Blends",
  "Cold Brew Coffee Cans",
  "Capsules",
  "Easy Pour",
  "Value Pack",
  "Cold Brew Bag"
];

const footerLinks = {
  aboutUs: [
    "Our Roasteries",
    "Our Beliefs",
    "Our Farms",
    "Play Bar Project",
    "Press",
    "Careers",
    "Packaging",
    "Contact Us",
  ],
  visitUs: [
    "OUR FARMS",
    "LEARN",
    "BLOG",
  ],
};

const Footer = () => (
  <footer
    style={{
      borderTop: "1px solid #232323",
      width: "100%",
      background: "#000",
      color: "#f7f7f7",
      fontFamily: "DM Sans, sans-serif",
      fontSize: 16,
      zIndex: 2,
      padding: "2.5rem 0",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 auto",
        padding: "0 2rem",
      }}
    >
      {/* Left: Logo & Info */}
      <div style={{ minWidth: 260, flex: 1 }}>
        {/* Logo Image */}
        <div style={{ marginBottom: 24 }}>
          <img src={logo} alt="Blue Tokai Logo" style={{ width: 110, height: 'auto', marginBottom: 8, marginLeft: 0 }} />
          
        </div>
        <div style={{ fontWeight: 700, marginBottom: 8, color: "#FFB22C", fontSize: 18 }}>
          BLUE TOKAI COFFEE ROASTERS
        </div>
        <div style={{ fontSize: 14, marginBottom: 24 }}>
          COPYRIGHT © {new Date().getFullYear()}
        </div>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>FOLLOW US</div>
        <div style={{ display: "flex", gap: 16 }}>
          {/* X icon */}
          <a href="https://x.com/bluetokaicoffee" aria-label="X" style={{ color: "#fff" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
          </svg>
          </a>
          {/* Facebook icon */}
          <a href="https://www.facebook.com/bluetokaicoffee/" aria-label="Facebook" style={{ color: "#1877f2" }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" stroke="#1877f2" strokeWidth="2" strokeLinejoin="round"/></svg>
          </a>
          {/* Instagram icon */}
          <a href="https://www.instagram.com/bluetokaicoffee" aria-label="Instagram" style={{ color: "#e1306c" }} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#e1306c" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#e1306c" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#e1306c"/></svg>
          </a>
        </div>
      </div>

      {/* Center: Newsletter & Offers */}
      <div style={{ minWidth: 420, flex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Newsletter Signup */}
        <div style={{ width: 350, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Sign up for our newsletter!"
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 18,
              border: "none",
              borderRadius: 2,
              background: "#f7f7f7",
              color: "#888",
              marginBottom: 12,
              fontFamily: "DM Sans, sans-serif",
            }}
          />
          <button
            style={{
              width: "100%",
              padding: "12px 0",
              background: "#FFB22C",
              color: "#000",
              fontSize: 18,
              fontWeight: 700,
              border: "none",
              borderRadius: 2,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            SUBSCRIBE NOW
          </button>
        </div>
        {/* Special Offers Text */}
        <div style={{ textAlign: "left", maxWidth: 420 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4, color: "#FFB22C" }}>
            SPECIAL OFFERS, BREWING TIPS & RECIPES!
          </div>
          <div style={{ fontWeight: 500, fontSize: 14, lineHeight: 1.3 }}>
            GET AN INSIDER ACCESS TO NEW LAUNCHES, EVENTS & MORE - STRAIGHT TO YOUR INBOX!<br />
            (WE PROMISE NOT TO SPAM!)
          </div>
        </div>
      </div>

      {/* Right: Links */}
      <div style={{ display: "flex", flex: 2, minWidth: 400, justifyContent: "space-between", gap: 40 }}>
        {/* Shop Online */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12, color: "#FFB22C" }}>SHOP ONLINE</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {CATEGORY_FILTERS.map((cat) => (
              <li key={cat} style={{ marginBottom: 8 }}>
                <Link to={`/shop?category=${encodeURIComponent(cat)}`} style={{ color: "#f7f7f7", textDecoration: "none" }}>{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* About Us */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12, color: "#FFB22C" }}>ABOUT US</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {footerLinks.aboutUs.map((item) => (
              <li key={item} style={{ marginBottom: 8 }}><a href="#" style={{ color: "#f7f7f7", textDecoration: "none" }}>{item}</a></li>
            ))}
          </ul>
        </div>
        {/* Visit Us */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>VISIT US</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {footerLinks.visitUs.map((item) => (
              <li key={item} style={{ marginBottom: 8 }}><a href="#" style={{ color: "#111", textDecoration: "none", fontWeight: item === "OUR FARMS" || item === "LEARN" || item === "BLOG" ? 700 : 400 }}>{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div> 
  </footer>
);

export default Footer;
