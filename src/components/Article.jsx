import React, { Component } from "react";
import "./css/article.css";
import Comment from "./Comment";
import {
  fetchArticleByID,
  fetchCommentsByArticle,
  postComment,
  deleteComment
} from "../api";
import AddComment from "./AddComment";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    addComment: false,
    newComment: {}
  };
  render() {
    // console.log(this.state.comments, "article");
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
    // console.log(this.props.user.user.username);
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
    console.log(keptComments, "KC");
    this.setState(state => {
      return {
        ...state,
        comments: [...keptComments],
        articles: (state.article.comment_count -= 1)
      };
    });
    console.log(this.state);
    if (this.state.comments[0].comment_id !== undefined) {
      const commentId = event.target.id;
      deleteComment(commentId).then(res => {
        console.log(res, "deleted");
      });
    }
  };

  allowAddComment = event => {
    event.preventDefault();
    this.setState(state => {
      return { ...state, addComment: true };
    });
  };
}
export default Article;
