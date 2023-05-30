import React from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Import the CSS file for styling

const Navigation = () => {
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <img className="navbar-img" src="/sens.png" />
          </Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="https://sensibull.com/about.html" className="navbar-link">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
