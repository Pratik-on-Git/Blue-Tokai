import React, { useState } from "react";
import Filters from "./common/Filters";

const FiltersMobile = ({ filters, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="filters-toggle" onClick={() => setOpen(true)} style={{
        display: "block",
        width: "100%",
        padding: "0.8rem 0",
        background: "#232323",
        color: "#fff",
        border: "none",
        fontSize: "1.1rem",
        fontWeight: 600,
        borderRadius: 6,
        margin: "1rem 0 0.5rem 0"
      }}>
        Filters
      </button>
      {open && (
        <div className="filters-modal" style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1rem 1rem 1rem"
        }}>
          <button className="close" onClick={() => setOpen(false)} style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 32,
            background: "none",
            border: "none",
            color: "#fff",
            zIndex: 3010
          }}>×</button>
          <Filters filters={filters} selected={selected} onChange={onChange} />
        </div>
      )}
    </>
  );
};

export default FiltersMobile; 