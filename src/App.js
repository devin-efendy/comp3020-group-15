import React from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './css/App.css';

import { RestaurantStub } from './backend/RestaurantStub';
import { DishStub } from './backend/DishStub';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
