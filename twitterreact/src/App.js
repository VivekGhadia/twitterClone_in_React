import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './navbar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
        <div className="start-temp">
          <h1 id="title" className="indigo-text text-darken-2">Welcome to Twitter!!!</h1>
          <div className="paragraph">
            <h4>Be connected with your loved ones...</h4>
            <h4>Social Media</h4>
            <h4>Online Platform</h4>
          </div>
          <form action="/login">
            <button className="waves-effect waves-light indigo btn btn1 btn-block">Login</button>
          </form>
          <form action="/register">
            <button className="waves-effect waves-light indigo btn btn1 btn-block">SignUp</button>
          </form>
        </div>
      </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
