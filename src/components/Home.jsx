import React from "react";
import "./css/home.css";
import Articles from "./Articles";
import Topics from "./Topics";

const Home = () => {
  return (
    <main>
      <Topics />
      <Articles />
    </main>
  );
};

export default Home;
