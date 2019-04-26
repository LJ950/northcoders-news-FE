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
      navigate("/error", {
        replace: true
      });
    });
  return articles;
};

export const fetchArticleByID = article_id => {
  const articles = axios
    .get(`${BASE_URL}/articles/${article_id}`)
    .then()
    .catch(err => {
      navigate("/error", {
        replace: true
      });
    });
  return articles;
};

export const fetchCommentsByArticle = article_id => {
  const comments = axios
    .get(`${BASE_URL}/articles/${article_id}/comments`)
    .then()
    .catch(err => {
      navigate("/error", {
        replace: true
      });
    });
  return comments;
};

export const fetchTopics = () => {
  const topics = axios
    .get(`${BASE_URL}/topics`)
    .then()
    .catch(err => {
      navigate("/error", {
        replace: true
      });
    });
  return topics;
};

export const fetchUsers = async username => {
  const user = await axios
    .get(`${BASE_URL}/users/${username}`)
    .then()
    .catch(err => {
      navigate("/error", {
        replace: true
      });
    });
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
  const article = await axios.patch(`${BASE_URL}/${context}/${id}`, {
    inc_votes: vote
  });
  return article;
};
