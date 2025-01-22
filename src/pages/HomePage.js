import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import Footer from "../components/Footer";
import "../styles.css";

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let updatedProducts = [...products]; // Work with a copy of the array

    // Filter by search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // Apply sorting
    if (sortOption) {
      if (sortOption === "priceLowToHigh") {
        updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceHighToLow") {
        updatedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === "ratingHighToLow") {
        updatedProducts.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );
      }
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, selectedCategory, sortOption, products]);

  return (
    <div className="container my-4">
      <h1 className="text-center p-5 gradient">
        AVISTORE YOUR OWN SHOPPING PLATFORM
      </h1>

      {/* Additional Info Section */}
      <section>
        <div className="additional-info">
          <div className="icon">
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div className="info">
            <p>Worldwide Shipping</p>
            <p>
              Order above <span>$</span>10
            </p>
          </div>
          <div className="icon">
            <i className="fa-solid fa-rotate"></i>
          </div>
          <div className="info">
            <p>Easy 30 Day Returns</p>
            <p>Back Returns in 7 Days</p>
          </div>
          <div className="icon">
            <i className="fa-solid fa-hand-holding-dollar"></i>
          </div>
          <div className="info">
            <p>Money Back Guarantee</p>
            <p>Guarantee within 30 Days</p>
          </div>
          <div className="icon">
            <i className="fa-solid fa-headset"></i>
          </div>
          <div className="info">
            <p>Easy Online Support</p>
            <p>24/7 Any Time Support</p>
          </div>
        </div>
      </section>
      <hr />
      <SearchBar setSearchTerm={setSearchTerm} />
      <FilterDropdown
        setSelectedCategory={setSelectedCategory}
        products={products}
      />

      <div className="mb-3">
        <label htmlFor="sortSelect" className="form-label">
          Sort By:
        </label>
        <select
          id="sortSelect"
          className="form-select"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Select Sorting</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
      <hr />
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default HomePage;
