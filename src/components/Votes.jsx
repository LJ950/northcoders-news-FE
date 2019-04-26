import React from "react";
import { disableVote } from "../utils/utils";
const Votes = ({ articleOrComment, user, voted, changeVote, context }) => {
  // console.log(articleOrComment, "AorC");
  // const AorC = { ...articleOrComment };
  return (
    <div>
      <button
        disabled={disableVote(user.loggedIn, voted)}
        className="vote-button"
        onClick={changeVote}
        id={1}
        context={context}
        articleorcommentid={
          articleOrComment.comment_id || articleOrComment.article_id
        }
      >
        Vote Up
      </button>
      <span className="article-votes">{articleOrComment.votes}</span>
      <button
        disabled={disableVote(user.loggedIn, voted)}
        className="vote-button"
        onClick={changeVote}
        id={-1}
        context={context}
        articleorcommentid={
          articleOrComment.comment_id || articleOrComment.article_id
        }
      >
        Vote Down
      </button>
    </div>
  );
};

export default Votes;
