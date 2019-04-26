import React, { Component } from "react";
import "./css/articles.css";
import "../api";
// import { Link } from "@reach/router";
import { fetchArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
// import Navbar from "./components/Navbar";

class Articles extends Component {
  state = {
    articles: [],
    currentTopic: ""
  };

  render() {
    return (
      <div className="articles-box">
        <h2>Latest Articles...</h2>
        {this.state.articles.map(article => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </div>
    );
  }

  componentDidMount = async () => {
    const { data } = await fetchArticles();
    this.setState(() => {
      return { articles: data.articles };
    });
  };

  componentDidUpdate = async () => {
    if (this.state.currentTopic !== this.props.currentTopic) {
      const query = this.props.currentTopic;
      const { data } = await fetchArticles(query);
      this.setState(() => {
        return { articles: data.articles, currentTopic: query };
      });
    }
  };
}

export default Articles;
