import React, { Component } from "react";
import "../css/OrderPlacedScreen.css";

class OrderPlacedScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="orderPlacedScreen">
        Thank you for your order! <br />
        Your order has been placed.
      </div>
    );
  }
}
export default OrderPlacedScreen;
