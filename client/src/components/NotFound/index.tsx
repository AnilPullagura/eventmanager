import { Link } from "react-router-dom";
import React from "react";
import "./index.css";

const NotFound: React.FC = () => (
  <div className="not-found-container">
    <div className="not-found-content">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="home-link">
        Go Back Home
      </Link>
    </div>
  </div>
);

export default NotFound;
