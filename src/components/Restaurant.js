import React from "react";
import "../css/Restaurant.css";

class Restaurant extends React.Component {
  render() {
    const restaurant = this.props.restaurantObj;
    return (
      <div
        className="restaurants fadeAnimationLayer"
        onClick={(e) => {
          e.preventDefault();
          this.props.handleSelectRestaurant(restaurant);
        }}
      >
        <div className="restaurantContainer">
          <div className="restaurantImage">
            <img
              src={
                process.env.PUBLIC_URL +
                `/assets/restaurant/${restaurant.restaurantImg}`
              }
              alt="logo"
            />
          </div>

          <div className="restaurantInfoContainer">
            <h2 className="restaurantName">{restaurant.restaurantName}</h2>
            <p>
              {restaurant.deliveryTime}{" "}
              <span className="fontThin">delivery time</span>
            </p>
            <p>
              ${restaurant.deliveryFee}.00{" "}
              <span className="fontThin">delivery fee</span>
            </p>
          </div>

          <div className="restaurantReviewContainer">
            <div className="restaurantReview">
              <span>{restaurant.review}</span>
              {this.renderReviewStars(restaurant.review)}
            </div>
          </div>
        </div>
      </div>
    );
  }

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

export default Restaurant;