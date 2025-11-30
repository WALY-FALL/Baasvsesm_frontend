/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css"; // si tu veux styliser avec CSS*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css";

/*const Navbar = () => {
  const [showSignupMenu, setShowSignupMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  return (
    <div className="container-navbar">
      <p className="container-logo">Sen École Virtuelle</p>
      <div className="vide"></div>

      <nav className="navbar">
        <li><Link className="li-link" to="/">Home</Link></li>*/

        {/* === Menu déroulant pour SIGN UP === */}
       /* <li
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
        </li>*/

        {/* === Menu déroulant pour LOGIN === */}
       /* <li
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

export default Navbar;*/



const Navbar = () => {
  const [showSignupMenu, setShowSignupMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="container-navbar">
      <p className="container-logo">Sen École Virtuelle</p>

      {/* === HAMBURGER MOBILE === */}
      <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${mobileOpen ? "navbar-open" : ""}`}>
        <li>
          <Link className="li-link" to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
        </li>

        {/* === SIGNUP === */}
        <li className="dropdown">
          <span
            className="li-link dropdown-title"
            onClick={() => setShowSignupMenu(!showSignupMenu)}
          >
            S'inscrire ▾
          </span>

          <ul className={`dropdown-menu ${showSignupMenu ? "show" : ""}`}>
            <li>
              <Link
                to="/signup-eleve"
                className="dropdown-item"
                onClick={() => setMobileOpen(false)}
              >
                Élève
              </Link>
            </li>
            <li>
              <Link
                to="/signup-prof"
                className="dropdown-item"
                onClick={() => setMobileOpen(false)}
              >
                Professeur
              </Link>
            </li>
          </ul>
        </li>

        {/* === LOGIN === */}
        <li className="dropdown">
          <span
            className="li-link dropdown-title"
            onClick={() => setShowLoginMenu(!showLoginMenu)}
          >
            Se connecter ▾
          </span>

          <ul className={`dropdown-menu ${showLoginMenu ? "show" : ""}`}>
            <li>
              <Link
                to="/login-eleve"
                className="dropdown-item"
                onClick={() => setMobileOpen(false)}
              >
                Élève
              </Link>
            </li>
            <li>
              <Link
                to="/login-prof"
                className="dropdown-item"
                onClick={() => setMobileOpen(false)}
              >
                Professeur
              </Link>
            </li>
          </ul>
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
