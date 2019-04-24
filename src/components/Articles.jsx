import React, { Component } from "react";
import "./css/articles.css";
import "../api";
import { fetchArticles } from "../api";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    return (
      <div className="articles-box">
        <h2>Latest Articles...</h2>
        {this.state.articles.slice(0, 5).map(article => {
          return (
            <Link
              key={article.article_id}
              to={`/article/${article.article_id}`}
              // onClick={this.selectArticle}
              id={article.article_id}
            >
              <div className="article">
                <span className="title-line">
                  <h3>{article.title}</h3>
                  <span className="article-votes">Votes: {article.votes}</span>
                </span>
                <p>
                  {article.body
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}
                  ...
                </p>
                <span className="footer-line">
                  <span className="comments">
                    comments: {article.comment_count}
                  </span>
                  <span className="author">author: {article.author}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  componentDidMount = async (article_id = "") => {
    const { data } = await fetchArticles(article_id);
    this.setState(() => {
      return { articles: data.articles };
    });
  };
}

export default Articles;
