import React from "react";

const SearchButton = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Search"
    style={{
      position: "fixed",
      bottom: "56px",
      right: "28px",
      zIndex: 2001,
      width: 38,
      height: 38,
      borderRadius: "50%",
      background: "#fff",
      border: "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "box-shadow 0.2s, background 0.2s",
      outline: "none",
      padding: 0,
    }}
    onMouseOver={e => (e.currentTarget.style.background = '#f2f2f2')}
    onMouseOut={e => (e.currentTarget.style.background = '#fff')}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <circle cx="11" cy="11" r="7" stroke="#372520" strokeWidth="2" />
      <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#372520" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </button>
);

export default SearchButton; 