import React from "react";
import "./css/search.css";

const Search = props => {
  return (
    <div className="search-box">
      <h3>Search Topics</h3>
      <input placeholder="search topics..." onChange={props.handleSearch} />
    </div>
  );
};

export default Search;
