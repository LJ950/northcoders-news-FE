import React from "react";
import { Link } from "@reach/router";
import "./css/header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>n.c. news</h1>
      </Link>
    </header>
  );
};

export default Header;
