import React, { Component } from "react";

class SubCategory extends Component {
    render() {
        const style = {
            fontSize: "40px",
            color: "white",
            borderColor: "white",
            border: "2px solid",
        }
        return (
            <div>
                <button type="button" className={this.props.category.btnColor}
                    id={this.props.category.id}
                    style={style}
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
