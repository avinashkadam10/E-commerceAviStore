import React from "react";
import Footer from "../components/Footer";

const CartPage = ({ cart, removeFromCart, updateCartQuantity , removeAll }) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (<>
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

          {/* Quantity Adjustment Buttons */}
          <div className="quantity-controls d-flex align-items-center">
            <button
              className="btn btn-secondary me-2"
              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1} 
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-danger"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
        
      ))}
      <button
            className="btn btn-danger"
            onClick={() => removeAll()}
          >
            Remove All
          </button>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      {/* Footer Component */}
      <Footer />
    </div>
    </>
  );
};

export default CartPage;
