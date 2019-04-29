import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./css/topics.css";
import { fetchTopics } from "../api";
import Articles from "./Articles";
// import Search from "./Search";

class Topics extends Component {
  state = {
    topics: [],
    currentTopic: ""
  };

  render() {
    return (
      <main>
        <Articles
          currentTopic={this.state.currentTopic}
          user={this.props.user}
        />

        <div className="topics-box">
          {/* <Search /> */}
          <h3>Hot Topics</h3>
          <ul>
            {this.state.topics.map(topic => {
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
          replace: true
        });
      });
  };

  setTopic = event => {
    const topic = event.target.id;
    this.setState(state => {
      return { ...state, currentTopic: topic };
    });
  };
}

export default Topics;
