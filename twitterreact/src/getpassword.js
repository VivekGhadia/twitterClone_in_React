import React, { Component } from 'react';

class getpassword extends Component {
  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <div className="col-sm-5"></div>
          <div className="col-sm-1">
            <div className="well">
              <h2 className="form-signin-heading">Your Password is :</h2><br/><br/>
              <input type="text"
                name="password"
                required
                id="password"
                value=""
                className="form-control"
                /><a href="/login">
                <button type="submit" className="btn btn-info">Go to Log-In</button></a><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default getpassword;
