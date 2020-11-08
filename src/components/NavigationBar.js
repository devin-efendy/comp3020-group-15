import React, { Component } from "react";

import "../css/NavigationBar.css";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      walletValue: "",
    };
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleWalletChange = (event) => {
    this.setState({
      walletValue: event.target.value,
    });
  };

  render() {
    const getNavStateText = () => {
      switch (this.props.userState) {
        case "RESTAURANT_SELECTION":
          return "Select a Restaurant";
        case "DISH_SELECTION":
          return `${this.props.restaurantName}, choose your dish`;
        default:
          break;
      }
    };

    return (
      <div className="headerContainer">
        <div>
          <button
            className={`
              ${
                this.props.userState === "DISH_SELECTION"
                  ? "headerButton"
                  : "disableButton"
              }
            `}
            onClick={() => {
              this.props.handleBackButtonClick();
            }}
          >
            <i class="fa fa-chevron-left" aria-hidden="true" />
            <span>back</span>
          </button>
        </div>

        <div className="navigationStateText">
          <h1>{getNavStateText()}</h1>
        </div>

        <div className="headerGroup_AlignRight">
          {/* User Address*/}
          <div className="userAddress">
            <i class="fas fa-house-user"></i>
            <input
              className="navInput"
              type="text"
              placeholder="Your address"
              value={this.state.address}
              onChange={this.handleAddressChange}
            />
          </div>

          {/* Wallet */}
          <div className="wallet">
            <i class="fa fa-credit-card" aria-hidden="true" />
            <span>wallet</span>
          </div>
          <input
            className={`
            navInput
            walletInput
          `}
            type="text"
            placeholder="what's your budget?"
            value={this.state.wallet}
            onChange={this.handleWalletChange}
          />

          {/* Cart button */}
          <button className="headerButton">
            <i class="fas fa-shopping-bag"></i>
            <span>cart</span>
          </button>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
