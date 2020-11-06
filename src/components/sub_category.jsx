import React, { Component } from "react";

class SubCategory extends Component {
    render() {
        return (
            <div>
                <button type="button" className={this.props.category.btnColor} id={this.props.category.id}
                    onClick={() => {
                        this.props.onClick(this.props.category.content);
                        this.props.onColorChange(this.props.category.id);
                    }}>
                    {this.props.category.content}
                </button>
            </div>
        );
    }
}
export default SubCategory;
