import React from "react";
import "./css/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h4>Search NC News Articles</h4>
      <input placeholder="Search..." />
    </nav>
  );
};

export default Navbar;
