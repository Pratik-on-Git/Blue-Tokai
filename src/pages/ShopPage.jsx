import React, { useState } from "react";
import Card from "../components/common/Card";
import Filters from "../components/common/Filters";
import Banner from "../components/common/Banner";
import Pagination from "../components/common/Pagination";
import beanconqueror from '../assets/img/beanconqueror-svgrepo-com.svg';
import coffeeroaster from '../assets/img/coffee-roaster-svgrepo-com.svg';
import coffee from '../assets/img/coffee-to-go-svgrepo-com.svg';
import PRODUCTS from '../components/common/products.json';
import Footer from "../components/common/footer";
import { useRef, useEffect } from "react";

// Example filter options
const FILTERS = {
  "Roast Level": ["Dark", "Light", "Medium", "Medium Dark"],
  "Drinking Preference": ["With Milk", "With or Without Milk", "Without Milk"],
  "Flavour Profile": ["Balanced", "Bold and Bitter", "Chocolatey and Nutty", "Delicate and Complex", "Producer Series"],
  "Equipment": ["Aeropress", "Channi", "Cold Brew", "Espresso", "French Press", "Inverted Aeropress", "Moka Pot", "Pourover", "South Indian Filter"],
  "Availability": ["In stock (22)", "Out of stock (2)"]
};

function filterProducts(products, selected) {
  return products.filter(product => {
    for (const [group, options] of Object.entries(selected)) {
      if (options.length === 0) continue;
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
  const [selectedFilters, setSelectedFilters] = useState({
    "Roast Level": [],
    "Drinking Preference": [],
    "Flavour Profile": []
  });
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(12);
  const perPage = 12;
  const filteredProducts = filterProducts(PRODUCTS, selectedFilters);
  const sortedProducts = sortProducts(filteredProducts, sort);
  const hasMore = visibleCount < sortedProducts.length;
  const productsToShow = sortedProducts.slice(0, visibleCount);

  const loaderRef = useRef(null);

  useEffect(() => {
    setVisibleCount(perPage); // Reset on filter/sort change
  }, [selectedFilters, sort]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + perPage, sortedProducts.length));
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, sortedProducts.length]);

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
        <aside
          data-lenis-prevent
          style={{ width: 260, background: "#000", borderRight: "1.5px solid #232323", position: "sticky", top: 0, height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)", overflowY: "auto", zIndex: 2, overscrollBehavior: "contain", touchAction: "auto" }}
        >
          <div style={{ padding: "1.6rem 1.6rem 2rem 1.6rem" }}>
            <Filters filters={FILTERS} selected={selectedFilters} onChange={setSelectedFilters} />
          </div>
        </aside>
        {/* Main product grid with infinite scroll */}
        <main style={{ flex: 1, padding: "2.5rem 2.5rem 2.5rem 2rem", background: "#000", minHeight: 0, display: "flex", flexDirection: "column" }}>
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
          {/* Infinite scroll loader */}
          <div ref={loaderRef} style={{ height: 32, margin: "2rem 0", display: hasMore ? "block" : "none" }} />
          {/* Load More button as fallback */}
          {hasMore && (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + perPage, sortedProducts.length))}
              style={{
                margin: "2rem auto 0 auto",
                display: "block",
                background: "#232323",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "12px 32px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Load More
            </button>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage; 