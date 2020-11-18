import React from "react";
import "../css/Dish.css";

const foodLogoList = [
  "fas fa-drumstick-bite fa-5x",
  // "fas fa-seedling fa-5x",
  // "fas fa-hamburger fa-5x",
  // "fas fa-pizza-slice fa-5x",
  // "fas fa-pepper-hot fa-5x",
];

class Dish extends React.Component {
  render() {
    const dish = this.props.dishObj;

    return (
      <div
        className="dish"
        onClick={() => {
          if (this.props.isWithinBudget) {
            this.props.handleSelectDish(dish);
          }
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
    );
  }

  renderOutOfBudget = () => {
    return <div className="dishOutOfBudget">Out of budget</div>;
  };

  renderReviewStars = (n) => {
    let stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(<i class="fas fa-star fa-1x" />);
    }

    for (let i = 0; i < 5 - n; i++) {
      stars.push(<i class="far fa-star fa-1x" />);
    }

    return <div>{stars}</div>;
  };
}

export default Dish;