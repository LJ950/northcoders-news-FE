import axios from "axios";
const BASE_URL = "https://lukes-northcoders-news.herokuapp.com/api";

export const fetchArticles = async article_id => {
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
