import React from "react";
import "./css/user.css";
import Button from "react-bootstrap/Button";

const User = ({ user, login, logout, validUser }) => {
  if (user.username) {
    return (
      <div className="users-box">
        <h3>Welcome, {user.name}!</h3>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    return (
      <div className="users-box">
        <form onSubmit={login}>
          <input placeholder="username" defaultValue="jessjelly" />
          <Button type="submit">Sign In</Button>
        </form>
        {validUser ? (
          <p className="login-message">Login to comment and vote!</p>
        ) : (
          <p className="invalid-user">User not found!</p>
        )}
      </div>
    );
  }
};

export default User;
