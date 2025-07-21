import React, { useState, useRef, useEffect, useCallback } from "react";
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
  "Category": [
    "Single Origin & Blends",
    "Cold Brew Coffee Cans",
    "Capsules",
    "Easy Pour",
    "Value Pack"
  ],
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
  const perPage = 12;
  const sidebarRef = useRef(null);

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

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Banner
        video="http://cdn.pixabay.com/video/2022/08/05/126803-737028141_large.mp4"
        headline="Carefully sourced from India's finest farms"
        features={featureList}
      />
      {/* Sorting Filter Dropdown */}
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
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sticky, independently scrollable sidebar */}
        <aside ref={sidebarRef} style={{ width: 260, background: "#000", borderRight: "1.5px solid #232323", position: "sticky", top: 0, height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)", overflowY: "auto", zIndex: 2, overscrollBehavior: "contain", touchAction: "auto" }}>
          <div style={{ padding: "2rem 1.4rem" }}>
            <Filters filters={FILTERS} selected={selectedFilters} onChange={setSelectedFilters} />
          </div>
        </aside>
        {/* Main product grid with pagination */}
        <main style={{ flex: 1, padding: "2.5rem 2.5rem 2.5rem 2rem", background: "#000", minHeight: 0, display: "flex", flexDirection: "column" }}>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2.5rem", width: "100%" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2.5rem", width: "100%" }}>
                {productsToShow.map((product, i) => (
                  <Card
                    key={i}
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