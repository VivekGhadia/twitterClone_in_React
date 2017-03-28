import React, { Component } from 'react';
import axios from 'axios';
class updateprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      emailid:'',
      password:'',
      image:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){

  axios.post('http://localhost:8000/updateprofile', {
    userdata: this.state,

  })

  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

    alert('A name was submitted: ' + this.state);
    e.preventDefault(e);
  }

  handleChange(event){
    this.setState({
      [ event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8">
            <form action="/updateprofile" method="POST" encType="multipart/form-data">
              <div className="form-group">
                <h3 className="indigo-text text-darken-2">Update Your Profile</h3><br/>
                <h5 id="text-darken-2" className="indigo-text">Name</h5>
                <input type="text"
                  name="fullname"
                  id="fullname"
                  className="form-control"
                  value={this.state.fullname}
                  onChange={this.handleChange}/>
                <h5 id="text-darken-2" className="indigo-text">Email-Id</h5>
                <input type="email"
                  name="emailid"
                  id="emailid"
                  className="form-control"
                  value={this.state.emailid}
                  onChange={this.handleChange}/>
                <h5 id="text-darken-2" className="indigo-text">Password</h5>
                <input type="text"
                  name="password"
                  id="password"
                  autoComplete="off"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}/>
                <input type="submit" onClick={this.handleSubmit} name="Submit" className="waves-effect waves-light indigo btn"/>
              </div>
            </form>
          </div>
          <div className="col s3">
            <div className="form-group">
              <h3 className="indigo-text text-darken-2">Profile Picture</h3><br/><br/><br/><img src="" width="200px" height="200px" className="img-circle"/><br/>
              <form method="post" encType="multipart/form-data" action="/profilepictureupload"><br/>
                <div className="file-field input-field">
                  <div className="btn indigo"><span>Browse</span>
                    <input
                      type="file"
                      name="file"
                      required/>
                  </div>
                  <div className="file-path-wrapper">
                    <input type="text"
                      placeholder="Upload file"
                      name="image"
                      className="file-path validate"
                      value={this.state.image}
                      onChange={this.handleChange}/>
                  </div>
                  <input
                    type="submit"
                    name="Submit"
                    onClick={this.handleSubmit}
                    className="waves-effect waves-light indigo btn"/>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"><a href="/deleteaccount" className="btn btn-danger"><i className="fa fa-trash-o fa-lg"></i> Delete Your Account</a></div>
        </div>
      </div>
    );
  }
}
export default updateprofile;
