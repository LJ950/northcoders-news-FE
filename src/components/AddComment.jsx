import React, { Component } from "react";
// import { postComment } from "../api";

class AddComment extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <textarea onChange={this.props.handleChange} id="comment" />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    );
  }
}

export default AddComment;
