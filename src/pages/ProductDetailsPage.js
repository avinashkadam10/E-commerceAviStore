import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const ProductDetailsPage = ({ addToCart }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const defaultImage = "/favicon.png";
  const imageUrl = product.images?.[0] || defaultImage;

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
            <strong>Rating:</strong> {product.rating?.rate} / 5
          </p>
          <p>{product.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
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
