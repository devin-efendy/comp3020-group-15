import React, { Component } from "react";
import '../css/SubCategory.css';
class SubCategory extends Component {
    render() {
        const style={
            float: "left"
        }
        return (
            <React.Fragment>
                <button type="button" className={this.props.category.className}
                    id={this.props.category.id}         
                    onClick={() => {
                        this.props.onClick(this.props.category);
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
