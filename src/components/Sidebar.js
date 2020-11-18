import React, { Component } from "react";
import "../css/Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Sidebar">
        <ul>
          <li>category-1</li>
          <li>category-2</li>
          <li>category-3</li>
          <li>category-4</li>
          <li>category-5</li>
          <li>category-6</li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;