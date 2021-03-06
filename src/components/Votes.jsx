import React, { Component } from "react";
import { disableVote, disabledBtnTT } from "../utils/utils";
import { updateVotes } from "../api";
import ReactTooltip from "react-tooltip";

class Votes extends Component {
  state = {
    voted: false
  };

  render() {
    const author = this.props.comment ? this.props.comment.author : null;
    return (
      <div
        data-tip="you can't vote on your own comments"
        data-tip-disable={disabledBtnTT(
          this.props.user,
          this.state.voted,
          author
        )}
      >
        <ReactTooltip />
        {/* <p>{disabledBtnTT(this.props.user, this.state.voted, author)}</p> */}
        <button
          disabled={disableVote(this.props.user, this.state.voted, author)}
          className="vote-button"
          onClick={() => {
            this.changeVote(1, this.props.article, this.props.comment);
          }}
        >
          <span role="img" aria-label="up">
            👆
          </span>
        </button>
        <span className="article-votes">{this.props.votes}</span>
        <button
          disabled={disableVote(this.props.user, this.state.voted, author)}
          className="vote-button"
          onClick={() => {
            this.changeVote(-1, this.props.article, this.props.comment);
          }}
        >
          <span role="img" aria-label="down">
            👇
          </span>
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
