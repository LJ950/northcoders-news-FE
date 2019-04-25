import React, { Component } from "react";
import "./css/article.css";
import Comment from "./Comment";
import { fetchArticleByID, fetchCommentsByArticle, postComment } from "../api";
import AddComment from "./AddComment";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    addComment: false,
    newComment: ""
  };
  render() {
    // console.log(this.props, "article");
    const { article, comments } = this.state;
    return (
      <main>
        <div className="single-article">
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <p>{article.body}</p>
          <button className="vote-button">Vote Up</button>
          <span className="article-votes">{article.votes}</span>
          <button className="vote-button">Vote Down</button>

          {this.state.addComment ? (
            <AddComment
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              user={this.props.user}
            />
          ) : (
            <button
              disabled={!this.props.user.loggedIn}
              onClick={this.addComment}
            >
              Add Comment
            </button>
          )}
        </div>
        <div className="article-comments">
          <h4>Comments ({article.comment_count})</h4>

          {comments.map(comment => {
            return (
              <Comment
                comment={comment}
                key={comment.comment_id || comment.comment_id + 1}
              />
            );
          })}
        </div>
      </main>
    );
  }

  componentDidMount = async () => {
    const article_id = this.props.article_id;
    const article = await fetchArticleByID(article_id);
    const comments = await fetchCommentsByArticle(article_id);
    this.setState(() => {
      return {
        article: article.data.article,
        comments: comments.data.comments
      };
    });
  };

  handleChange = event => {
    const newComment = event.target.value;
    // console.log(newComment, "HC COm");
    this.setState({ newComment: newComment });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { user } = this.props;
    const articleId = this.state.article.article_id;
    const commentBody = this.state.newComment;
    const currentUser = user.user.username;

    postComment(commentBody, currentUser, articleId)
      .then(submittedComment => {
        return this.setState(state => {
          return {
            ...state,
            comments: [submittedComment.data.comment, ...this.state.comments],
            newComment: "",
            addComment: false
          };
        });
      })
      .catch(console.log);
  };

  addComment = event => {
    event.preventDefault();
    this.setState(state => {
      return { ...state, addComment: true };
    });
  };
}
export default Article;
