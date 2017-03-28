import React, { Component } from 'react';
import axios from 'axios';

class resetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: '',
      question:'',
      answer:''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){

    axios.post('http://localhost:8000/resetpassword', {
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
      <div className="container">
        <div className="wrapper">
          <form action="/resetpassword" method="POST" className="form-login">
            <h2 className="indigo-text text-darken-2">Please Enter Details...</h2><br/><br/>
            <input type="text"
              name="emailid"
              placeholder="Email Address"
              required
              id="emailid"
              autoComplete="off"
              className="form-control"
              value={this.state.emailid}
              onChange={this.onFieldChange}/>
            <label>Select Your Question :</label><br/>
            <select name="question"
              className="dropdown-button btn indigo"
              value={this.state.question}
              onChange={this.onFieldChange}>
              <option value="bof">Birthplace of your father</option>
              <option value="bom">Birthplace of your Mother</option>
              <option value="fcc">Your Favourite Cartoon Character</option>
              <option value="fmn">Your First Mobile-Number</option>
              <option value="bf">Your Best Friend</option>
            </select><br/><br/>
            <input type="text"
              name="answer"
              placeholder="Your Answer"
              required
              id="answer"
              autoComplete="off"
              className="form-control"
              value={this.state.answer}
              onChange={this.onFieldChange}/><br/>
            <button type="submit" onClick={this.handleSubmit} name="submit" className="btn btn-lg btn-info btn-block indigo">Submit</button><br/><br/>
            <label>Don't Have an Account?</label><a href="register">Create Account</a><br/>
            <script>
              var question = document.getElementById("question");
              var returnvalue = question.options[question.selectedIndex].value;
            </script>
          </form>
        </div>
      </div>
    );
  }
}
export default resetpassword;
