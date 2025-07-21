import React, { useState, useRef, useEffect } from "react";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const wrapperRef = useRef();

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (e.type === "keydown" && e.key === "Escape") setOpen(false);
      if (e.type === "mousedown" && wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handle);
    };
  }, [open]);

  // Focus input when opening
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div ref={wrapperRef} style={{ position: "fixed", bottom: 56, right: 28, zIndex: 2001 }}>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: 46,
            right: 0,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
            padding: "6px 12px",
            minWidth: 160,
            opacity: 1,
            transform: "translateY(-8px)",
            transition: "opacity 0.18s, transform 0.18s",
            border: "1px solid #ececec",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              fontSize: 14,
              background: "transparent",
              width: 110,
              color: "#372520",
              padding: "2px 0",
            }}
          />
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Search"
        style={{
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <circle cx="11" cy="11" r="7" stroke="#372520" strokeWidth="2" />
          <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#372520" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default SearchButton; 