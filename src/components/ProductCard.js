import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const defaultImage = "/favicon.png"; // Default image to use in case the product image fails to load
  const imageUrl = product.images?.[0] || defaultImage; // If no product image is available, use the default image

  return (
    <div className="card cards">
      <Link to={`/products/${product.id}`}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={product.title || "Product image"}
          onError={(e) => {
            e.target.src = defaultImage; // If image fails to load, set the default image
          }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <p className="card-category text-muted">
          Category: {product.category?.name || "Unknown"}
        </p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
