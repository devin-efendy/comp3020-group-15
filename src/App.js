import React from "react";

import "./css/App.css";
import "./css/overlay.css";
import "./css/button.css";

import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import Restaurant from "./components/Restaurant";
import Dish from "./components/Dish";
import AddressPrompt from "./components/AddressPrompt";

import RestaurantStub from "./backend/RestaurantStub";
import DishStub from "./backend/DishStub";
import Category from "./components/Category";
import SubCategory from "./components/SubCategory";

import OrderPlacedScreen from "./components/OrderPlacedScreen";

const RESTAURANT_SELECTION = "RESTAURANT_SELECTION";
const DISH_SELECTION = "DISH_SELECTION";
const SHOW_CART = "SHOW_CART";
const ORDER_PLACED = "ORDER_PLACED";

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
      totalItems: 0,
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

  handleCartClick = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    const bodyHTML = document.getElementsByTagName("body")[0];
    bodyHTML.style.paddingRight = `${scrollBarWidth}px`;

    this.setState({
      userState: SHOW_CART,
    });
  };

  handleCloseCart = () => {
    this.setState({
      userState: DISH_SELECTION,
    });
  };

  handleSelectRestaurant = (restaurant) => {
    this.setState(
      {
        selectedRestaurant: restaurant,
        userState: DISH_SELECTION,
        selectedDishCategory: "all",
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
          totalItems: this.state.totalItems + dish.quantity,
        },
        () => {
          const bodyHTML = document.getElementsByTagName("body")[0];
          bodyHTML.style.paddingRight = `0px`;

          callback();
          console.log(this.state.totalItems);
        }
      );
    } else {
      alert(
        `Oops! Looks like you are out of budget. The price of your selected item is $${sumPrice}. (You have $${this.state.walletRemaining} remaining)`
      );
    }
  };

  handleRemoveDish = (item) => {
    const newSelectedDishes = this.state.selectedDishes.filter((dish) => {
      return dish.id !== item.id;
    });

    const price = item.quantity * item.price;

    this.setState({
      selectedDishes: newSelectedDishes,
      totalPrice: this.state.totalPrice - price,
      walletRemaining: this.state.walletRemaining + price,
      totalItems: this.state.totalItems - item.quantity,
    });
  };

  handleBackButtonClick = () => {
    if (this.state.backButtonAlert) {
      const goBack = window.confirm(
        'Going back to restaurant selection will remove items from your cart. Click "OK" to proceed'
      );

      if (goBack) {
        this.setState(
          {
            userState: RESTAURANT_SELECTION,
            walletRemaining: this.state.walletUserBudget,
            totalPrice: 0,
            totalItems: 0,
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
          totalItems: 0,
          selectedDishes: [],
        },
        () => {
          window.scrollTo(0, 0);
        }
      );
    }
  };

  handleWalletBudgetChange = (value) => {
    console.log(value)
    if(value === "") {
      return
    }
    this.setState(
      {
        walletUserBudget: value,
        walletRemaining: value - this.state.totalPrice,
      },
      () => {
        if (
          // this.state.walletUserBudget !== 0 &&
          this.state.walletRemaining < 0
        ) {
          alert(
            "Looks like the items in your cart is not within the budget that you specified. Don't worry! You still can place order with your current Cart. \n\nTo add another items, you can increase your budget or remove some items from your cart. Also, if you don't want to use the budget feature, you can click the Reset button."
          );
        }
      }
    );
  };

  handletWalletReset = () => {
    this.setState({
      walletUserBudget: 0,
      walletRemaining: 0,
    });
  };

  handleCategorySelection = (category) => {
    if (this.state.userState === RESTAURANT_SELECTION) {
      this.setState({
        selectedRestaurantCategory: category.toLowerCase(),
      });
    } else if (this.state.userState === DISH_SELECTION) {
      this.setState({
        selectedDishCategory: category.toLowerCase(),
      });
    }
  };

  handlePlaceOrder = () => {
    this.setState({
      userState: ORDER_PLACED,
    });
  };

  render() {
    console.log(this.state.userState);
    let renderList;

    if (this.state.userState === RESTAURANT_SELECTION) {
      renderList = (
        <div className="fadeAnimationLayer">{this.renderRestaurantList()}</div>
      );
    } else {
      renderList = (
        <div className="fadeAnimationLayer">{this.renderDishList()}</div>
      );
    }

    return (
      <div className="App fadeAnimationLayer">
        {this.state.showAddressPopup ? (
          <AddressPrompt closeAddressPopup={this.handleAddressPrompt} />
        ) : null}
        <NavigationBar
          handleWalletBudgetChange={this.handleWalletBudgetChange}
          handletWalletReset={this.handletWalletReset}
          handleBackButtonClick={this.handleBackButtonClick}
          handleAddressChange={this.handleAddressChange}
          handleCartClick={this.handleCartClick}
          userState={this.state.userState}
          restaurantName={this.state.selectedRestaurant.restaurantName}
          walletRemaining={this.state.walletRemaining}
          userAddress={this.state.userAddress}
          totalItems={this.state.totalItems}
        />

        <div className="Main__Container">
          <div className="CategoryMainContainer">
            <h3 className="categoryHeading">CATEGORY:</h3>
            {this.renderCategory()}
          </div>
          <ul className="MainList__Container">{renderList}</ul>
        </div>
        {this.state.userState === SHOW_CART && (
          <Cart
            selectedRestaurant={this.state.selectedRestaurant}
            selectedDishes={this.state.selectedDishes}
            handleCloseCart={this.handleCloseCart}
            cartItems={this.state.selectedDishes}
            handleRemoveDish={this.handleRemoveDish}
            handlePlaceOrder={this.handlePlaceOrder}
            totalPrice={this.state.totalPrice}
          />
        )}

        {this.state.userState === ORDER_PLACED && (
          <OrderPlacedScreen></OrderPlacedScreen>
        )}
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
        <li key={index} className="fadeAnimationLayer">
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
      } else if (this.state.userState === DISH_SELECTION) {
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
