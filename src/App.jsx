import React, { Component } from 'react';

import HeroInsert from './components/hero-insert/hero-insert';
import HeroList from './components/hero-list/hero-list';

import logo from './assets/logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hero Example</h1>
        </header>
        <br/>
        <HeroList/>
        <HeroInsert/>

      </div>
    );
  }
}

export default App;
