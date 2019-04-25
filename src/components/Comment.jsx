import React from "react";

const Comment = ({ comment }) => {
  return (
    <div key={comment.comment_id}>
      <p>
        {comment.body} Votes: {comment.votes}
      </p>
      <p>{comment.author}</p>
    </div>
  );
};

export default Comment;
