import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Facebook } from 'react-content-loader';

import Opinions from '../discussion/opinions';
import CreateOpinion from '../discussion/CreateOpinion';

import NavBarP from '../../util/NavBarP';
import NavPage from '../../util/NavPage';

import AudioComponent from './AudioComponent';

import style from './audio.css';

import { 
  fetchAudioById,
  createOpinion,
  deleteOpinion
} from './action.js';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
      reply_id: null,
      toward_user: null,
    }
  }

  componentDidMount() {
    console.log(this.props);
    const temAudio = this.props.audio;
    const routerId = this.props.match.params.id;
    if (!temAudio || temAudio._id !== routerId) {
      this.props.fetchAudioById(routerId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
  }

  createOpinionModal = (r, t) => {
    this.setState({creating: !this.state.creating, reply_id:r, toward_user:t});
  }

  createReply = content => {
    this.props.createOpinion(content, this.state.reply_id, this.state.toward_user);
  }

  render() {
    if (this.props.fetching || !this.props.audio) return <Facebook />
    return (
      <NavPage>
      <NavBarP 
        title="听健康"
        leftContent="返回"
        onLeftClick={()=>this.props.history.goBack()}
      > 
        <div className={style["audio-page"]}>
          <AudioComponent audio={this.props.audio} />
          <Opinions
            opinions={this.props.opinions}
            user={this.props.user}
            createOpinion={this.createOpinionModal}
            deleteOpinion={this.props.deleteOpinion}
          />
          <CreateOpinion
            creating={this.state.creating}
            getOpinion={c => this.createReply(c)}
          />
        </div>
      </NavBarP>
      </NavPage>
    );
  }
}

export default connect(
  state => {
    return { ...state.audio, user: state.user.user };
  },
  dispatch => ({
    fetchAudioById: (id) => {dispatch(fetchAudioById(id))},
    createOpinion: (c,r,t) => {dispatch(createOpinion(c,r,t))},
    deleteOpinion: id => {dispatch(deleteOpinion(id))}
  })
)(Audio);