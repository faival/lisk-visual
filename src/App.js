import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lisk Blockchain</h1>
        </header>
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
          </main>
      </div>
    );
  }
}

export default App;
