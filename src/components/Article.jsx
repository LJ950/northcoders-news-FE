import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./css/article.css";
import Comment from "./Comment";
import {
  fetchArticleByID,
  fetchCommentsByArticle,
  deleteComment
} from "../api";
import AddComment from "./AddComment";
import Votes from "./Votes";
import { formattedDate } from "../utils/utils";
import { Link } from "@reach/router";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    addComment: false
  };
  render() {
    const { article, comments } = this.state;
    return (
      <main>
        <div className="single-article">
          <Link to="/" className="home-link">
            Home
          </Link>
          <h2>{article.title}</h2>
          <p>
            <span>{article.author}</span>{" "}
            <span className="article-date">
              {formattedDate(article.created_at)}
            </span>
          </p>
          <p>{article.body}</p>
          <Votes
            votes={this.state.article.votes}
            user={this.props.user}
            article={this.state.article}
            updateArticleVotes={this.updateArticleVotes}
          />
          {this.state.addComment ? (
            <AddComment
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              user={this.props.user}
              updateStateComment={this.updateStateComment}
              articleId={this.state.article.article_id}
            />
          ) : (
            <button
              disabled={!this.props.user.username}
              onClick={this.allowAddComment}
              className="add-comment-btn"
            >
              Add Comment
            </button>
          )}
        </div>

        <div className="article-comments">
          <h4>Comments ({article.comment_count})</h4>
          {comments.map((comment, index) => {
            return (
              <Comment
                comment={comment}
                key={comment.comment_id || index}
                user={this.props.user}
                deleteComment={this.userDeleteComment}
                editComment={this.userEditComment}
                voted={this.state.voted}
                changeVote={this.changeVote}
              />
            );
          })}
        </div>
      </main>
    );
  }

  componentDidMount = () => {
    const article_id = this.props.article_id;
    fetchArticleByID(article_id)
      .then(article => this.setState({ article: article.data.article }))
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: `/articles/${article_id}`
          }
        });
      });
    fetchCommentsByArticle(article_id)
      .then(comments => this.setState({ comments: comments.data.comments }))
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: `/articles/${article_id}/comments`
          }
        });
      });
  };

  updateStateComment = submittedComment => {
    submittedComment.data.comment.votes = 0;
    this.setState(state => {
      return {
        comments: [submittedComment.data.comment, ...this.state.comments],
        addComment: false,
        articles: state.article.comment_count++
      };
    });
  };

  userDeleteComment = event => {
    const commentId = event.target.id || this.state.comments[0].comment_id;
    const keptComments = this.state.comments.slice(1);
    this.setState(state => {
      return {
        comments: [...keptComments],
        articles: (state.article.comment_count -= 1)
      };
    });
    if (this.state.comments[0].comment_id !== undefined) {
      deleteComment(commentId)
        .then()
        .catch(err => {
          navigate("/error", {
            replace: true,
            state: {
              code: err.code,
              message: err.message,
              from: `/comments/${commentId}`
            }
          });
        });
    }
  };

  // userEditComment = event => {
  //   // code to edit comment
  //   console.log(event.target.id);
  // };

  updateArticleVotes = (article, vote) => {
    this.setState({ article: { ...article, votes: (article.votes += vote) } });
  };

  allowAddComment = event => {
    event.preventDefault();
    this.setState({ addComment: true });
  };
}
export default Article;
