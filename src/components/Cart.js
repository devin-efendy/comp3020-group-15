import React, { Component } from "react";

import "../css/Cart.css";
import "../backend/RestaurantStub.js";
import RestaurantStub from "../backend/RestaurantStub";

class Cart extends Component {
  visitedRestaurant = [];
  orderedDishes = [];

  currentDishSize = 0;
  subTotal = 0;
  deliveryCharge = 0;
  tax = 0;
  tip = 0;
  total = 0;



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

  //I modify this a little bit
  renderDish(type) {
    const list = this.orderedDishes.map((dish) => {
      return (
        <li>
          {type === "dish" ? (<p>{dish.dishName + "(x" + dish.quantity + ")"}</p>) : (<p>{"price: "}{dish.price * dish.quantity}{" $"}</p>)}
        </li>);
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
  //get dish quantity
  dishQuantity() {
    if (this.props.selectedDishes.length === 0) {
      console.log("in dishQuantity(), no dish to update");
      return;
    }
    //there is a new dish added
    if (this.currentDishSize !== this.props.selectedDishes.length) {
      //check if we already have a dish in the ordered dishes.
      let length = this.props.selectedDishes.length;
      let existed = false;
      this.orderedDishes.filter(dish => {
        if (dish.dishName === this.props.selectedDishes[length - 1].dishName) {
          dish.quantity++;
          this.currentDishSize++;
          existed = true;
          console.log(this.orderedDishes);
        }
      });
      //we don't have that dish in the list, add it up
      if (!existed) {
        this.orderedDishes.push(
          {
            dishName: this.props.selectedDishes[length - 1].dishName
            , quantity: 1
            , price: this.props.selectedDishes[length - 1].price
            , restaurantName: this.props.selectedDishes[length - 1].restaurantName
          }
        );
        console.log(this.orderedDishes);
        this.currentDishSize++;
      }
    }
  }

  //get delivery fee
  deliveryFee() {
    let restaurantName="";
    for(let i=0;i<this.orderedDishes.length;i++){
      restaurantName=this.orderedDishes[i].restaurantName;
      //restaurant OBJECT
      let restaurant=RestaurantStub.find(restaurant=>restaurant.restaurantName==restaurantName);
      //if the restaurantName is not in the list
      if(!this.visitedRestaurant.includes(restaurant)){
        this.visitedRestaurant.push(restaurant);
      }
    }
    for(let i=0;i<this.visitedRestaurant.length;i++){
      this.deliveryCharge+=this.visitedRestaurant[i].deliveryFee;
    }
  }
  //get the taxes
  taxes() {
    this.tax = (this.subTotal + this.deliveryCharge) * 11 / 100;
  }
  totalCost() {
    this.total = this.subTotal + this.deliveryCharge + this.tax + this.tip;
  }

  //get all the fees
  bill() {
    //get the quantity of the dishes
    if (this.props.selectedDishes.length !== this.currentDishSize) {
      this.dishQuantity();
    }
    this.resetBill();
    //get the delivery fee
    this.deliveryFee();
    //get the total cost of only dishes 
    this.props.selectedDishes.map((dish) => {
      this.subTotal += dish.price;
    })
    //get the taxes
    this.taxes();
    //get the total cost
    this.totalCost();
  }

  render() {
    const { cartItems } = this.props;
    return (

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