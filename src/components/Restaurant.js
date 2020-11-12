import React from "react";
import "../css/RestaurantsList.css";

class Restaurant extends React.Component {
  constructor() {
    super();
  }

  render() {
    const restaurant = this.props.restaurantObj;

    return (
      <div className="restaurants">
        <div className="restaurantContainer">
          <div className="restaurantLogo">
            <i class={restaurant.restaurantLogo} />
          </div>

          <div className="restaurantGroup__Name_Ratings">
            <h2 className="restaurantName">{restaurant.restaurantName}</h2>
            <p className="ratings">Ratings: {restaurant.review} stars</p>
          </div>

          <div className="restaurantGroup__Time_Fee">
            <div>Delivery time: {restaurant.deliveryTime}</div>
            <div>Delivery fee: ${restaurant.deliveryFee}</div>
          </div>

          <div className="restaurantGroup__Button">
            <button
              className="selectButton"
              onClick={() => {
                console.log("test");
                this.props.handleSelectRestaurant(restaurant);
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurant;
