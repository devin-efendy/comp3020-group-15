import React from "react";

import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import Restaurant from "./components/Restaurant";
import Dish from "./components/Dish";
import AddressPrompt from "./components/AddressPrompt";

import RestaurantStub from "./backend/RestaurantStub";
import DishStub from "./backend/DishStub";
import Category from "./components/Category";

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
      userAddress: "",
    };
  }

  handleAddressPrompt = (address) => {
    this.setState({
      showAddressPopup: !this.state.showAddressPopup,
      userAddress: address,
    });
  };

  handleAddressChange = (address) => {
    this.setState({
      userAddress: address,
    });
  };

  handleSelectRestaurant = (restaurant) => {
    this.setState(
      {
        selectedRestaurant: restaurant,
        userState: DISH_SELECTION,
      },
      () => {
        window.scrollTo(0, 0);
      }
    );
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
    this.setState(
      {
        userState: RESTAURANT_SELECTION,
      },
      () => {
        window.scrollTo(0, 0);
      }
    );
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
        {this.state.showAddressPopup ? (
          <AddressPrompt closeAddressPopup={this.handleAddressPrompt} />
        ) : null}
        <NavigationBar
          handleWalletBudgetChange={this.handleWalletBudgetChange}
          handleBackButtonClick={this.handleBackButtonClick}
          handleAddressChange={this.handleAddressChange}
          userState={this.state.userState}
          restaurantName={this.state.selectedRestaurant.restaurantName}
          walletRemaining={this.state.walletRemaining}
          userAddress={this.state.userAddress}
        />
        <Category/>
        <div className="Main__Container">
          

          <div className="MainList__Container">
            {this.state.userState === DISH_SELECTION
              ? this.renderDishList()
              : this.renderRestaurantList()}
          </div>

        </div>

        <Cart 
          selectedRestaurant = {this.state.selectedRestaurant}
          selectedDishes = {this.state.selectedDishes}
        />
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

    let count = 0;

    return dishList.map((dish) => {
      dish.dishPhoto =
        process.env.PUBLIC_URL + `/assets/dish/dish-${count}.jpg`;
      count = (count + 1) % 7;
      return (
        <Dish
          dishObj={dish}
          handleSelectDish={this.handleSelectDish}
          isWithinBudget={
            this.state.walletUserBudget == 0 ||
            this.state.walletRemaining >= dish.price
          }
        />
      );
    });
  };
}

export default App;