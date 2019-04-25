import React from "react";

const Comment = ({ comment, user, deleteComment }) => {
  let author = false;
  if (user.user.username === comment.author) {
    author = true;
  }
  return (
    <div key={comment.comment_id}>
      <p>
        {comment.body} Votes: {comment.votes}
      </p>
      <p>
        {author ? (
          <button onClick={deleteComment} id={comment.comment_id}>
            delete comment
          </button>
        ) : (
          comment.author
        )}
      </p>
    </div>
  );
};

export default Comment;
