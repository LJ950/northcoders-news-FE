import React from "react";
import "./css/search.css";

const Search = props => {
  return (
    <nav className="navbar">
      <h4>Search Topics</h4>
      <input placeholder="search topics..." onChange={props.handleSearch} />
    </nav>
  );
};

export default Search;
