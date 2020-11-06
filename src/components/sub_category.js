import React, { Component } from "react";

class SubCategory extends Component {
    render() {
        const style = {
            fontSize: "40px",
            color: "white",
            borderColor: "white",
            border: "2px solid",
            width: "245px",
            height:"100px"
        }
        return (
            <React.Fragment>
                <button type="button" className={this.props.category.btnColor}
                    id={this.props.category.id}
                    style={style}
                    onClick={() => {
                        this.props.onClick(this.props.category.content);
                        this.props.onColorChange(this.props.category.id);
                    }}>
                    {this.props.category.content}
                </button>
                <br/>
            </React.Fragment>

        );
    }
}
export default SubCategory;
