import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const ProductDetailsPage = ({ addToCart }) => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const defaultImage = "/favicon.png";
  const imageUrl = product.images?.[0] || defaultImage;

  const renderStars = () => {
    const totalStars = 5;
    const rating = product.rating?.rate || 3; // Use product rating or default to 3
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "gold" : "lightgrey", fontSize: "1.5rem" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container my-4">
      <h1>{product.title}</h1>

      <div className="row">
        <div className="col-md-6">
          <img
            src={imageUrl}
            alt={product.title}
            className="img-fluid"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        </div>
        <div className="col-md-6">
          <h3>${product.price}</h3>
          <p>
            <strong>Category:</strong> {product.category?.name}
          </p>
          <p>
            <strong>Rating:</strong> {renderStars()}
          </p>
          <p>{product.description}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
