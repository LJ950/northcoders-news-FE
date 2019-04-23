import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import User from "./components/User";
import Topics from "./components/Topics";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Navbar />
        <main>
          <Articles />
        </main>
        <div className="sidebar">
          <User />
          <Topics />
        </div>
      </div>
    );
  }
}

export default App;
