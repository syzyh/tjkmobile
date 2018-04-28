import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import {Button} from 'antd-mobile';
import moment from 'moment';

import style from './audio.css';

class AudioComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      played:0,
      playingVideo: false,
    };
  }

  componentDidMount() {
    this.setState({playingVideo: true});
  }

  render() {
    return (
      <div>
         {
          this.props.audio ?
          <div>
            <div className={style["audio-title"]}>{this.props.audio.audio_name}</div>
            <div className={style["audio-time"]}>{moment(this.props.audio.created_date).fromNow()}</div>
            <div className={style["audio-description"]}>{this.props.audio.audio_description}</div>
            {
              this.props.audio.type === "audio" ?
              <div>
                <div className={style["audio-button-img"]}>
                  <img alt="audio images" src={this.props.audio.audio_imgUrl} />
                </div>
                <div className={style["audio-slide-div"]}>
                  <div className={style["audio-slide-line"]}></div>
                  <div className={style["audio-slide-loadedline"]} style={{width: this.state.played * 100 + '%'}}></div>
                  <div className={style["audio-slide-botton"]} style={{left: this.state.played * 100 + '%'}} ></div>
                </div>
                <div className={style["audio-button-div"]}>
                  <Button 
                    onClick={()=>this.setState({playing: !this.state.playing})}
                    type="primary"
                    inline
                    className={style["audio-player-bottom"]}
                  >
                    {
                      !this.state.playing ?
                      <i className={"iconfont icon-bofang2"} style={{fontSize: '0.47rem', left: '0.04rem'}}></i> :
                      <i className={"iconfont icon-zanting"} style={{fontSize: '0.5rem'}}></i>
                    }
                  </Button>
                </div>
                <ReactPlayer
                  progressInterval={100}
                  height={0}
                  playing={this.state.playing}
                  onProgress={data => this.setState({played: data.played})}
                  ref={el => this.audioPlayer = el}
                  style={{margin: "auto"}}
                  url={this.props.audio.audio_url}
                />
              </div> :
              <div>
                <ReactPlayer
                  playing={this.state.playingVideo}
                  style={{margin: "auto"}}
                  controls
                  url={this.props.audio.audio_url}
                />
              </div>
            }
          </div> :
          <div>加载中</div>
        }
      </div>
    );
  }
}

export default AudioComponent;