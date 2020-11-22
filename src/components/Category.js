import React, { Component } from "react";
import "../css/Category.css";

class Category extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="categoryContainer">
        <ul>{this.props.children}</ul>
      </div>
    );
  }
}
export default Category;
