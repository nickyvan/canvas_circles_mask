import React, { Component } from 'react';
import './App.css';
import PromixityMask from './canvas/PromixityMask';

class App extends Component {
  componentDidMount(){
    new PromixityMask();
  }
  render() {
    return (
      <div className="App">
        <canvas className="canvas"></canvas>
      </div>
    );
  }
}

export default App;
