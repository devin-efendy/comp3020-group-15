import React from "react";
import ReactDOM from "react-dom";

import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import Sidebar from "./components/Sidebar";
import Restaurant from "./components/Restaurant";
import Dish from "./components/Dish";
import AddressPrompt from './components/AddressPrompt';

import RestaurantStub from "./backend/RestaurantStub";
import DishStub from "./backend/DishStub";

const RESTAURANT_SELECTION = "RESTAURANT_SELECTION";
const DISH_SELECTION = "DISH_SELECTION";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userState: RESTAURANT_SELECTION,
      totalPrice: 0,
      walletUserBudget: 0,
      walletRemaining: 0,
      selectedRestaurant: {
        restaurantName: "",
        restaurantLogo: "",
        deliveryTime: "",
        deliveryFee: -1,
        review: -1,
      },
      selectedDishes: [],
      showAddressPopup: true,
    };
  }

  handleAddressPrompt() {
    this.setState({
      showAddressPopup: !this.state.showAddressPopup
    });
  }

  handleSelectRestaurant = (restaurant) => {
    this.setState({
      selectedRestaurant: restaurant,
      userState: DISH_SELECTION,
    });
  };

  handleSelectDish = (dish) => {
    /**
     * When the user select a dish do the following:
     * 1. Add the price of the dish to the total price.
     * 2. Substract the remaining value of user's budget.
     * 3. Add the selected dish to the selectedDishes list.
     *
     * @param {*} dish the selected dish
     */

    this.setState({
      totalPrice: this.state.totalPrice + dish.price,
      walletRemaining: this.state.walletRemaining - dish.price,
      selectedDishes: [...this.state.selectedDishes, dish],
    });
  };

  handleBackButtonClick = () => {
    this.setState({
      userState: RESTAURANT_SELECTION,
      selectedRestaurant: "",
    });
  };

  handleWalletBudgetChange = (value) => {
    this.setState({
      walletUserBudget: value,
      walletRemaining: value - this.state.totalPrice,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.showAddressPopup ? <AddressPrompt closeAddressPopup={this.handleAddressPrompt.bind(this)}/> : null}
        <NavigationBar
          handleWalletBudgetChange={this.handleWalletBudgetChange}
          handleBackButtonClick={this.handleBackButtonClick}
          userState={this.state.userState}
          restaurantName={this.state.selectedRestaurant.restaurantName}
          walletRemaining={this.state.walletRemaining}
        />

        <div className="Main__Container">
          <Sidebar />

          <div className="MainList__Container">
            {this.state.userState === DISH_SELECTION
              ? this.renderDishList()
              : this.renderRestaurantList()}
          </div>
        </div>

        <Cart />
      </div>
    );
  }

  /**
   * This function will render the list of Restaurants
   */
  renderRestaurantList = () => {
    const restaurantList = RestaurantStub;

    return restaurantList.map((restaurant) => {
      return (
        <Restaurant
          restaurantObj={restaurant}
          handleSelectRestaurant={this.handleSelectRestaurant}
        />
      );
    });
  };

  /**
   * This function will render the list of Dishes from the selectedRestaurant
   */
  renderDishList = () => {
    const dishList = DishStub.filter((dish) => {
      return (
        dish.restaurantName === this.state.selectedRestaurant.restaurantName
      );
    });

    return dishList.map((dish) => {
      return (
        <Dish
          dishObj={dish}
          handleSelectDish={this.handleSelectDish}
          isWithinBudget={this.state.walletRemaining >= dish.price}
        />
      );
    });
  };
}

export default App;