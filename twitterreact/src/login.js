import React, { Component } from 'react';
import axios from 'axios';

import { Route, Router, browserHistory} from 'react-router';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: '',
      password:'',
      data: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    axios.post('http://localhost:8000/login', {
    userdata: this.state,
  })

  .then(function (response) {
    console.log(response.data.userid)
    if (response.data.userid) {
      browserHistory.push("/header/" + response.data.userid)
    } else {
        browserHistory.push("/login")
    }
  })

  .catch(function (error) {
    console.log(error);
  });

  e.preventDefault(e);
  this.setState({
    showComponent: true,
  });

    alert('A name was submitted: ' + this.state.emailid);
    e.preventDefault(e);
  }

  onFieldChange(event){
    this.setState({
      [ event.target.name]: event.target.value
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="container">
          <div className="wrapper">
            <form action="/login" method="POST" className="form-login">
              <h3 className="indigo-text text-darken-2">Please Login</h3><br/><br/>
              <input type="email"
                name="emailid"
                placeholder="Email Address"
                value={this.state.emailid}
                onChange={this.onFieldChange}
                required
                className="form-control"/>
              <input type="password"
                name="password" placeholder="Password"
                required="" id="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onFieldChange}/>
              <button type="submit" onClick={this.handleSubmit} className="waves-effect waves-light indigo btn btn-block">Login</button><br/><br/><br/>
              <label>Don't Have an Account?</label><a href="register" >Create Account</a><br/>
              <label>Forgot Password?</label><a href="resetpassword" >Click Here!</a><br/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default login;

