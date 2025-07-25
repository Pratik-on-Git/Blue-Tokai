import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Static filter group names. Update if you add more filter groups in Filters.jsx
const FILTER_GROUPS = [
  "Category",
  "Roast",
  "Preference",
  "Flavour",
  "Equipment",
  "Sweetness",
  "Acidity",
  "Body",
  "Bitterness",
  "Processing",
  "Variety"
];

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [filterSuggestions, setFilterSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setProductSuggestions([]);
      setFilterSuggestions([]);
      setShowDropdown(false);
      return;
    }
    // Product Suggestions
    const prodMatches = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductSuggestions(prodMatches);

    // Filter Suggestions
    const filterMatches = FILTER_GROUPS.filter(name =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterSuggestions(filterMatches);

    setShowDropdown(prodMatches.length > 0 || filterMatches.length > 0);
  }, [searchTerm, products]);

  // Hide dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = id => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/product/${id}`);
  };

  const handleSelectFilter = filter => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/shop?filter=${encodeURIComponent(filter)}`);
  };

  return (
    <div className="search-container" style={{ position: "relative", width: 400, margin: "0 auto" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by keyword"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="search-input"
        style={{ width: "100%", padding: "0.8em 2.5em 0.8em 1em", borderRadius: 8, border: "0px solid #ddd" }}
      />
      {showDropdown && (productSuggestions.length > 0 || filterSuggestions.length > 0) && (
        <div
          className="search-dropdown"
          ref={dropdownRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "112%",
            top: "auto",
            width: "100%",
            zIndex: 2002,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            padding: "0.5em 0"
          }}
        >
          {productSuggestions.map(prod => (
            <div
              key={prod.id}
              className="dropdown-item"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.7em 1.2em",
                cursor: "pointer"
              }}
              onClick={() => handleSelectProduct(prod.id)}
            >
              <img
                src={prod.images[0]}
                alt={prod.title}
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", marginRight: 12 }}
              />
              <span style={{ fontWeight: 600 }}>{prod.title}</span>
            </div>
          ))}
          {productSuggestions.length > 0 && filterSuggestions.length > 0 && (
            <div style={{ borderTop: "1px solid #eee", margin: "0.5em 0" }} />
          )}
          {filterSuggestions.map(filter => (
            <div
              key={filter}
              className="dropdown-item"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.7em 1.2em",
                cursor: "pointer"
              }}
              onClick={() => handleSelectFilter(filter)}
            >
              <span className="filter-icon" style={{ marginRight: 10, fontSize: 18 }}>🔎</span>
              <span>{filter}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
