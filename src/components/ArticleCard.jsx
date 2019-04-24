import React from "react";
import "../api";
import { Link } from "@reach/router";

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.article_id}`} id={article.article_id}>
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
          <span className="comments">comments: {article.comment_count}</span>
          <span className="author">author: {article.author}</span>
        </span>
      </div>
    </Link>
  );
};
