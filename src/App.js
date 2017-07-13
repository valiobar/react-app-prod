import React, { Component } from 'react';
import Header from './common/Header';
import Routes from './common/appRouter/Routes';
import './App.css';
import {Preloader,Col} from 'react-materialize'

class App extends Component {
  render() {
    return (

      <div className="App">

          <Header/>

          <Routes />

      </div>
    );
  }
}

export default App;
