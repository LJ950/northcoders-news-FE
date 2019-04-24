import React from "react";
import "./css/article.css";
import Articles from "./Articles";
import { fetchArticles, fetchCommentsByArticle } from "../api";

class Article extends Articles {
  state = {
    article: {},
    comments: []
  };

  render() {
    const { article, comments } = this.state;
    return (
      <main>
        <div className="single-article">
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <p>{article.body}</p>
          <p>
            <span>Add Comment</span>

            <button className="vote-button">Vote Up</button>
            <span className="article-votes">{article.votes}</span>
            <button className="vote-button">Vote Down</button>
          </p>
        </div>
        <div className="article-comments">
          <h4>Comments ({article.comment_count})</h4>
          {comments.map(comment => {
            return (
              <div key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>{comment.author}</p>
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  componentDidMount = async () => {
    const article_id = this.props.article_id;
    const article = await fetchArticles(article_id);
    const comments = await fetchCommentsByArticle(article_id);
    this.setState(() => {
      return {
        article: article.data.article,
        comments: comments.data.comments
      };
    });
  };
}
export default Article;
