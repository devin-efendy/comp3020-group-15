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
import SubCategory from "./components/SubCategory";

const RESTAURANT_SELECTION = "RESTAURANT_SELECTION";
const DISH_SELECTION = "DISH_SELECTION";

const restaurantCategoryText = [
  "Near you",
  "Pizza",
  "Burger",
  "Sushi",
  "Wings",
  "Chinese",
];

const dishCategoryText = [
  "All",
  "Combo",
  "Appetizer",
  "Entree",
  "Dessert",
  "Drink",
];

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
      showAddressPopup: false,
      userAddress: "",
      backButtonAlert: true,
      // Category state
      selectedRestaurantCategory: "near you",
      selectedDishCategory: "all",
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
      this.state.walletUserBudget == 0 ||
      sumPrice <= this.state.walletRemaining
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
    } else {
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

  handleCategorySelection = (category) => {
    if (this.state.userState === RESTAURANT_SELECTION) {
      this.setState({
        selectedRestaurantCategory: category.toLowerCase(),
      });
    } else {
      this.setState({
        selectedDishCategory: category.toLowerCase(),
      });
    }
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

        <div className="Main__Container">
          <div className="CategoryMainContainer">
            <h3 className="categoryHeading">CATEGORY:</h3>
            {this.renderCategory()}
          </div>
          <ul className="MainList__Container">
            {this.state.userState === DISH_SELECTION
              ? this.renderDishList()
              : this.renderRestaurantList()}
          </ul>
        </div>
        <Cart
          selectedRestaurant={this.state.selectedRestaurant}
          selectedDishes={this.state.selectedDishes}
        />
      </div>
    );
  }

  /**
   * This function will render the list of Restaurants
   */
  renderRestaurantList = () => {
    let restaurantList = RestaurantStub;

    if (this.state.selectedRestaurantCategory !== "near you") {
      restaurantList = RestaurantStub.filter((restaurant) => {
        if (
          restaurant.category.toLowerCase() ===
          this.state.selectedRestaurantCategory
        ) {
          return restaurant;
        }
      });
    }

    return restaurantList.map((restaurant, index) => {
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
    let dishList = DishStub.filter((dish) => {
      return (
        dish.restaurantName === this.state.selectedRestaurant.restaurantName
      );
    });

    if (this.state.selectedDishCategory !== "all") {
      dishList = dishList.filter((dish) => {
        if (dish.category.toLowerCase() === this.state.selectedDishCategory) {
          return dish;
        }
      });
    }

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

  renderCategory = () => {
    const categoryList =
      this.state.userState === RESTAURANT_SELECTION
        ? restaurantCategoryText
        : dishCategoryText;

    const renderList = categoryList.map((category) => {
      let isSelected;

      if (this.state.userState === RESTAURANT_SELECTION) {
        isSelected =
          this.state.selectedRestaurantCategory === category.toLowerCase();
      } else {
        isSelected = this.state.selectedDishCategory === category.toLowerCase();
      }

      return (
        <li key={category}>
          <SubCategory
            handleCategorySelection={this.handleCategorySelection}
            value={category}
            isSelected={isSelected}
          />
        </li>
      );
    });

    return <Category>{renderList}</Category>;
  };
}

export default App;
