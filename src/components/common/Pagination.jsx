import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "2.5rem 0 1.5rem 0", gap: 8 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
        aria-label="Previous"
      >
        &#60;
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          style={{
            background: "none",
            border: "none",
            color: i + 1 === currentPage ? "#fff" : "#aaa",
            fontWeight: i + 1 === currentPage ? 700 : 500,
            fontSize: 16,
            margin: "0 4px",
            cursor: "pointer",
            borderBottom: i + 1 === currentPage ? "2px solid #fff" : "none"
          }}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
        aria-label="Next"
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination; 