import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import { fetchUsers } from "./api";
import Header from "./components/Header";
// import Navbar from "./components/Navbar";
import User from "./components/User";
import Topics from "./components/Topics";
import Article from "./components/Article";

class App extends Component {
  state = {
    userInfo: { user: {}, loggedIn: false }
  };

  render() {
    return (
      <div className="App">
        <Header />
        {/* <Navbar /> */}
        <User
          login={this.handleSubmit}
          user={this.state.userInfo}
          logout={this.logout}
        />
        <Router className="Router">
          <Topics className="home" path="/" />
          <Article path="/article/:article_id" user={this.state.userInfo} />
        </Router>
      </div>
    );
  }

  logout = () => {
    this.setState({ userInfo: {} });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const username = event.target[0].value;
    fetchUsers(username)
      .then(user => {
        return this.setState({
          userInfo: { user: user.data.user, loggedIn: true }
        });
      })
      .catch(err => alert(`user ${username} not found!`));
  };
}

export default App;
