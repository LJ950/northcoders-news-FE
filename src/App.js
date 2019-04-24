import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Home from "./components/Home";
import Article from "./components/Article";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Navbar />
        <User />
        <Router className="Router">
          <Home className="home" path="/" />
          <Article path="/article/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
