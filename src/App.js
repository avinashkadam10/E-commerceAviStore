import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Function to update the quantity of a product in the cart
  const updateCartQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  return (
    <Router>
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route
          path="/products/:id"
          element={<ProductDetailsPage addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
