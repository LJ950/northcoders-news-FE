import React, { Component } from "react";
import "./css/navbar.css";
// import Articles from "./Article";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <h4>Search NC News Articles</h4>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Search..." />
          <input type="submit" value="Search Articles" />
        </form>
      </nav>
    );
  }
}

export default Navbar;
