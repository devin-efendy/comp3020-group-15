import React from "react";
import ReactDOM from "react-dom";

import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import Sidebar from "./components/Sidebar";
import RestaurantsList from "./components/RestaurantsList";

import Category from "./components/Category";

import { RestaurantStub } from "./backend/RestaurantStub";
import { DishStub } from "./backend/DishStub";
import "./css/Category.css";
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
    const mainSection={
      border: "2px solid green",
      float: "left",
      clear: "none",
      width: "1450px",
    }
    return (
      <div className="App">
        <Header />
        <Wallet />
        <NavigationBar
          walletOn={this.state.walletOn}
          handleWalletToggle={this.handleWalletToggle}
          handleBackButtonClick={this.handleBackButtonClick}
          userState={this.state.userState}
          restaurantName={this.state.selectedRestaurant.restaurantName}
        />
        {/* <Wallet /> */}

        <div className="Main__Container">
          <div className="categories">
            <Category />  
          </div>
          <div style={mainSection}>
            <MainList />
          </div>
          
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
