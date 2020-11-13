import React, { Component } from "react";

import "../css/Cart.css";

class Cart extends Component {
  dishes = [
    {
      name: "Italian pizza",
      price: 15,
    },
    {
      name: "Buffalo wings",
      price: 15,
    },
    {
      name: "Noodle",
      price: 12,
    },
  ];
  subTotal=0;
  tax=0;
  deliveryCharge=0;
  tip=0;
  total=0;


  constructor() {
    super();

    this.state = {
      showCart: false,
    };
    
    this.openOrClose = this.openOrClose.bind(this);
  }

  openOrClose = (event) => {
    event.preventDefault();

    if (this.state.showCart) {
      //this.bill();
      this.setState({
        showCart: false,
      });
    } else {
      this.setState({
        showCart: true,
      });
      //get the bill when the windows is open
      this.bill();
    }
  };

  renderDish(type) {
    const list = this.dishes.map((dish) => {
      return (
      <li>
        {type==="dish"?(<p>{dish.name}</p>):(<p>{"price: "}{dish.price}{" $"}</p>)}
      </li>);
    });
    return list;
  }

  //this is applied whenever we open the cart
  resetBill(){
    this.subTotal=0;
    this.tax=0;
    this.deliveryCharge=0;
    this.tip=0;
    this.total=0;
  }
  //get all the fees
  bill(){
    this.resetBill();
    this.dishes.map((dish)=>{
      this.subTotal+= dish.price;
    })
    this.tax+=this.subTotal*11/100;
    this.deliveryCharge=5;
    this.total=this.subTotal+this.tax+this.deliveryCharge+this.tip;      
  }

  render() {
    const { cartItems } = this.props;
    return (
      <div>
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
              <p>Taxes</p>
              <p>Delivery Charge</p>
              <p>Tip</p>
              <p>Total</p>
            </div>
            <div className="cartSection">
              <p>{this.subTotal}{" $"}</p>
              <p>{this.tax}{" $"}</p>
              <p>{this.deliveryCharge}{" $"}</p>
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
