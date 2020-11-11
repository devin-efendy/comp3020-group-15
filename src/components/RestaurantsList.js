import React from "react";
import "../css/RestaurantsList.css";
import RestaurantStub from "../backend/RestaurantStub";

class RestaurantsList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const restaurantList = RestaurantStub;

    //formatting the restaurant boxes/info
    const restaurantRenderList = restaurantList.map((restaurant) => (
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
                this.props.handleSelectRestaurant(restaurant);
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="RestaurantList__Container">{restaurantRenderList}</div>
    );
  }
}

export default RestaurantsList;
