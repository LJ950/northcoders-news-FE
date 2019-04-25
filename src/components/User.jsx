import React, { Component } from "react";
import "./css/user.css";

class User extends Component {
  render() {
    const { user } = this.props;
    if (user.loggedIn) {
      return (
        <div className="users-box">
          <h3>Welcome, {user.user.name}!</h3>
          <button onClick={this.props.logout}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div className="users-box">
          <form onSubmit={this.props.login}>
            <input placeholder="username" defaultValue="jessjelly" />
            <button type="submit">Sign In</button>
          </form>
          <p>Login to comment and vote!</p>
        </div>
      );
    }
  }
}

export default User;
