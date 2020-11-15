import React, { Component } from "react";
import "../css/AddressPrompt.css";

class AddressPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  render() {
    return (
      <div className="addressPromptBackground">
        <div className="addressPromptBox">
          <div>
            {/* <i class="fas fa-map-marked-alt fa-4x"></i> */}
            <i class="fas fa-street-view fa-4x"></i>
          </div>
          <div>
            <input
              className="inputBox"
              type="text"
              placeholder="Enter your Address..."
              value={this.state.address}
              onChange={this.handleAddressChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.props.closeAddressPopup(this.state.address);
                }
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                this.props.closeAddressPopup(this.state.address);
              }}
            >
              SELECT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default AddressPrompt;
