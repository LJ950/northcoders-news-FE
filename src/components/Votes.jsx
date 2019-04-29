import React, { Component } from "react";
import { disableVote } from "../utils/utils";
import { updateVotes } from "../api";

class Votes extends Component {
  state = {
    voted: false
  };

  render() {
    const author = this.props.comment ? this.props.comment.author : null;
    return (
      <div>
        <button
          disabled={disableVote(this.props.user, this.state.voted, author)}
          className="vote-button"
          onClick={() => {
            this.changeVote(1, this.props.article, this.props.comment);
          }}
        >
          Vote Up
        </button>
        <span className="article-votes">{this.props.votes}</span>
        <button
          disabled={disableVote(this.props.user, this.state.voted, author)}
          className="vote-button"
          onClick={() => {
            this.changeVote(-1, this.props.article, this.props.comment);
          }}
        >
          Vote Down
        </button>
      </div>
    );
  }

  changeVote = (vote, article, comment) => {
    if (article) {
      this.props.updateArticleVotes(article, vote);
      this.setState({ voted: true });
      updateVotes(article.article_id, vote, "articles")
        .then()
        .catch(err => alert("Sorry, there was a problem counting your vote."));
    } else if (comment) {
      this.props.updateCommentVotes(comment, vote);
      this.setState({ voted: true });
      updateVotes(comment.comment_id, vote, "comments")
        .then()
        .catch(err => alert("Sorry, there was a problem counting your vote."));
    }
  };
}

export default Votes;
