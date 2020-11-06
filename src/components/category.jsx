import React, { Component } from "react";
import SubCategory from "./sub_category";
class Category extends Component {
    redColor = "btn btn-danger btn-lg btn-outline-dark col-md-1";
    blackColor = "btn btn-dark btn-lg btn-outline-dark col-md-1"
    state = {
        categories: [
            { id: 1, content: "Near you", btnColor: this.redColor },
            { id: 2, content: "Pizza", btnColor: this.redColor },
            { id: 3, content: "Chicken", btnColor: this.redColor },
            { id: 4, content: "Burgers", btnColor: this.redColor },
            { id: 5, content: "Sushi", btnColor: this.redColor },
            { id: 6, content: "Wings", btnColor: this.redColor },
            { id: 7, content: "Chinese", btnColor: this.redColor }
        ],
    };

    handleClick = (content) => {

        console.log(content, "clicked");
        //need to change the color of the button as well
    }

    handleColor = (id) => {
        const resetColor = () => {
            const categories = [...this.state.categories];
            categories.map(category => category.btnColor = this.redColor);
            this.setState({ categories: categories });
        }
        resetColor();
        const categories = [...this.state.categories];
        //we changed the specific id button
        categories[id - 1].btnColor = this.blackColor;
        this.setState({ categories: categories });
    }

    render() {
        return (
            this.state.categories.map(category => {
                return (
                    <SubCategory
                        key={category.id}
                        category={category}
                        onClick={this.handleClick}
                        onColorChange={this.handleColor}
                    />
                );
            })

        );
    }
}
export default Category;
