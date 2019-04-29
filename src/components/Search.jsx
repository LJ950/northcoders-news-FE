import React, { Component } from "react";
import "./css/search.css";
// import Articles from "./Article";

class Search extends Component {
  render() {
    return (
      <nav className="navbar">
        <h4>Search Topics</h4>
        <input placeholder="search topics..." />
      </nav>
    );
  }
}

export default Search;
