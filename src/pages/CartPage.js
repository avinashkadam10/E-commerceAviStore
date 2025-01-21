import React from "react";
import Footer from "../components/Footer";

const CartPage = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-4">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="cart-item d-flex justify-content-between align-items-center mb-3"
        >
          <div className="item-details">
            <div>{item.title}</div>
            <div className="item-price">
              ${item.price} x {item.quantity}
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CartPage;
