import axios from "axios";
import { navigate } from "@reach/router";
const BASE_URL = "https://lukes-northcoders-news.herokuapp.com/api";

export const fetchArticles = async query => {
  let queryString = "";
  if (query) {
    queryString = `?topic=${query}`;
  }
  const articles = axios
    .get(`${BASE_URL}/articles${queryString}`)
    .then()
    .catch(err => {
      navigate("/error");
    });
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
  const user = await axios.get(`${BASE_URL}/users/${username}`);
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

export const deleteComment = async comment_id => {
  const response = await axios.delete(`${BASE_URL}/comments/${comment_id}`);
  return response;
};

export const updateVotes = async (id, vote, context) => {
  // console.log(`${BASE_URL}/${context}/${id}`);
  const article = await axios.patch(`${BASE_URL}/${context}/${id}`, {
    inc_votes: vote
  });
  return article;
};
