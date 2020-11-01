import React from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './css/App.css';

import Header from './components/Header';
import Cart from './components/Cart'
import Wallet from './components/Wallet'

import { RestaurantStub } from './backend/RestaurantStub';
import { DishStub } from './backend/DishStub';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Wallet />
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <p>Test Scrolling</p>
        <Cart />
      </div>
    );
  }
}

export default App;
