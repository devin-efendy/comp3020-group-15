import React, { Component } from "react";
import "../css/SubCategory.css";
class SubCategory extends Component {
  render() {
    return (
      <button
        className={`categoryButton ${
          this.props.isSelected ? "selectedCategory" : ""
        }`}
        onClick={() => {
          this.props.handleCategorySelection(this.props.value);
        }}
      >
        {this.props.value.toLowerCase()}
      </button>
    );
  }
}
export default SubCategory;
