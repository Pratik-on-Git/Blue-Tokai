import React, { useState } from "react";
import Card from "../components/common/Card";
import Filters from "../components/common/Filters";
import Banner from "../components/common/Banner";
import Pagination from "../components/common/Pagination";
import img1 from '../assets/img/img-1.jpg';
import logo from '../assets/img/logo.png';
import beanconqueror from '../assets/img/beanconqueror-svgrepo-com.svg';
import coffeeroaster from '../assets/img/coffee-roaster-svgrepo-com.svg';
import coffee from '../assets/img/coffee-to-go-svgrepo-com.svg';

// Example filter options
const FILTERS = {
  "Roast Level": ["Dark", "Light", "Medium", "Medium Dark"],
  "Drinking Preference": ["With Milk", "With or Without Milk", "Without Milk"],
  "Flavour Profile": ["Balanced", "Bold and Bitter", "Chocolatey and Nutty", "Delicate and Complex", "Producer Series"],
  "Equipment": ["Aeropress", "Channi", "Cold Brew", "Espresso", "French Press", "Inverted Aeropress", "Moka Pot", "Pourover", "South Indian Filter"],
  "Availability": ["In stock (22)", "Out of stock (2)"]
};

// Example product data
const PRODUCTS = [
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/1SamplerPack__Front.jpg?v=1707393228&width=1080",
    title: "Curated Sample Selection",
    description: "Attikan Estate, Silver Oak, Vienna Roast",
    price: 700,
    roast: "Medium",
    preference: "Without Milk",
    flavour: "Balanced",
    rating: 4.9,
    tags: ["Sampler", "Custom"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/Sampler_201224.jpg?v=1750764829&width=1800",
    title: "Sampler Pack",
    description: "Vienna Roast, French Roast, Silver Oak",
    price: 700,
    roast: "Dark",
    preference: "With Milk",
    flavour: "Bold and Bitter",
    rating: 4.7,
    tags: ["Sampler"],
    topRated: false
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/1SamplerPack__Front.jpg?v=1707393228&width=1080",
    title: "Curated Sample Selection",
    description: "Attikan Estate, Silver Oak, Vienna Roast",
    price: 700,
    roast: "Medium",
    preference: "Without Milk",
    flavour: "Balanced",
    rating: 4.9,
    tags: ["Sampler", "Custom"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/Sampler_201224.jpg?v=1750764829&width=1800",
    title: "Sampler Pack",
    description: "Vienna Roast, French Roast, Silver Oak",
    price: 700,
    roast: "Dark",
    preference: "With Milk",
    flavour: "Bold and Bitter",
    rating: 4.7,
    tags: ["Sampler"],
    topRated: false
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/1SamplerPack__Front.jpg?v=1707393228&width=1080",
    title: "Curated Sample Selection",
    description: "Attikan Estate, Silver Oak, Vienna Roast",
    price: 700,
    roast: "Medium",
    preference: "Without Milk",
    flavour: "Balanced",
    rating: 4.9,
    tags: ["Sampler", "Custom"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/Sampler_201224.jpg?v=1750764829&width=1800",
    title: "Sampler Pack",
    description: "Vienna Roast, French Roast, Silver Oak",
    price: 700,
    roast: "Dark",
    preference: "With Milk",
    flavour: "Bold and Bitter",
    rating: 4.7,
    tags: ["Sampler"],
    topRated: false
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/1SamplerPack__Front.jpg?v=1707393228&width=1080",
    title: "Curated Sample Selection",
    description: "Attikan Estate, Silver Oak, Vienna Roast",
    price: 700,
    roast: "Medium",
    preference: "Without Milk",
    flavour: "Balanced",
    rating: 4.9,
    tags: ["Sampler", "Custom"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/Sampler_201224.jpg?v=1750764829&width=1800",
    title: "Sampler Pack",
    description: "Vienna Roast, French Roast, Silver Oak",
    price: 700,
    roast: "Dark",
    preference: "With Milk",
    flavour: "Bold and Bitter",
    rating: 4.7,
    tags: ["Sampler"],
    topRated: false
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  },
  {
    image: "https://bluetokaicoffee.com/cdn/shop/files/2_Coffee_Cans.jpg?v=1732175621",
    title: "5-in-1 Explorer Pack",
    description: "Blue Tokai Coffee Roasters",
    price: 1170,
    roast: "Medium Dark",
    preference: "With or Without Milk",
    flavour: "Chocolaty and Nutty",
    rating: 4.8,
    tags: ["Explorer", "Pack"],
    topRated: true
  }
  // ...add more products as needed
];

function filterProducts(products, selected) {
  return products.filter(product => {
    // For each filter group, if any selected, product must match one
    for (const [group, options] of Object.entries(selected)) {
      if (options.length === 0) continue;
      if (group === "Roast Level" && !options.includes(product.roast)) return false;
      if (group === "Drinking Preference" && !options.includes(product.preference)) return false;
      if (group === "Flavour Profile" && !options.includes(product.flavour)) return false;
    }
    return true;
  });
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
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const filteredProducts = filterProducts(PRODUCTS, selectedFilters);
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage-1)*perPage, currentPage*perPage);

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "#fff" }}>
      <Banner
        video="http://cdn.pixabay.com/video/2022/08/05/126803-737028141_large.mp4"
        headline="Carefully sourced from India's finest farms"
        features={featureList}
      />
      <div style={{ display: "flex" }}>
        <aside style={{ width: 260, padding: "2.5rem 1.5rem 2.5rem 2.5rem", background: "#181818", minHeight: "100vh", borderRight: "1.5px solid #232323" }}>
          <Filters filters={FILTERS} selected={selectedFilters} onChange={setSelectedFilters} />
        </aside>
        <main style={{ flex: 1, padding: "2.5rem 2.5rem 2.5rem 2rem", minHeight: "100vh" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2.5rem", width: "100%" }}>
            {paginatedProducts.map((product, i) => (
              <Card
                key={i}
                image={product.image}
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </main>
      </div>
    </div>
  );
};

export default ShopPage; 