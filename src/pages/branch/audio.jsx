import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAudios } from './action.js';
import _ from 'lodash';

import style from './branch.css';

import ReactPlayer from 'react-player'

import NavPage from '../../util/NavPage';
import NavBarP from '../../util/NavBarP';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
    }
  }
  

  componentDidMount() {
    if (this.props.audios.length === 0) {
      this.props.fetchAudios(this.props.match.url.split('/')[2]);
    } else {
      const audio = _.find(this.props.audios, d => d._id === this.props.match.url.split('/audio/')[1]);
      this.setState({audio});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.audios.length > 0 && this.state.audio === null) {
      const audio = _.find(this.props.audios, d => d._id === this.props.match.url.split('/audio/')[1]);
      this.setState({audio});
    }
  }
  

  render() {
    return (
      <NavPage>
        <NavBarP 
          title="听课堂"
          leftContent="返回"
          onLeftClick={()=>this.props.history.goBack()}
        >
        {
          this.state.audio ?
          <div className={style["page-margin"]}>
            <div className={style["audio-title"]}>{this.state.audio.audio_name}</div>
            <div>{this.state.audio.created_date.split("T")[0]}</div>
            <div className={style["audio-description"]}>{this.state.audio.audio_description}</div>
            {
              this.state.audio.type === "audio" ?
              <div>
                <div className={style["audio-button-img"]}>
                  <img alt="audio images" src={this.state.audio.audio_imgUrl} />
                </div>
                <ReactPlayer style={{margin: "auto"}} height="80px" controls url={this.state.audio.audio_url} />
              </div> :
              <div>
                <ReactPlayer style={{margin: "auto"}} controls url="http://localhost:4000/public/uploads/e568b6c7-98e1-4840-af11-18448043cdea.mp4" />
              </div>
            }
          </div> :
          <div>加载中</div>
        }
        </NavBarP>
      </NavPage>
    );
  }
}

export default connect(
  state => {
    return { ...state.branch };
  },
  dispatch => ({
    fetchAudios: (n) => {dispatch(fetchAudios(n))}
  })
)(Audio);