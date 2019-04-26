import React from "react";
import { Link } from "@reach/router";

const Error = () => {
  return (
    <div className="error-page">
      <h1>Sorry, resource not found...</h1>
      <Link to="/">
        <h3>take me home...</h3>
      </Link>
    </div>
  );
};

export default Error;
