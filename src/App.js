import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import { fetchUsers } from "./api";
import Header from "./components/Header";
import User from "./components/User";
import Topics from "./components/Topics";
import Article from "./components/Article";
import Error from "./components/Error";

class App extends Component {
  state = {
    user: {},
    validUser: true
  };

  render() {
    return (
      <div className="App">
        <Header />
        <User
          login={this.login}
          user={this.state.user}
          logout={this.logout}
          validUser={this.state.validUser}
        />
        <Router className="Router">
          <Topics className="home" path="/" />
          <Article path="/article/:article_id" user={this.state.user} />
          <Error path="/error" default />
        </Router>
      </div>
    );
  }

  logout = () => {
    this.setState({ user: {} });
  };

  login = async event => {
    event.preventDefault();
    const username = event.target[0].value;
    fetchUsers(username)
      .then(user => {
        return this.setState({
          validUser: true,
          user: user.data.user
        });
      })
      .catch(() => {
        return this.setState({
          validUser: false,
          user: {}
        });
      });
  };
}

export default App;
