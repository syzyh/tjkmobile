import React, { Component } from 'react';

import Opinions from './opinions';
import CreateOpinion from './CreateOpinion';
class Opinion extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      creatingOpinion: false,
      replyId: null,
      towardUser: props.towardUser,
    };
  }

  showOpinionModal = (replyId, towardUser) => {
    this.setState({ replyId, towardUser});
  }

  render() {
    return (
      <div>
        <Opinions {...this.props} opinionReply={this.showOpinionModal} />
        <CreateOpinion
          replyId={this.state.replyId}
          towardUser={this.state.towardUser}
          createOpinion={this.props.createOpinion}
          closeModal={()=>{this.setState({replyId: null, towardUser: this.props.towradUser})}} 
        />
      </div>
    );
  }
}

export default Opinion;