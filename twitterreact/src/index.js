import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import register from './register'
import login from './login';
import logout from './logout';
import navbar from './navbar';
import profile from './profile';
import updateprofile from './updateprofile';
import resetpassword from './resetpassword';
import getpassword from './getpassword';
import upload from './upload';
import header from './header'

import { Route, Router, browserHistory} from 'react-router';



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
    <Route path="/login" component={login}/>
    <Route path="/register" component={register}/>
    <Route path="/profile/:userid" component={profile}/>
    <Route path="/resetpassword" component={resetpassword}/>
    <Route path="/updateprofile/:userid" component={updateprofile}/>
    <Route path="/getpassword" component={getpassword}/>
    <Route path="/upload" component={upload}/>
    <Route path="/logout" component={logout}/>
    <Route path="/header/:userid" component={header}/>

  </Router>
  ),
  document.getElementById('root')
);
