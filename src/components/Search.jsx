import React from "react";
import "./css/search.css";

const Search = props => {
  return (
    <div className="search-box">
      <input
        placeholder={props.placeholder}
        onChange={props.handleSearch}
        value={props.value}
      />
    </div>
  );
};

export default Search;
