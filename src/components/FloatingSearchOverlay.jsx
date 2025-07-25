import React, { useRef, useEffect } from "react";
import SearchContainer from "./common/SearchContainer";

const FloatingSearchOverlay = ({ open, onClose, anchorRef }) => {
  const overlayRef = useRef();
  const [visible, setVisible] = React.useState(open);
  const [fade, setFade] = React.useState(false);

  // Handle fade-in/out
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setFade(true), 10); // trigger fade-in
    } else if (visible) {
      setFade(false);
      // Wait for fade-out before unmount
      const timeout = setTimeout(() => setVisible(false), 220);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (e.type === "keydown" && e.key === "Escape") onClose();
      if (
        e.type === "mousedown" &&
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handle);
    };
  }, [open, onClose, anchorRef]);

  if (!visible) return null;

  // Position overlay above the anchor button
  const overlayStyle = {
    position: "fixed",
    zIndex: 3,
    // We'll position it absolutely using anchorRef in parent
    left: 0,
    top: 0,
    width: "101vw",
    height: "96vh",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    background: "none"
  };
  const innerStyle = {
    position: "absolute",
    right: 36,
    bottom: 102, // 38+56+8px (button height + music bar + gap)
    width: 400,
    maxWidth: "96vw",
    zIndex: 3002,
    background: "none"
  };

  return (
    <div
      style={{
        ...overlayStyle,
        opacity: fade ? 1 : 0,
        pointerEvents: fade ? 'auto' : 'none',
        transition: 'opacity 0.22s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      <div ref={overlayRef} style={innerStyle}>
        <SearchContainer autoFocus={open} />
      </div>
    </div>
  );
};

export default FloatingSearchOverlay;
