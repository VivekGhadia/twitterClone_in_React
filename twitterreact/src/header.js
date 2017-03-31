import React, { Component } from 'react';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import axios from 'axios';
import { Button, Row, Col, Icon, Navbar, NavItem, Modal, CardPanel, Input } from 'react-materialize';

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:'',
    };
    this.onlogoutCLick = this.onlogoutCLick.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentWillMount() {
    let id = this.props.params.userid;
    console.log("...",id);
    if(id){
      axios.get('http://localhost:8000/header/' + id)
      .then(res => {
        const data= res.data;
        this.setState({
          data: data,
        });
        console.log("-------", res.data);
      })
    } else {
      browserHistory.push("/login");
    }
  }
  handleFollow() {

  }

  onlogoutCLick(){
    var a = this.props.params.userid;
   // var a = cookie.load('userid');
    alert("==", this.props.params.userid);
    console.log("===>>>>>>>>>>>",a);
    if(a > 0 ) {
      cookie.remove('userid', { path: '/' });
      browserHistory.push('/login');
    } else {
      browserHistory.push('/login');
    }
  }

  onTwittButtonClick() {
    let userid = this.props.params.id;
    axios.post('http://localhost:8000/tweet',
      {data: this.state,})

    .then(function (response) {
      location.reload();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault(event);
  }

  render() {
    console.log(this.state, '$%$%$%$%$%$%')
    let id = cookie.load('userid');
    let profile = `/profile/${id}`;

    console.log(this.state, '$%$%$%$%$%$%')
    var tweet=[];
    if(this.state.data.tweets) {
      console.log("for loop........");
      for (var i = 0; i < this.state.data.tweets.length ; i++) {
        console.log("for loop........");
        if(this.state.data.tweets[i].t_image) {
          console.log(this.state.data.tweets[i].t_image,"=======");

          tweet.push(

            <div key={i}>
            <CardPanel className="grey lighten-4 black-text">
              <Row>
                <Col s={3}>
                  <img src={ require(`../public/vivek.JPG`)}
                  alt="sss"
                  height="50px"
                  width="50px"
                  className=""/>
                </Col>
                <Col s={3}>
                <a className="tweetName"> {this.state.data.tweets[i].fullname}</a>
                </Col>
              </Row>
                <div className="tweetText"> {this.state.data.tweets[i].t_tweetText} </div>
                <br />
            </CardPanel>
            </div>
          );
        } else {
          tweet.push(
            <div key={i}>
            <CardPanel className="grey lighten-4 black-text">
              <Row>
                <Col s={3}>
                  <img src={ require(`../public/vivek.JPG`)}
                  alt="sss"
                  height="50px"
                  width="50px"
                  className=""/>
                </Col>
                <Col s={3}>
                <a href="/profile" className="tweetName"> {this.state.data.tweets[i].fullname}</a>
                </Col>
              </Row>
              <div className="tweetText"> {this.state.data.tweets[i].t_tweetText}
              </div>
              <br />
              <div className="time indigo-text">{this.state.data.tweets[i].t_time}</div>
              <br/>
            </CardPanel>
            </div>
          );
        }
      }
    }
    var follower = [];
    console.log(this.state.data, '1234567890')
      if(this.state.data.follow) {
        console.log('follow');
         for (var i = 0; i < this.state.data.follow.length ; i++) {
          if(this.state.data.follow) {
            let a = this.state.data.follow[i].id;
            console.log("///",this.state.data.follow[i].id);

            follower.push(
              <div key={i}>
                <CardPanel className="grey lighten-4 black-text">
                  <Row>
                    <Col s={4.5}>
                      <img name="profile"
                        src={require(`../public/vivek.JPG`)}
                        alt="www"
                        height="100px"
                        width="100px"
                      />
                    </Col>
                    <Col s={3}>
                      <h5>{this.state.data.follow[i].fullname}</h5>
                      <Input
                        type="hidden"
                        name="myfollow"
                        value={a}/>
                      <Button
                        onClick={this.handleFollow.bind(this, a)}
                        type="submit"
                        value="Follow"
                        id={a}
                        className="btn-sm btn-info waves-effect waves-light">Follow
                      </Button>
                    </Col>
                  </Row>
                </CardPanel>
              </div>
            );
          }
        }
      }

      var name = [];
      if(this.state.data.username) {
        name.push(
        <div key={i}>
          <a href="profile" className="tweetName"> {this.state.data.username[0].fullname}</a>
        </div>
      );
     }

    return (
      <div>
        <Navbar brand='Twitter' className='indigo' right>
            <Modal
              trigger={
                <NavItem>
                  <Icon>textsms</Icon>
                </NavItem>
              }>
              <p>Tweet here...</p>
              <textarea rows="4" cols="5" right>

              </textarea>
              <Button>Submit</Button>
          </Modal>
          <NavItem href=''></NavItem>
          <NavItem href={profile}><Icon>assignment_ind</Icon></NavItem>
          <NavItem onClick={this.onlogoutCLick} href='/logout'><Icon>power_settings_new</Icon></NavItem>
        </Navbar>
        <div className="container">
          <div>
          {tweet}
          </div>
          <div>
          {follower}
          </div>
        </div>
      </div>
    );
  }
}

export default header;

