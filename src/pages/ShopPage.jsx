import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import Card from "../components/common/Card";
import Filters from "../components/common/Filters";
import Banner from "../components/common/Banner";
import Pagination from "../components/common/Pagination";
import beanconqueror from '../assets/img/beanconqueror-svgrepo-com.svg';
import coffeeroaster from '../assets/img/coffee-roaster-svgrepo-com.svg';
import coffee from '../assets/img/coffee-to-go-svgrepo-com.svg';
import Footer from "../components/common/footer";
import Loader from "../components/common/Loader";

const FILTERS = {
  "Category": ["Single Origin & Blends","Cold Brew Coffee Cans","Capsules","Easy Pour","Value Pack","Cold Brew Bag"],
  "Roast Level": ["Dark", "Light", "Medium", "Medium Dark"],
  "Drinking Preference": ["With Milk", "With or Without Milk", "Without Milk"],
  "Flavour Profile": ["Balanced", "Bold and Bitter", "Chocolatey and Nutty", "Delicate and Complex", "Producer Series"],
  "Equipment": ["Aeropress", "Channi", "Cold Brew", "Espresso", "French Press", "Inverted Aeropress", "Moka Pot", "Pourover", "South Indian Filter"]
};

function filterProducts(products, selected) {
  return products.filter(product => {
    for (const [group, options] of Object.entries(selected)) {
      if (options.length === 0) continue;
      if (group === "Category") {
        // Assume product.category is a string or array
        const productCats = Array.isArray(product.category) ? product.category : [product.category];
        if (!productCats.some(c => options.includes(c))) return false;
      }
      if (group === "Roast Level") {
        const productRoasts = Array.isArray(product.roast) ? product.roast : [product.roast];
        if (!productRoasts.some(r => options.includes(r))) return false;
      }
      if (group === "Drinking Preference") {
        const productPrefs = Array.isArray(product.preference) ? product.preference : [product.preference];
        if (!productPrefs.some(p => options.includes(p))) return false;
      }
      if (group === "Flavour Profile") {
        const productFlavours = Array.isArray(product.flavour) ? product.flavour : [product.flavour];
        if (!productFlavours.some(f => options.includes(f))) return false;
      }
      if (group === "Equipment") {
        const productEquip = Array.isArray(product.equipment) ? product.equipment : [product.equipment];
        if (!productEquip.some(eq => options.includes(eq))) return false;
      }
    }
    return true;
  });
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best", label: "Best selling" },
  { value: "az", label: "Alphabetically, A-Z" },
  { value: "za", label: "Alphabetically, Z-A" },
  { value: "priceLow", label: "Price, low to high" },
  { value: "priceHigh", label: "Price, high to low" },
];

function sortProducts(products, sort) {
  const arr = [...products];
  switch (sort) {
    case "az":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return arr.sort((a, b) => b.title.localeCompare(a.title));
    case "priceLow":
      return arr.sort((a, b) => a.price - b.price);
    case "priceHigh":
      return arr.sort((a, b) => b.price - a.price);
    case "best":
      return arr.sort((a, b) => b.rating - a.rating);
    case "featured":
    default:
      return arr;
  }
}

const featureList = [
  { icon: beanconqueror, label: "Diverse Roast Profiles" },
  { icon: coffee, label: "13 Grind Sizes" },
  { icon: coffeeroaster, label: "Roasted in Small Batches" }
];

