import React, { Component } from "react";
import "./css/articles.css";
import "../api";
import { navigate } from "@reach/router";
import { fetchArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import Search from "./Search";

class Articles extends Component {
  state = {
    articles: [],
    searchedArticles: [],
    articleSearchTerm: "",
    currentTopic: "",
    sort: "",
    order: ""
  };

  render() {
    const displayArticles =
      this.state.articleSearchTerm.length === 0
        ? this.state.articles
        : this.state.searchedArticles;
    return (
      <div className="articles-box">
        <div className="content">
          <h2>
            {this.state.currentTopic
              ? `Articles on ${this.state.currentTopic}...`
              : "Latest Articles..."}
          </h2>

          <div className="sort-menu">
            <Search
              handleSearch={this.handleArticleSearch}
              placeholder="search titles..."
            />
            <select onChange={this.sortBy}>
              <option value="created_at" defaultValue>
                date published
              </option>
              <option value="comment_count">comments</option>
              <option value="votes">votes</option>
              <option value="author">author</option>
            </select>
            <select onChange={this.orderBy}>
              <option value="asc">ascending</option>
              <option value="desc" defaultValue>
                descending
              </option>
            </select>
          </div>

          {displayArticles.map(article => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    const { data } = await fetchArticles();
    this.setState(() => {
      return { articles: data.articles };
    });
  };

  componentDidUpdate = () => {
    if (this.state.currentTopic !== this.props.currentTopic) {
      const topic = this.props.currentTopic;
      const sort = this.state.sort || "created_at";
      fetchArticles(topic, sort)
        .then(({ data }) =>
          this.setState(() => {
            return {
              articles: data.articles,
              currentTopic: topic,
              articleSearchTerm: ""
            };
          })
        )
        .catch(err => {
          navigate("/error", {
            replace: true,
            state: {
              code: err.code,
              message: err.message,
              from: "/articles"
            }
          });
        });
    }
  };

  orderBy = event => {
    const order = event.target.value;
    this.setState(
      {
        order: order
      },
      () => {
        this.sortBy();
      }
    );
  };

  sortBy = event => {
    const sort = event ? event.target.value : this.state.sort || "created_at";
    const topic = this.state.currentTopic;
    const order = this.state.order;
    fetchArticles(topic, sort, order)
      .then(({ data }) =>
        this.setState({ articles: data.articles, sort: sort, order: order })
      )
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: `/articles`
          }
        });
      });
  };

  handleArticleSearch = event => {
    const searchTerm = event.target.value;
    const foundArticles = this.state.articles.filter(article => {
      return article.title.toLowerCase().includes(searchTerm);
    });
    this.setState({
      searchedArticles: foundArticles,
      articleSearchTerm: searchTerm
    });
  };
}

export default Articles;
