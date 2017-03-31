import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './navbar';
import cookie from 'react-cookie';
import { Route, Router, browserHistory} from 'react-router';
import './App.css';
import { Button, Row, Col, Icon, NavItem } from 'react-materialize';

class Logout extends Component {

  render() {
    var a = this.props.params.userid;
   // var a = cookie.load('userid');
    console.log("===",this.props);
    if(a > 0 ) {
      cookie.remove('userid', { path: '/' });
      browserHistory.push('/login');
    } else {
      browserHistory.push('/login');
    }

    return (
      <div>

      </div>
    );
  }
}

export default Logout;
