import React, { Component } from "react";
import SubCategory from "./SubCategory";
class Category extends Component {
    redColor = "btn btn-danger";
    blackColor = "btn btn-dark";
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
    category={
        NEAR_YOU:1,
        PIZZA:2,
        CHICKEN:3,
        BURGERS:4,
        SUSHI:5,
        WINGS:6,
        CHINESE:7
    };
    handleClick = (category) => {
        //load the main page dishes
        if(category.id===this.category.NEAR_YOU){
            //load near you restaurant
            
        }
        else if(category.id===this.category.PIZZA){
            //load restaurant for Pizza
        }
        else if(category.id===this.category.CHICKEN){

        }
        else if(category.id===this.category.BURGERS){

        }
        else if(category.id===this.category.SUSHI){

        }
        else if(category.id===this.category.WINGS){

        }
        else{

        }

        console.log(category.content, "clicked");
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
            <div style={{paddingTop:"25px",position:"fixed",height:"195%"}}>
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
