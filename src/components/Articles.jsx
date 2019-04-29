import React, { Component } from "react";
import "./css/articles.css";
import "../api";
import { navigate } from "@reach/router";
import { fetchArticles } from "../api";
import { ArticleCard } from "./ArticleCard";

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

  componentDidUpdate = () => {
    if (this.state.currentTopic !== this.props.currentTopic) {
      const query = this.props.currentTopic;
      const { data } = fetchArticles(query)
        .then(
          this.setState(() => {
            return { articles: data.articles, currentTopic: query };
          })
        )
        .catch(err => {
          navigate("/error", {
            replace: true
          });
        });
    }
  };
}

export default Articles;
