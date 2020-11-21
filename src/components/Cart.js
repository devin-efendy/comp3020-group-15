import React, { Component } from "react";

import "../css/Cart.css";
import "../backend/RestaurantStub.js";
import RestaurantStub from "../backend/RestaurantStub";

class Cart extends Component {
  subTotal = 0;
  deliveryCharge = 0;
  tax = 0;
  tip = 0;
  total = 0;
  orderedDishes=[];
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
  renderDish(type) {
    const list = this.props.selectedDishes.map((dish) => {
      return (
        (<li>
          {type === "dish" ? (<p>{dish.dishName + "(x" + dish.quantity + ")"}</p>) : (<p>{"price: "}{dish.price * dish.quantity}{" $"}</p>)}
        </li>)
        );
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
    this.deliveryCharge=this.props.selectedRestaurant.deliveryFee;
  }
  //get the taxes
  taxes() {
    this.tax = (this.subTotal + this.deliveryCharge) * 11 / 100;
  }
  totalCost() {
    this.total = this.subTotal + this.deliveryCharge + this.tax + this.tip;
  }
  subTotalCost(){
    this.props.selectedDishes.map((dish)=>{
      this.subTotal+=dish.price*dish.quantity;
    })
  }

  //get all the fees
  bill() {
    console.log(this.props.selectedDishes);
    
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