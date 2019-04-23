import React, { Component } from "react";
// import "./css/topics.css";

class Topics extends Component {
  state = {
    topics: [
      {
        slug: "coding",
        description: "Code is love, code is life"
      },
      {
        slug: "football",
        description: "FOOTIE!"
      },
      {
        slug: "cooking",
        description: "Hey good looking, what you got cooking?"
      }
    ]
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
}

export default Topics;
