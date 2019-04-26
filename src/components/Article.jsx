import React, { Component } from "react";
import "./css/article.css";
import Comment from "./Comment";
import {
  fetchArticleByID,
  fetchCommentsByArticle,
  postComment,
  deleteComment,
  updateVotes
} from "../api";
import AddComment from "./AddComment";
import Votes from "./Votes";
import { formattedDate } from "../utils/utils";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    addComment: false,
    newComment: {},
    voted: false
  };
  render() {
    const { article, comments } = this.state;
    return (
      <main>
        <div className="single-article">
          <h2>{article.title}</h2>
          <p>
            <span>{article.author}</span>{" "}
            <span className="article-date">
              {formattedDate(article.created_at)}
            </span>
          </p>
          <p>{article.body}</p>
          <Votes
            articleOrComment={this.state.article}
            user={this.props.user}
            voted={this.state.voted}
            changeVote={this.changeVote}
            context="articles"
          />

          {this.state.addComment ? (
            <AddComment
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              user={this.props.user}
            />
          ) : (
            <button
              disabled={!this.props.user.loggedIn}
              onClick={this.allowAddComment}
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
                user={this.props.user}
                deleteComment={this.userDeleteComment}
                voted={this.state.voted}
                changeVote={this.changeVote}
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
    this.setState(state => {
      return { ...state, newComment: newComment };
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { user } = this.props;
    const articleId = this.state.article.article_id;
    const commentBody = this.state.newComment;
    const currentUser = user.user.username;

    postComment(commentBody, currentUser, articleId)
      .then(submittedComment => {
        submittedComment.data.comment.votes = 0;
        return this.setState(state => {
          return {
            ...state,
            comments: [submittedComment.data.comment, ...this.state.comments],
            newComment: "",
            addComment: false,
            articles: state.article.comment_count++
          };
        });
      })
      .catch(err => alert("Error! Comment not posted."));
  };

  userDeleteComment = event => {
    const keptComments = this.state.comments.slice(1);
    this.setState(state => {
      return {
        ...state,
        comments: [...keptComments],
        articles: (state.article.comment_count -= 1)
      };
    });
    if (this.state.comments[0].comment_id !== undefined) {
      const commentId = event.target.id;
      deleteComment(commentId)
        .then()
        .catch(err => alert("Comment could not be deleted"));
    }
  };

  changeVote = event => {
    const id = event.target.getAttribute("articleorcommentid");
    const vote = +event.target.id;
    const context = event.target.getAttribute("context");
    if (context === "articles") {
      this.setState(state => {
        return {
          ...state,
          article: { ...state.article, votes: (state.article.votes += vote) },
          voted: true
        };
      });
    } else {
      const updatedComment = this.state.comments.filter(comment => {
        return comment.comment_id === +id;
      });
      updatedComment[0].votes += vote;
      this.setState(state => {
        return {
          ...state,
          comments: [...state.comments],
          voted: true
        };
      });
    }
    updateVotes(id, vote, context)
      .then()
      .catch(err => alert("Sorry, there was a counting your vote"));
  };

  allowAddComment = event => {
    event.preventDefault();
    this.setState(state => {
      return { ...state, addComment: true };
    });
  };
}
export default Article;
