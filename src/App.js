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
      backButtonAlert: true,
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

  handleSelectDish = (dish, callback = null) => {
    /**
     * When the user select a dish do the following:
     * 1. Add the price of the dish to the total price.
     * 2. Substract the remaining value of user's budget.
     * 3. Add the selected dish to the selectedDishes list.
     *
     * @param {*} dish the selected dish
     */

    const sumPrice = dish.price * dish.quantity;

    if (
      (this.state.walletUserBudget == 0 ||
        sumPrice <= this.state.walletRemaining)
    ) {
      this.setState(
        {
          totalPrice: this.state.totalPrice + sumPrice,
          walletRemaining: this.state.walletRemaining - sumPrice,
          selectedDishes: [...this.state.selectedDishes, dish],
        },
        () => {
          const bodyHTML = document.getElementsByTagName("body")[0];
          bodyHTML.style.paddingRight = `0px`;

          callback();
        }
      );
    }

    else {
      alert(
        `Oops! Looks like you are out of budget. You have $${this.state.walletRemaining} remaining.`
      );
    }
  };

  handleBackButtonClick = () => {
    if (this.state.backButtonAlert) {
      const goBack = window.confirm(
        'Going back to Restaurant selection will remove your Cart from this restaurant. Click "OK" to proceed'
      );

      if (goBack) {
        this.setState(
          {
            userState: RESTAURANT_SELECTION,
            walletRemaining: this.state.walletUserBudget,
            totalPrice: 0,
            selectedDishes: [],
            backButtonAlert: false,
          },
          () => {
            window.scrollTo(0, 0);
          }
        );
      }
    } else {
      this.setState(
        {
          userState: RESTAURANT_SELECTION,
          walletRemaining: this.state.walletUserBudget,
          totalPrice: 0,
          selectedDishes: [],
        },
        () => {
          window.scrollTo(0, 0);
        }
      );
    }
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
        <Category />
        <div className="Main__Container">
          <ul className="MainList__Container">
            {this.state.userState === DISH_SELECTION
              ? this.renderDishList()
              : this.renderRestaurantList()}
          </ul>
        </div>

        <Cart
          selectedRestaurant={this.state.selectedRestaurant}
          selectedDishes={this.state.selectedDishes}
          userState={this.state.userState}
        />
      </div>
    );
  }

  /**
   * This function will render the list of Restaurants
   */
  renderRestaurantList = () => {
    const restaurantList = RestaurantStub;

    return restaurantList.map((restaurant, index) => {
      console.log(index);
      return (
        <li key={index}>
          <Restaurant
            restaurantObj={restaurant}
            handleSelectRestaurant={this.handleSelectRestaurant}
          />
        </li>
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

    return dishList.map((dish, index) => {
      dish.dishPhoto =
        process.env.PUBLIC_URL + `/assets/dish/dish-${count}.jpg`;
      count = (count + 1) % 7;
      return (
        <li key={index}>
          <Dish
            dishObj={dish}
            handleSelectDish={this.handleSelectDish}
            isWithinBudget={
              this.state.walletUserBudget == 0 ||
              this.state.walletRemaining >= dish.price
            }
          />
        </li>
      );
    });
  };
}

export default App;
