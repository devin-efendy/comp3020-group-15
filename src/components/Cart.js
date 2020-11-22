import React, { Component } from "react";

import "../css/Cart.css";
import "../backend/RestaurantStub.js";
import RestaurantStub from "../backend/RestaurantStub";

const RESTAURANT_SELECTION = "RESTAURANT_SELECTION";
const DISH_SELECTION = "DISH_SELECTION";
class Cart extends Component {
   
  subTotal = 0;
  deliveryCharge = 0;
  tax = 0;
  tip = 0;
  total = 0;
  orderedDishes = [];
  constructor() {
    super();

    this.state = {
      showCart: false,
    };

    this.openOrClose = this.openOrClose.bind(this);
    this.bill = this.bill.bind(this);
  }

  openOrClose = (event) => {
    event.preventDefault();

    if (this.state.showCart) {
      this.setState({
        showCart: false,
      });
    } else {
      this.setState({
        showCart: true,
      });
    }
  };
  updateQuantity() {
    //deep copy the selected Dishes
    this.orderedDishes = [...this.props.selectedDishes];
    for (let i = 0; i < this.orderedDishes.length; i++) {
      for (let j = i + 1; j < this.orderedDishes.length; j++) {
        //if we have 2 dishes with the same name
        if (this.orderedDishes[i].dishName === this.orderedDishes[j].dishName) {
          this.orderedDishes[i].quantity += this.orderedDishes[j].quantity;
          //set j quantity to 0
          this.orderedDishes[j].quantity = 0;
        }
      }
    }
  }
  renderDish(type) {
    const list = this.orderedDishes.map((dish) => {
      if (dish.quantity > 0) {
        return (
          <li>
            {type === "dish" ? (<p>{dish.dishName + "(x" + dish.quantity + ")"}</p>) : (<p>{"price: "}{dish.price * dish.quantity}{" $"}</p>)}
          </li>
        );
      }
    });
    return list;
  }

  //this is applied whenever we open the cart
  resetBill() {
    this.subTotal = 0;
    this.tax = 0;
    this.deliveryCharge = 0;
    this.tip = 0;
    this.total = 0;
  }
  //get delivery fee
  deliveryFee() {
    if(this.props.userState===DISH_SELECTION)
      this.deliveryCharge = this.props.selectedRestaurant.deliveryFee;
    else
      this.deliveryCharge=0;
  }
  //get the taxes
  taxes() {
    this.tax = (this.subTotal + this.deliveryCharge) * 11 / 100;
  }
  totalCost() {
    this.total = this.subTotal + this.deliveryCharge + this.tax + this.tip;
    this.total=Number.parseFloat(this.total).toFixed(2);
  }
  subTotalCost() {
    this.orderedDishes.map((dish) => {
      this.subTotal += dish.price * dish.quantity;
    })
  }
  //get all the fees
  bill() {
    //update quantity to merge dishes first
    this.updateQuantity();
    //reset all accounts
    this.resetBill();
    //get the delivery fee
    this.deliveryFee();
    //get the total cost of only dishes 
    this.subTotalCost();
    //get the taxes
    this.taxes();
    //get the total cost
    this.totalCost();
  }

  render() {
    const { cartItems } = this.props;
    return (
      //{}
      <div>
        {this.bill()}

        {this.state.showCart ? (
          <div className="cart">
            <button className="cartButton close" onClick={this.openOrClose}>
              Close Cart
            </button>
            <div className="cartSection">
              <ul className="cartList">{this.renderDish("dish")}</ul>
            </div>
            <div className="cartSection">
              <ul className="cartList">{this.renderDish("price")}</ul>
            </div>
            <div className="cartSection">
              <p>Subtotal</p>
              <p>Delivery Charge</p>
              <p>Taxes</p>
              <p>Tip</p>
              <p>Total</p>
            </div>
            <div className="cartSection">
              <p>{this.subTotal}{" $"}</p>
              <p>{this.deliveryCharge}{" $"}</p>
              <p>{this.tax}{" $"}</p>
              <p>{this.tip}{" $"}</p>
              <p>{this.total}{" $"}</p>
            </div>
          </div>
        ) : (
            <button className="cartButton open" onClick={this.openOrClose}>
              Show Cart
            </button>
          )}
      </div>
    );
  }
}

export default Cart;