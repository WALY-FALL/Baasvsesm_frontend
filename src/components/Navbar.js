import React from "react";
import { Link } from "react-router-dom";
const Navbar=()=>{
    return(
        <div className="container-navbar">
            <p className="container-logo">Sen Virtual School</p>
            <div className="vide"></div>
            <nav className="navbar">
                <li><Link className="li-link" to="/">Home</Link></li>
                <li><Link className="li-link" to="/signup">Sign up</Link></li>
                <li><Link className="li-link" to="/login">Log in</Link></li>
            </nav>
        </div>
    )
}
export default Navbar;