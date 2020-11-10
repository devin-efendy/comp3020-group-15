import React from "react";
import ReactDOM from "react-dom";

import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import Sidebar from "./components/Sidebar";
import RestaurantsList from "./components/RestaurantsList";

const RESTAURANT_SELECTION = "RESTAURANT_SELECTION";
const DISH_SELECTION = "DISH_SELECTION";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userState: RESTAURANT_SELECTION,
      totalPrice: 0,
      walletUserBudget: 0,
      walletCurrentValue: 0,
      selectedRestaurant: {
        restaurantName: "",
        restaurantLogo: "",
        deliveryTime: "",
        deliveryFee: -1,
        review: -1,
      },
    };
  }

  handleSelectRestaurant = (restaurant) => {
    this.setState({
      selectedRestaurant: restaurant,
      userState: DISH_SELECTION,
    });
  };

  handleBackButtonClick = () => {
    this.setState({
      userState: RESTAURANT_SELECTION,
    });
  };

  render() {
    return (
      <div className="App">
        <NavigationBar
          walletOn={this.state.walletOn}
          handleWalletToggle={this.handleWalletToggle}
          handleBackButtonClick={this.handleBackButtonClick}
          userState={this.state.userState}
          restaurantName={this.state.selectedRestaurant.restaurantName}
        />
        {/* <Wallet /> */}

        <div className="Main__Container">
          <Sidebar />
          {/* <MainList /> */}
          <RestaurantsList
            handleSelectRestaurant={this.handleSelectRestaurant}
          />
        </div>

        <Cart />
      </div>
    );
  }
}

export default App;
