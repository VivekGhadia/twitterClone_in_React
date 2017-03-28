import React, { Component } from 'react';

class upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <div className="align-center">
        <form action="/photo" enctype="multipart/form-data" method="post">
          <p>Please specify a file, or a set of files:<br/>
            <input type="file"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}/>
          </p>
          <div>
            <input type="submit" value="Send"/>
          </div>
        </form>
      </div>
    );
  }
}
export default upload;
