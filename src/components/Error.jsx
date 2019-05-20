import React from "react";
import { Link } from "@reach/router";

const Error = props => {
  console.log(props.location.state);
  return (
    <div className="error-page">
      <h1>Sorry, resource not found...</h1>
      <p>
        {props.location.state.message} from {props.location.state.from}
      </p>
      <Link to="/">
        <h3>take me home...</h3>
      </Link>
    </div>
  );
};

export default Error;
