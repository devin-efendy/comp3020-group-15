import React, { Component } from 'react';

import '../css/Cart.css'

class Cart extends Component {
  constructor() {
    super();
    
    this.state = {
      showCart: false,
    };
    
    this.openOrClose = this.openOrClose.bind(this);
  }
  
  openOrClose = (event) => {
    event.preventDefault();
    
    if(this.state.showCart){
        this.setState({
            showCart: false
        });
    }
    else{
        this.setState({
            showCart: true
        });
    }
  }

  render() {
    const {cartItems} = this.props;  
    return (
      <div>
        {
          this.state.showCart
            ? (  
              <div className="cart">
                <button className="cartButton close" onClick={this.openOrClose}>Close Cart</button>
                <div className="cartSection">
                   <ul className="cartList">
                       <li>Item 1</li>
                       <li>Item 2</li>
                       <li>Item 3</li>
                       <li>Item 4</li>
                       <li>Item 5</li>
                   </ul>
                </div>
                <div className="cartSection">
                   <ul className="cartList">
                       <li>Price</li>
                       <li>Price</li>
                       <li>Price</li>
                       <li>Price</li>
                       <li>Price</li>
                   </ul>
                    
                </div>
                <div className="cartSection">
                    <p>Subtotal</p>
                    <p>Taxes</p>
                    <p>Delivery Charge</p>
                    <p>Tip</p>
                    <p>Total</p>
                </div>
                <div className="cartSection">
                    <p>Price</p>
                    <p>Price</p>
                    <p>Price</p>
                    <p>Price</p>
                    <p>Price</p>
                </div>
              </div>
            )
            : (
              <button className="cartButton open" onClick={this.openOrClose}>Show Cart</button>
            )
        }
      </div>
    );
  }
}

export default Cart