const ShopPage = () => {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    "Category": [],
    "Roast Level": [],
    "Drinking Preference": [],
    "Flavour Profile": []
  });
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(window.innerWidth <= 900 ? 6 : 12);
  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth <= 900 ? 6 : 12);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const sidebarRef = useRef(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filtersModalVisible, setFiltersModalVisible] = useState(false); // for fade-out

  // Read category from query param and set filter on mount or when location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && FILTERS["Category"].includes(category)) {
      setSelectedFilters(f => ({ ...f, "Category": [category] }));
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page on filter/sort change
  }, [selectedFilters, sort]);

  // Filtering and sorting
  const filteredProducts = filterProducts(allProducts, selectedFilters);
  const sortedProducts = sortProducts(filteredProducts, sort);
  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const productsToShow = sortedProducts.slice((page - 1) * perPage, page * perPage);

  // Sidebar scroll handler (unchanged)
  const handleSidebarWheel = useCallback((e) => {
    const el = sidebarRef.current;
    if (!el) return;
    if (el.scrollHeight > el.clientHeight) {
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight === el.scrollHeight;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        return;
      }
      e.stopPropagation();
      el.scrollTop += e.deltaY;
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleSidebarWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleSidebarWheel);
  }, [handleSidebarWheel]);

  // Handle modal open/close with fade
  const openFiltersModal = () => {
    setShowFiltersModal(true);
    setTimeout(() => setFiltersModalVisible(true), 10); // allow mount before fade in
  };
  const closeFiltersModal = () => {
    setFiltersModalVisible(false);
    setTimeout(() => setShowFiltersModal(false), 350); // match transition duration
  };

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column"}}>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
        
          .shop-sidebar { display: none !important; }
          .shop-filters-btn { display: flex !important; padding: 9px 23px !important; font-weight: 500 !important;}
          .shop-main { padding: 1.2rem 0.5rem 1.2rem 0.5rem !important; }
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.2rem !important; }
        }
        @media (max-width: 600px) {
          .shop-main { padding: 4rem 0rem 2.5rem 0rem !important; }
          .shop-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
        .filters-modal-fade {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .filters-modal-fade.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <Banner
        video="http://cdn.pixabay.com/video/2022/08/05/126803-737028141_large.mp4"
        headline="Carefully sourced from India's finest farms"
        features={featureList}
      />
      {/* Sorting Filter Dropdown + Filters Button */}
      <div style={{ borderBottom: "1.5px solid rgb(35, 35, 35)", fontFamily: "DM Sans", width: "100%", background: "#000", padding: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <label htmlFor="sort-select" style={{ marginRight: 8, fontWeight: 500, fontSize: 15 }}>Sort by:</label>
        <select
          id="sort-select"
          value={sort}
          onChange={e => { setSort(e.target.value); }}
          style={{
            background: "#222",
            fontFamily: "DM Sans",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: 4,
            padding: "6px 10px",
            fontSize: 15,
            fontWeight: 500,
            outline: "none",
            cursor: "pointer"
          }}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* Filters button for mobile/tablet, now beside Sort By */}
        <button
          className="shop-filters-btn"
          style={{ display: "none", marginLeft: 12, background: "#222", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.13)", cursor: "pointer" }}
          onClick={openFiltersModal}
        >
          Filters
        </button>
      </div>
      {/* Filters Modal for mobile/tablet */}
      {showFiltersModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.55)", zIndex: 10000, display: "flex", alignItems: "flex-start", justifyContent: "center" }} onClick={closeFiltersModal}>
          <div
            className={`filters-modal-fade${filtersModalVisible ? ' visible' : ''}`}
            style={{ background: "#181818", borderRadius: 12, margin: "2.5em 0.5em", padding: "2em 1.2em", minWidth: 260, maxWidth: 340, width: "100vw", boxShadow: "0 4px 24px rgba(0,0,0,0.18)", position: "relative", maxHeight: "90vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <button style={{ position: "absolute", top: 12, right: 18, background: "none", border: "none", fontSize: 22, color: "#fff", cursor: "pointer" }} onClick={closeFiltersModal}>&times;</button>
            <Filters filters={FILTERS} selected={selectedFilters} onChange={setSelectedFilters} />
          </div>
        </div>
      )}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar: hidden on mobile, visible on desktop */}
        <aside ref={sidebarRef} className="shop-sidebar" style={{ width: 260, background: "#000", borderRight: "1.5px solid #232323", position: "sticky", top: 0, height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)", overflowY: "auto", zIndex: 2, overscrollBehavior: "contain", touchAction: "auto" }}>
          <div style={{ padding: "2rem 1.4rem" }}>
            <Filters filters={FILTERS} selected={selectedFilters} onChange={setSelectedFilters} />
          </div>
        </aside>
        {/* Main product grid with pagination */}
        <main className="shop-main" style={{ flex: 1, padding: "2.5rem 2.5rem 2.5rem 2rem", background: "#000", minHeight: 0, display: "flex", flexDirection: "column" }}>
          {loading ? (
            <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2.5rem", width: "100%" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ background: "#232326", borderRadius: "0.5vw", minHeight: 320, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', opacity: 0.5 }}>
                  <div style={{ width: '100%', height: 180, background: '#333', borderRadius: 8, marginBottom: 16 }} />
                  <div style={{ width: '70%', height: 24, background: '#444', borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ width: '50%', height: 18, background: '#444', borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ width: '40%', height: 18, background: '#444', borderRadius: 4 }} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2.5rem", width: "100%" }}>
                {productsToShow.map((product, i) => (
                  <Card
                    key={i}
                    id={allProducts.indexOf(product)} // Pass index as id
                    images={product.images}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    tags={product.tags}
                    topRated={product.topRated}
                    buttonText="BUY NOW"
                  />
                ))}
              </div>
              {/* Pagination controls */}
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;