import React, { Component } from "react";

import "../css/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      searchValue: "",
    };
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  render() {
    return (
      <div className="header">
        <div className="forms">
          <form>
            <input
              type="text"
              placeholder="address"
              value={this.state.address}
              onChange={this.handleAddressChange}
            />
          </form>
        </div>
        <div className="forms">
          <form>
            <input
              type="text"
              placeholder="search"
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
