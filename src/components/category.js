import React, { Component } from "react";
import SubCategory from "./Sub_category";
class Category extends Component {
    //redColor = "btn btn-danger btn-outline-dark btn-lg col-md-2";
    //blackColor = "btn btn-dark btn-outline-dark btn-lg col-md-2";
    //btn-outline-dark
    redColor = "btn btn-danger";
    blackColor = "btn btn-dark";
    state = {
        categories: [
            { id: 1, content: "Near you", btnColor: this.blackColor },
            { id: 2, content: "Pizza", btnColor: this.blackColor },
            { id: 3, content: "Chicken", btnColor: this.blackColor },
            { id: 4, content: "Burgers", btnColor: this.blackColor },
            { id: 5, content: "Sushi", btnColor: this.blackColor },
            { id: 6, content: "Wings", btnColor: this.blackColor },
            { id: 7, content: "Chinese", btnColor: this.blackColor }
        ],
    };

    handleClick = (content) => {

        console.log(content, "clicked");
        //need to change the color of the button as well
    }

    handleColor = (id) => {
        const resetColor = () => {
            const categories = [...this.state.categories];
            categories.map(category => category.btnColor = this.blackColor);
            this.setState({ categories: categories });
        }
        resetColor();
        const categories = [...this.state.categories];
        //we changed the specific id button
        categories[id - 1].btnColor = this.redColor;
        this.setState({ categories: categories });
    }

    render() {
        return (
            <div>
                {this.state.categories.map(category => {
                    return (
                        <SubCategory
                            key={category.id}
                            category={category}
                            onClick={this.handleClick}
                            onColorChange={this.handleColor}
                        />
                    );
                })}
            </div>
        );
    }
}
export default Category;
