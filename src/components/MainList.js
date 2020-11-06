import React, { Component } from "react";
import "../css/MainList.css";

class MainList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    return (
      <div className="MainList__Container">
        <ul>
          <li>category-1</li>
          <li>category-2</li>
          <li>category-3</li>
          <li>category-4</li>
          <li>category-5</li>
          <li>category-6</li>
          <li>category-1</li>
          <li>category-2</li>
          <li>category-6</li>
          <li>category-1</li>
          <li>category-2</li>
          <li>category-6</li>
          <li>category-1</li>
          <li>category-2</li>
          <li>category-6</li>
          <li>category-1</li>
          <li>category-2</li>
        </ul>
      </div>
    );
  }
}

export default MainList;
