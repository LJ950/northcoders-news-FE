import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./css/topics.css";
import { fetchTopics } from "../api";
import Articles from "./Articles";
import Search from "./Search";

class Topics extends Component {
  state = {
    topicSearchTerm: "",
    allTopics: [],
    currentTopic: "",
    searchTopics: []
  };

  render() {
    const displayTopics =
      this.state.topicSearchTerm.length === 0
        ? this.state.allTopics
        : this.state.searchTopics;
    return (
      <main>
        <Articles
          currentTopic={this.state.currentTopic}
          user={this.props.user}
        />

        <div className="topics-box">
          <h3>Filter articles by topic</h3>
          <Search
            handleSearch={this.handleTopicSearch}
            placeholder="search topics..."
          />

          <button onClick={this.setTopic} id="">
            Reset Filters
          </button>
          <ul>
            {displayTopics.map(topic => {
              return (
                <li
                  className="topic"
                  key={topic.slug}
                  onClick={this.setTopic}
                  id={topic.slug}
                >
                  {topic.slug}
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    );
  }

  componentDidMount = () => {
    fetchTopics()
      .then(topics =>
        this.setState(() => {
          return { allTopics: topics.data.topics };
        })
      )
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: `/topics`
          }
        });
      });
  };

  setTopic = event => {
    const topic = event.target.id;
    this.setState({ currentTopic: topic });
  };

  handleTopicSearch = event => {
    const topicSearchTerm = event.target.value;
    const foundTopics = this.state.allTopics.filter(topic => {
      return topic.slug.includes(topicSearchTerm);
    });
    this.setState({
      searchTopics: foundTopics,
      topicSearchTerm: topicSearchTerm
    });
  };
}

export default Topics;
