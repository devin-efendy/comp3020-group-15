import React, { Component } from "react";

import "../css/Cart.css";
import "../backend/RestaurantStub.js";
import RestaurantStub from "../backend/RestaurantStub";

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      showCart: false,
    };
  }

  componentDidMount = () => {
    document.body.style.overflow = "hidden";
  };

  componentWillUnmount = () => {
    document.body.style.overflow = "unset";
  };

  calculateFees = () => {
    const { selectedRestaurant, totalPrice } = this.props;
    const tax = totalPrice * 0.12;
    const deliveryFee =
      selectedRestaurant === undefined ? 0 : selectedRestaurant.deliveryFee;

    return {
      deliveryFee: deliveryFee,
      tax: tax,
      subTotal: totalPrice,
      total: totalPrice + tax + deliveryFee,
    };
  };

  render() {
    const { cartItems, selectedRestaurant } = this.props;
    const fees = this.calculateFees();
    const emptyCart = cartItems.length === 0;

    return (
      <div className="appearAnimationLayer">
        <div
          className="overlay"
          onClick={() => {
            const bodyHTML = document.getElementsByTagName("body")[0];
            bodyHTML.style.paddingRight = `0px`;

            this.props.handleCloseCart();
          }}
        />
        <div className="cartContainer">
          <div className="cartHeader">
            <h1>Cart</h1>
            <button
              className="circleButton materialButton"
              onClick={() => {
                const bodyHTML = document.getElementsByTagName("body")[0];
                bodyHTML.style.paddingRight = `0px`;
                this.props.handleCloseCart();
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div className="cartItemsContainer">
            {emptyCart
              ? `Your cart is empty :(`
              : this.renderCartItems(cartItems)}
          </div>

          <div className="cartSummaryContainer">
            <div className="feesContainer">
              <div className="cartSummaryItem">
                <p>Sub-total: </p>{" "}
                <p className="alignRight">${fees.subTotal.toFixed(2)}</p>
              </div>
              <div className="cartSummaryItem">
                <p>Tax: </p>{" "}
                <p className="alignRight">${fees.tax.toFixed(2)}</p>
              </div>
              <div className="cartSummaryItem">
                <p>Delivery fee: </p>{" "}
                <p className="alignRight">${fees.deliveryFee.toFixed(2)}</p>
              </div>
              <div className="cartSummaryItem totalPrice">
                <p>Total: </p>
                <p className="alignRight">${fees.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="restaurantSummaryContainer">
              <h3>{selectedRestaurant.restaurantName}</h3>
              <p>Delivery time: {selectedRestaurant.deliveryTime}</p>

              <button
                className={`placeOrderButton materialButton ${
                  emptyCart ? "disabledButton" : ""
                }`}
                onClick={() => {
                  if (!emptyCart) {
                    const orderConfirmed = window.confirm(
                      `To confirm and place your order click "OK".`
                    );
                    if (orderConfirmed) {
                      this.props.handlePlaceOrder();
                    }
                  }
                }}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCartItems = (cartItems) => {
    return cartItems.map((dish) => {
      const { dishName, quantity, price, customization } = dish;
      return (
        <div className="cartItemContainer">
          <div className="cartItemHeader">
            <h3>
              {dishName}&nbsp;&nbsp;&nbsp;<b>{`x${quantity}`}</b>
            </h3>

            <div className="itemCustoms">{customization.join(", ")}</div>
          </div>
          <div className="cartItem__RightGroup">
            <p>${price * quantity}</p>
            <button
              className={`circleButton materialButton removeButton`}
              onClick={() => {
                this.props.handleRemoveDish(dish);
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      );
    });
  };
}

export default Cart;
