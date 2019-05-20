import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./css/topics.css";
import { fetchTopics } from "../api";
import Articles from "./Articles";
import Search from "./Search";

class Topics extends Component {
  state = {
    topics: [],
    currentTopic: "",
    searchTopics: []
  };

  render() {
    const displayTopics =
      this.state.searchTopics.length === 0
        ? this.state.topics
        : this.state.searchTopics;
    return (
      <main>
        <Articles
          currentTopic={this.state.currentTopic}
          user={this.props.user}
        />

        <div className="topics-box">
          <Search handleSearch={this.handleSearch} />
          <h3>Filter articles by topic</h3>
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
          return { topics: topics.data.topics };
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

  handleSearch = event => {
    const foundTopics = this.state.topics.filter(topic => {
      return topic.slug.includes(event.target.value);
    });
    this.setState({ searchTopics: foundTopics });
  };
}

export default Topics;
