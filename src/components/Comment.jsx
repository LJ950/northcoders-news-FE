import React, { Component } from "react";
import Votes from "./Votes";
import { author } from "../utils/utils";

class Comment extends Component {
  state = {
    comment: this.props.comment
  };
  render() {
    return (
      <div key={this.props.comment.comment_id}>
        <p>{this.props.comment.body}</p>
        <Votes
          votes={this.state.comment.votes}
          user={this.props.user}
          comment={this.state.comment}
          updateCommentVotes={this.updateCommentVotes}
        />

        {author(this.props.user.username, this.props.comment.author) ? (
          <div>
            <button
              onClick={this.props.deleteComment}
              id={this.props.comment.comment_id}
            >
              delete
            </button>
            <button
              onClick={this.props.editComment}
              id={this.props.comment.comment_id}
            >
              edit
            </button>
          </div>
        ) : (
          this.props.comment.author
        )}
      </div>
    );
  }

  updateCommentVotes = (comment, vote) => {
    this.setState(
      { comment: { ...comment, votes: (comment.votes += vote) } },
      () => {}
    );
  };
}

export default Comment;
