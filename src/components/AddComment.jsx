import React, { Component } from "react";
import { postComment } from "../api";

class AddComment extends Component {
  state = {
    newComment: {}
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleChange} id="comment" />
          <button className="add-comment-btn" type="submit">
            Submit Comment
          </button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    const newComment = event.target.value;
    this.setState({
      newComment: newComment
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { user, articleId } = this.props;
    postComment(this.state.newComment, user.username, articleId)
      .then(submittedComment => {
        this.setState({ newComment: {} });
        this.props.updateStateComment(submittedComment);
      })
      .catch(err => alert("Error! Comment not posted."));
  };
}

export default AddComment;
