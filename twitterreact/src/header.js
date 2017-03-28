import React, { Component } from 'react';
import navbar from './navbar'

class header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <h5 id="text-darken-2" className="orange-text">Your Profile</h5>
            <div id="lighten-7" className="card-panel deep-orange lighten-5"><a href="/profile">
                <div className="form-group"><img src="http://themiddleground.sg/wp-content/uploads/2015/09/Poor-200-x-200-Pixel.jpg" className="img-thumbnails"/><br/>
                  <h4 id="text-darken-2" className="indigo-text"></h4>
                </div></a></div>
          </div>
          <div className="col s5">
            <h5 id="text-darken-2"className="orange-text">Tweets....
              <div className="row">
                <div id="lighten-7" className="card-panel deep-orange lighten-5">
                  <p>
                    <h5 id="text-darken-2" className="indigo-text">tweeted</h5><br/><br/><span></span><br/><br/><span></span><br/><br/><a href="" id="like" className="span fa fa-heart fa-1x"></a> &nbsp<span></span>
                  </p>
                </div>
              </div>
            </h5>
          </div>
          <div className="col s3">
            <h5 className="orange-text text-darken-2">Who to Follow???
              <div id="lighten-7" className="card-panel deep-orange lighten-5">
                <div className="form-group">
                  <h5 id="text-darken-2" className="indigo-text"></h5>
                  <form method="post" action="/follow">
                    <div className="form-group"><img src="" width="100px" height="100px" className="img-circle"/><br/>
                      <input type="hidden" name="myfollow" value=""/><br/>
                      <button type="submit" className="waves-effect waves-light indigo btn">Follow</button><br/><br/>
                    </div>
                  </form>
                </div>
              </div>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
export default header;

