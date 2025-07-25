import React, { useState, useRef, useEffect } from "react";
import SearchContainer from "./common/SearchContainer";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();
  const overlayRef = useRef();
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);

  // Fade logic
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setFade(true), 10);
    } else if (visible) {
      setFade(false);
      const timeout = setTimeout(() => setVisible(false), 220);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (e.type === "keydown" && e.key === "Escape") setOpen(false);
      if (
        e.type === "mousedown" &&
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handle);
    };
  }, [open]);

  return (
    <>
      <div ref={wrapperRef} style={{ position: "fixed", bottom: 56, right: 28, zIndex: 3002 }}>
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
      {visible && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            zIndex: 3001,
            left: 0,
            top: 0,
            width: "101vw",
            height: "96vh",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            background: "none",
            opacity: fade ? 1 : 0,
            pointerEvents: fade ? 'auto' : 'none',
            transition: 'opacity 0.22s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {(() => {
            const isMobile = window.innerWidth <= 600;
            return (
              <div
                style={{
                  position: "absolute",
                  right: isMobile ? 0 : 36,
                  left: isMobile ? 0 : "auto",
                  bottom: isMobile ? 110 : 102, // 56+button+gap
                  width: isMobile ? "100vw" : 400,
                  maxWidth: isMobile ? "100vw" : "96vw",
                  zIndex: 3002,
                  background: "none",
                  padding: isMobile ? "0 2vw" : 0,
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-end"
                }}
              >
                <SearchContainer autoFocus={open} />
              </div>
            );
          })()}

        </div>
      )}
    </>
  );
};

export default SearchButton; 