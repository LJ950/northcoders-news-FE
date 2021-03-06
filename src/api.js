import axios from "axios";
const BASE_URL = "https://lukes-northcoders-news.herokuapp.com/api";

export const fetchArticles = async (topic, sort, order) => {
  let queryString = "";
  if (topic) queryString = `?topic=${topic}&sort_by=${sort}&order=${order}`;
  if (!topic && sort) queryString = `?sort_by=${sort}&order=${order}`;
  const articles = await axios.get(`${BASE_URL}/articles${queryString}`);
  return articles;
};

export const fetchArticleByID = async article_id => {
  const articles = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return articles;
};

export const fetchCommentsByArticle = async article_id => {
  const comments = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
  );
  return comments;
};

export const fetchTopics = async () => {
  const topics = await axios.get(`${BASE_URL}/topics`);
  return topics;
};

export const fetchUsers = async username => {
  const user = await axios.get(`${BASE_URL}/users/${username}`).then();
  return user;
};

export const postComment = async (comment, user, article_id) => {
  const submittedComment = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    {
      body: comment,
      username: user
    }
  );
  return submittedComment;
};

export const editComment = async (comment_id, editedComment) => {
  const response = await axios.patch(`${BASE_URL}/comments/${comment_id}`, {
    body: editedComment
  });
  return response;
};

export const deleteComment = async comment_id => {
  const response = await axios.delete(`${BASE_URL}/comments/${comment_id}`);
  return response;
};

export const updateVotes = async (id, vote, artOrCom) => {
  const article = await axios.patch(`${BASE_URL}/${artOrCom}/${id}`, {
    inc_votes: vote
  });
  return article;
};
