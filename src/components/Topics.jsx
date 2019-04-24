import React, { Component } from "react";
import "./css/topics.css";
import { fetchTopics } from "../api";

class Topics extends Component {
  state = {
    topics: []
  };

  render() {
    return (
      <div className="topics-box">
        <h3>Hot Topics</h3>
        <ul>
          {this.state.topics.map(topic => {
            return (
              <li className="topic" key={topic.slug}>
                {topic.slug}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount = async () => {
    const topics = await fetchTopics();
    console.log(topics);
    this.setState(() => {
      return { topics: topics.data.topics };
    });
  };
}

export default Topics;
