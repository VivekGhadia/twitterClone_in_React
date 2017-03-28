import React, { Component } from 'react';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import axios from 'axios';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:'',
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onsubmittweet = this.onsubmittweet.bind(this);
    this.onunfollow = this.onunfollow.bind(this);
    this.onHomeClick = this.onHomeClick.bind(this);
    this.onfollowerCLick = this.onfollowerCLick.bind(this);
  }

  componentWillMount() {
    if(cookie.load(this.props.params.id)){
    let userid = cookie.load(this.props.params.id);
    axios.get('http://localhost:8000/profile/' + userid)
    .then(res => {
      const data= res.data;
      this.setState({
        data: data,
      })
    });
    }
  }
  onsubmittweet(e){
    axios.post('http://localhost:8000/tweet', {
      data : this.state,
    })
    .then(function (response) {
      if (response.data.userid) {
        location.reload();
        browserHistory.push("/profile/" + response.data.userid)
      }
    })
    .catch(function (error) {
    });
    e.preventDefault(e);
    this.setState({
      showComponent: true,
    });
  }
  onunfollow(id) {
    axios.post('http://localhost:8000/unfollow', {
      data : this.state,
      followerid: id,
    })
    .then(function (response) {
      if (response.data.userid) {
        location.reload();
        browserHistory.push("/user/" + response.data.userid)
      } else {
          browserHistory.push("/user/" + response.data.userid)
      }
    })
    .catch(function (error) {

    });
    //e.preventDefault(e);
  }

  onFieldChange(event){
    this.setState({
      [ event.target.name]: event.target.value
    });
  }
  onHomeClick(e) {

    let userid = this.props.params.Id
      if(userid)
        browserHistory.push("/user/" +userid)
      else
        browserHistory.push("/login")
    e.preventDefault(e);
  }
  onfollowerCLick(e){

    let userid = this.props.params.Id
      if(userid)
        browserHistory.push("/followers/" +userid)
      else
        browserHistory.push("/login")
    e.preventDefault(e);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <h5 id="text-darken-2" className="orange-text">My Profile</h5>
            <div id="lighten-7" className="card-panel deep-orange lighten-5">
              <div className="form-group"><img src="#" className="img-thumbnails"/><br/>
                <h4 id="text-darken-2" className="indigo-text"></h4><a id="btnprofileedit" href="">
                  <button type="submit"
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
              <div id="lighten-7" className="card-panel deep-orange lighten-5">
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
            <div id="lighten-7" className="card-panel deep-orange lighten-5">
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
    );
  }
}

export default profile;
