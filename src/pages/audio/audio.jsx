import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Facebook } from 'react-content-loader';

import NavBarP from '../../util/NavBarP';
import NavPage from '../../util/NavPage';

import AudioComponent from './AudioComponent';
import Opinion from '../discussion/Opinion';

import style from './audio.css';

import { 
  fetchAudioById,
  createOpinion,
  deleteOpinion
} from './action.js';

class Audio extends Component {

  componentDidMount() {
    console.log(this.props);
    const temAudio = this.props.audio;
    const routerId = this.props.match.params.id;
    if (temAudio || temAudio._id === routerId) {
      this.props.fetchAudioById(routerId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
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
          <Opinion
            opinions={this.props.opinions}
            towardUser={this.props.audio._id}
            deleteOpinion={this.props.deleteOpinion}
            createOpinion={(o, r, t)=>this.props.createOpinion(this.props.audio._id, o, r, t)}
            user={this.props.user}
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
    createOpinion: (a, c,r,t) => {dispatch(createOpinion(a,c,r,t))},
    deleteOpinion: id => {dispatch(deleteOpinion(id))}
  })
)(Audio);