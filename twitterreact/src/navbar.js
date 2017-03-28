import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

// import { Link } from 'react-router';
// import { Router, Route, browserHistory } from 'react-router'

class navbar extends Component {
    constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    console.log("hiiiii")
    axios.get('http://localhost:8000/logout', {



  }).then(function (response) {
    console.log(response)
    console.log("innnn")
    browserHistory.push("/login")

  })

  .catch(function (error) {
    console.log(error);
    console.log("out")
  });

    e.preventDefault(e);
  }

  onFieldChange(event){
    this.setState({
      [ event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><a href="/header"><i className="fa fa-home fa-2x"></i></a></li>
              <li><a href="#"><i className="fa fa-bell fa-2x"></i></a></li>
              <li>
                <a href="#exampleModal" type="button" className="waves-effect waves-light indigo btn">Tweet</a>
                <div id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" className="modal">
                  <div className="modal-dialog">
                    {/*<!-- Modal content-->*/}
                    <div className="modal-content">
                      <div className="modal-body">
                        <form id="tweet" method="post" action="/header" encType="multipart/form-data">
                          <div className="form-group">
                            <h5 id="text-darken-2" htmlFor="comment" className="indigo-text">Whats Happening???</h5>
                            <textarea id="comment" rows="1" name="comment" maxLength="140" className="form-control"></textarea>
                            <div className="file-field input-field">
                              <div className="btn indigo"><span>Browse</span>
                                <input type="file" name="file"/>
                              </div>
                              <div className="file-path-wrapper">
                                <input type="text" placeholder="Upload file" className="file-path validate indigo lighten-3"/>
                              </div>
                            </div><a href="/header"></a>
                            <button type="submit" className="waves-effect waves-light indigo btn">Tweet</button>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="waves-effect waves-light btn grey darken-1 modal-action modal-close">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/profile"><i className="fa fa-user fa-2x"></i></a></li>
            <li><a  onClick= {this.handleSubmit}><i className="fa fa-sign-out fa-2x"></i></a></li>
          </ul>
        </div>
        </nav>
    </div>
    );
  }
}

export default navbar;
