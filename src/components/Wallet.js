import React, { Component } from "react";

import "../css/Wallet.css";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      cartVal: 0,
    };
  }

  handleTotalChange = (event) => {
    this.setState({
      total: event.target.value,
    });
  };

  handleAmountChange = (event) => {
    this.setState({
      cartVal: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="wallet">
          <p className="title">Wallet:</p>
          <div className="forms">
            <form>
              <input
                type="text"
                placeholder="total"
                value={this.state.total}
                onChange={this.handleTotalChange}
              />
            </form>
          </div>
          <div className="forms">
            <form>
              <input
                type="text"
                placeholder="remaining"
                value={this.state.total - this.state.cartVal}
                readonly
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Wallet;
