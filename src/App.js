import React from "react";
import ReactDOM from "react-dom";

import "./css/App.css";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Wallet from "./components/Wallet";
import Sidebar from "./components/Sidebar";
import MainList from "./components/MainList";

import Category from "./components/Category";

import { RestaurantStub } from "./backend/RestaurantStub";
import { DishStub } from "./backend/DishStub";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    //added by Daniel, in progress
    const categoriesStyle = {
      border: "2px solid green",
      float: "left",
      clear: "none",
      width: "250px"
    };
    const mainSection = {
      border: "2px solid green",
      float: "left",
      clear: "none",
      width: "1450px",
    }
    return (
      <div className="App">
        <Header />
        <Wallet />
        <div className="Main__Container">
          <div style={categoriesStyle}>
            <Category />  
          </div>
          <div style={mainSection}>
            <MainList />
          </div>
          
        </div>

        <Cart />
      </div>
    );
  }
}

export default App;
