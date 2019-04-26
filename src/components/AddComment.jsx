import React from "react";

const AddComment = ({ handleSubmit, handleChange }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} id="comment" />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default AddComment;
