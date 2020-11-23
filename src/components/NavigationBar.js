import React, { Component } from "react";

import "../css/NavigationBar.css";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      budget: "",
    };
  }

  render() {
    const getNavStateText = () => {
      switch (this.props.userState) {
        case "RESTAURANT_SELECTION":
          return "Select a Restaurant";
        case "DISH_SELECTION":
          return `${this.props.restaurantName}, choose your dish`;
        case "SHOW_CART":
          return `${this.props.restaurantName}, choose your dish`;

        default:
          break;
      }
    };

    const getWalletRemainingText = () => {
      return this.state.budget > 0 ? this.props.walletRemaining : "-";
    };

    return (
      <div className="headerResponsiveContainer">
        <div className="headerContainer">
          <button
            key={0}
            className={`
              ${
                this.props.userState === "DISH_SELECTION" ||
                this.props.userState === "SHOW_CART"
                  ? "backButton materialButton"
                  : "hideButton"
              }
            `}
            onClick={() => {
              this.props.handleBackButtonClick();
            }}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
            <span>back</span>
          </button>

          {/* Navigation text */}
          <div className="navigationStateText">
            <h1>{getNavStateText()}</h1>
          </div>

          <div className="headerGroup_AlignRight">
            {/* User Address*/}
            <div className="userAddress">
              <i className="fas fa-house-user"></i>
              <input
                className="navInput"
                type="text"
                placeholder="Your address"
                value={this.props.userAddress}
                onChange={(event) => {
                  this.props.handleAddressChange(event.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.target.blur();
                  }
                }}
              />
            </div>

            {/* Wallet */}
            <div className="wallet">
              <i className="fa fa-credit-card" aria-hidden="true" />
              <span>wallet</span>
            </div>

            <div className="walletInputContainer">
              <span className="inputDescriptionText">Budget</span>
              <div>
                <input
                  className={`
                navInput
                walletInput
              `}
                  type="number"
                  value={this.state.budget === 0 ? "" : this.state.budget}
                  onChange={(event) => {
                    this.setState({
                      budget: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    this.setState({
                      budget: event.target.value,
                    });
                    this.props.handleWalletBudgetChange(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.target.blur();
                    }
                  }}
                />
              </div>
            </div>

            <div className="walletInputContainer">
              <span className="inputDescriptionText">Remaining</span>
              <div
                className={`
                  walletRemaining
                `}
              >
                {getWalletRemainingText()}
              </div>
            </div>

            <button
              className="walletHelp"
              onClick={() => {
                const str =
                  "Welcome to our Wallet feature!\n\n" +
                  "Wallet can help you budget your order to not overspend. By reminding you how much money left that you can spend.\n\n" +
                  "You can specify what's your budget inside the 'Budget' box and then press \"Enter\". We will calculate how much left that you can spend in 'Remaning' box.\n\n" +
                  "When you are out of budget. Simply increase your budget or remove some items from your cart.\n\n" +
                  "If you want to disable the Wallet feature or reset your budget, you can click the reset button.";
                alert(str);
              }}
            >
              <i className="far fa-question-circle"></i>
            </button>

            <button
              className="walletReset"
              onClick={() => {
                this.setState({
                  budget: 0,
                });
                this.props.handletWalletReset();
              }}
            >
              <i className="fas fa-undo-alt"></i>
            </button>

            {/* Cart button */}
            <button
              className={`cartButton materialButton ${
                this.props.userState === "RESTAURANT_SELECTION"
                  ? "disabledButton"
                  : ""
              }`}
              onClick={() => {
                if (this.props.userState === "DISH_SELECTION") {
                  this.props.handleCartClick();
                }
              }}
            >
              <i className="fas fa-shopping-bag"></i>

              <span>
                cart
                {this.props.totalItems > 0 ? ` (${this.props.totalItems})` : ""}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
