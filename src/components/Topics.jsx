import React, { Component } from "react";
import "./css/topics.css";
import { fetchTopics } from "../api";
import Articles from "./Articles";

class Topics extends Component {
  state = {
    topics: [],
    currentTopic: ""
  };

  render() {
    // console.log(this.props, "Topics");
    return (
      <main>
        <Articles
          currentTopic={this.state.currentTopic}
          user={this.props.user}
        />

        <div className="topics-box">
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

  componentDidMount = async () => {
    const topics = await fetchTopics();
    this.setState(() => {
      return { topics: topics.data.topics };
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
