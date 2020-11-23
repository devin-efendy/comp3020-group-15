import React from "react";
import "../css/Dish.css";
import DishCustomization from "./DishCustomization";

class Dish extends React.Component {
  constructor() {
    super();
    this.state = {
      showCustomization: false,
    };
  }

  turnOffCustomization = () => {
    this.setState({ showCustomization: false });
  };

  handleAddToCart = (item) => {
    this.props.handleSelectDish(item, () => {
      this.turnOffCustomization();
    });
  };

  render() {
    const dish = this.props.dishObj;
    return (
      <div key={this.props.dishKey}>
        <div
          className="dish"
          onClick={() => {
            if (!this.props.isWithinBudget) {
              return;
            }
            this.setState({ showCustomization: true });

            const documentWidth = document.documentElement.clientWidth;
            const windowWidth = window.innerWidth;
            const scrollBarWidth = windowWidth - documentWidth;

            const bodyHTML = document.getElementsByTagName("body")[0];
            bodyHTML.style.paddingRight = `${scrollBarWidth}px`;
          }}
        >
          <div
            className={`dishContainer ${
              this.props.isWithinBudget ? "" : "dimmed"
            }`}
          >
            <div className="dishImage">
              <img src={dish.dishPhoto} alt="logo" />
            </div>

            <div className="dishGroup__Name_Description">
              <h2 className="dishName">{dish.dishName}</h2>
              <p className="dishDescription">{dish.description}</p>
            </div>

            <div className="dishReviewContainer">
              <div className="dishReview">
                <span>{dish.review}</span>
                {this.renderReviewStars(dish.review)}
              </div>
              <p className="dishPrice">${dish.price}.00 </p>
              {!this.props.isWithinBudget ? this.renderOutOfBudget() : ""}
            </div>
          </div>
        </div>

        {this.state.showCustomization ? (
          <DishCustomization
            turnOffCustomization={this.turnOffCustomization}
            dishObj={dish}
            handleAddToCart={this.handleAddToCart}
          />
        ) : null}
      </div>
    );
  }

  renderOutOfBudget = () => {
    return <div className="dishOutOfBudget">Out of budget</div>;
  };

  renderReviewStars = (n) => {
    let stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(<i className="fas fa-star fa-1x" />);
    }

    for (let i = 0; i < 5 - n; i++) {
      stars.push(<i className="far fa-star fa-1x" />);
    }

    return <div>{stars}</div>;
  };
}

export default Dish;
