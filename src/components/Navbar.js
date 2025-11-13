import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css"; // si tu veux styliser avec CSS

const Navbar = () => {
  const [showSignupMenu, setShowSignupMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  return (
    <div className="container-navbar">
      <p className="container-logo">Sen École Virtuelle</p>
      <div className="vide"></div>

      <nav className="navbar">
        <li><Link className="li-link" to="/">Home</Link></li>

        {/* === Menu déroulant pour SIGN UP === */}
        <li
          className="dropdown"
          onMouseEnter={() => setShowSignupMenu(true)}
          onMouseLeave={() => setShowSignupMenu(false)}
        >
          <span className="li-link dropdown-title">S'inscrire ▾</span>
          {showSignupMenu && (
            <ul className="dropdown-menu">
              <li><Link to="/signup-eleve" className="dropdown-item">Élève</Link></li>
              <li><Link to="/signup-prof" className="dropdown-item">Professeur</Link></li>
            </ul>
          )}
        </li>

        {/* === Menu déroulant pour LOGIN === */}
        <li
          className="dropdown"
          onMouseEnter={() => setShowLoginMenu(true)}
          onMouseLeave={() => setShowLoginMenu(false)}
        >
          <span className="li-link dropdown-title">Se connecter ▾</span>
          {showLoginMenu && (
            <ul className="dropdown-menu">
              <li><Link to="/login-eleve" className="dropdown-item">Élève</Link></li>
              <li><Link to="/login-prof" className="dropdown-item">Professeur</Link></li>
            </ul>
          )}
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
