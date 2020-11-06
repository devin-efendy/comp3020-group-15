import React from "react";
import ReactDOM from "react-dom";

import "./css/App.css";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Wallet from "./components/Wallet";
import Sidebar from "./components/Sidebar";
import MainList from "./components/MainList";

import Category from "./components/category";

import { RestaurantStub } from "./backend/RestaurantStub";
import { DishStub } from "./backend/DishStub";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    //added by Daniel, in progress
    const divStyle = {
      float: "left",
      clear: "none",
      width: "48%",
    };
    return (
      <div className="App">
        <Header />
        <Wallet />
        <div className="Main__Container">
          <div style={divStyle}>
            <Category />
            <MainList />
          </div>
          
        </div>

        <Cart />
      </div>
    );
  }
}

export default App;
