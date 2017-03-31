import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { HelpBlock } from 'react-bootstrap';
import { Button, Row, Col, Icon, NavItem, Navbar } from 'react-materialize';

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      emailid:'',
      password:'',
      file:'',
      question:'',
      answer:'',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){

    axios.post('http://localhost:8000/register', {
    userdata: this.state,

  })

  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
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
        <Navbar brand='Twitter' className='indigo' right>
          <NavItem href='/login'>Login</NavItem>
          <NavItem href='/register'>Register</NavItem>
        </Navbar>
        <div className="container">
          <div className="wrapper">
            <form action="/register" method="POST"
              encType="multipart/form-data"
              className="form-signup">
              <h3 className="indigo-text text-darken-2">Join Today</h3>
              <br/><br/>
              <input type="text"
                name="name"
                placeholder="Enter your name"
                className="form-control"
                value={this.state.name}
                onChange={this.onFieldChange}/>
              <HelpBlock className="errFontStyle">
                {this.state.usernamerequirederrors}
              </HelpBlock>
              <input type="email"
                name="emailid"
                placeholder="Email-Id"
                className="form-control"
                value={this.state.emailid}
                onChange={this.onFieldChange}/>
              <HelpBlock className="errFontStyle">
                {this.state.emailrequirederrors}
              </HelpBlock>
              <input type="password"
                name="password"
                placeholder="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onFieldChange}/>
              <HelpBlock className="errFontStyle">
                {this.state.passwordrequirederrors}
              </HelpBlock><br />
              <label>Select Profile Picture :</label><br/>
              <div className="file-field input-field">
                <div className="btn indigo"><span>Browse</span>
                  <input type="file"
                    name="file"
                    value={this.state.file}
                    onChange={this.onFieldChange}
                    required/>
                  <HelpBlock className="errFontStyle">
                    {this.state.filerequirederrors}
                  </HelpBlock>
                </div>
                <div className="file-path-wrapper">
                  <input type="text"
                    placeholder="Upload file"
                    className="file-path validate"/>
                </div>
              </div>
              <h6 className="indigo-text text-darken-2">Select Your Security Question :</h6><br/>
              <select name="question" className="dropdown-button btn indigo"
                value={this.state.question}
                onChange={this.onFieldChange}>
                <option value="bof">Birthplace of your father</option>
                <option value="bom">Birthplace of your Mother</option>
                <option value="fcc">Your Favourite Cartoon Character</option>
                <option value="fmn">Your First Mobile-Number</option>
                <option value="bf">Your Best Friend</option>
              </select>
              <HelpBlock className="errFontStyle">
                {this.state.questionrequirederrors}
              </HelpBlock>
              <br/><br/>
              <input type="text"
                name="answer"
                placeholder="Your Answer"
                required
                className="form-control"
                value={this.state.answer}
                onChange={this.onFieldChange}/>
              <HelpBlock className="errFontStyle">
                {this.state.answerrequirederrors}
              </HelpBlock>
                <br/>
              <button type="submit" onClick={this.handleSubmit}
                className="waves-effect waves-light indigo btn btn-block">SignUp</button><br/><br/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default register;







