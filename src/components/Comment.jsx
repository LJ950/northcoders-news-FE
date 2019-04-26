import React from "react";
import Votes from "./Votes";

const Comment = ({ comment, user, deleteComment, voted, changeVote }) => {
  let author = false;
  if (user.user.username === comment.author) {
    author = true;
  }
  return (
    <div key={comment.comment_id}>
      <p>{comment.body}</p>
      <Votes
        articleOrComment={comment}
        user={user}
        voted={voted}
        changeVote={changeVote}
        context="comments"
      />
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
