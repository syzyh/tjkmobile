import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <ReactPlayer style={{margin: "auto"}} ref={el => this.videoPlayer = el} controls url={this.props.url} />
    );
  }
}

export default Video;