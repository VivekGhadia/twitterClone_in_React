import React, { Component } from 'react';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import axios from 'axios';
import { Button, Row, Col, Icon, Navbar, NavItem, Modal } from 'react-materialize';


class profile extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
    }
    // this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentWillMount() {
    var c =  cookie.load('userid');
    if(c) {
      <profile />
    } else {
      browserHistory.push("/login");
    }
  }
  render() {
    let id = cookie.load('userid');
    let profile = `/profile/${id}`;
    let updateprofile = `/updateprofile/${id}`
    return (
      <div>
        <Navbar brand='Twitter' className='indigo' right>
          <Modal
              trigger={
                <NavItem>
                  <Icon>textsms</Icon>
                </NavItem>
              }>
              <textarea rows="4" cols="5">
              </textarea>
              <Button>Submit</Button>
            </Modal>
          <NavItem href=''></NavItem>
          <NavItem href={profile}><Icon>assignment_ind</Icon></NavItem>
          <NavItem href='/logout'><Icon>power_settings_new</Icon></NavItem>
        </Navbar>
        <div className="container">
          <div className="row">
            <div className="col s3">
              <h5 id="text-darken-2" className="orange-text">My Profile</h5>
              <div id="lighten-7" className="card-panel grey lighten-3">
                <div className="form-group"><img src="#" className="img-thumbnails"/><br/>
                  <h4 id="text-darken-2" className="indigo-text"></h4><a id="btnprofileedit" href="">
                    <button type="submit" onClick ={ updateprofile }
                      className="waves-effect waves-light indigo btn">
                      Update Profile...<span className="fa fa-pencil-square fa-2x">
                      </span>
                    </button></a>
                    <br/><br/>
                </div>
              </div>
            </div>
            <div className="col s5">
              <h5 className="orange-text text-darken-2">Tweets....</h5>
              <div className="row">
                <div id="lighten-7" className="card-panel grey lighten-3">
                  <p>
                    <h5 id="text-darken-2" className="indigo-text">#tweeted</h5>
                    <br/><br/><span></span><br/><br/><span></span><br/><br/>
                    <a href="" id="like" className="span fa fa-heart fa-1x"></a>
                    <span></span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col s3">
              <h5 id="text-darken-2" className="orange-text"> My Followers</h5>
              <div id="lighten-7" className="card-panel grey lighten-3">
                <div className="form-group">
                  <h4></h4>
                  <form method="post" action="/unfollow"><img src="#" className="img-circle"/><br/>
                    <input type="hidden" name="myfollow" value="value"/><br/>
                    <button type="submit" className="waves-effect waves-red indigo btn">
                      Unfollow
                    </button>
                    <br/><br/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default profile;
