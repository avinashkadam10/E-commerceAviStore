import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={process.env.PUBLIC_URL + "/favicon.png"}
            alt="AVISTORE Logo"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          AVISTORE
        </Link>

        {/* No Toggler */}
        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{ color: "#0D6EFD" }}
                ></i>
                &nbsp;<span className="badge bg-primary">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
