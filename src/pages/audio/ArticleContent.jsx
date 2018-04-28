import React, { Component } from 'react';

class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      context: "<p>test</p><p>asdf</p>"
    }
  }
  
  render() {
    // let content = <article dangerouslySetInnerHTML={{__html: this.state.context}}></article>;
    return (
      <div style={{width: '100%'}}>
        <iframe title="testframe" src="http://a.xiumi.us/board/v5/27dMz/48880665" width="100%" height="2000px"></iframe>
      </div>
    );
  }
}

export default Content;