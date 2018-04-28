import React, { Component } from 'react';

import Reply from './reply';
import style from './branch.css';

class Opinions extends Component {
  render() {
    const {opinions} = this.props;
    return (
      <div>
        <div className={style['opinion-split-line']}>
          <div className={style['opinion-show-words']}>全部回复</div>
          <div className={style['opinion-line']}></div>
        </div>
        {
          opinions.length === 0 ?
          <div>尚无回复</div> :
          opinions.map((o, index) => (
            <div key={index}>
              <div className={style['forum-header']}>
                <img className={style['forum-avatar']} alt="头像" src={o.user.avatarUrl} />
                <div className={style['forum-words']}>
                  <div className={style['forum-name']}>{o.user.userName}</div>
                  <div className={style['forum-time']}>{o.date.slice(0, 10) + " " + o.date.slice(11, 19)}</div>
                </div>
                <div className={style['forum-number']}>
                  <span className={style['opinion-number']}>{index + 1}楼</span>
                </div>
              </div>
              <div className={style['opinion-content']} onClick={this.props.opinionReply(o._id)}>
                <span className={style['opinion-content-words']}>{o.content}</span>
              </div>
              <Reply data={o.replys} opinionId={o._id} reply={this.props.opinionReply}/>
              <div className={style['opinion-line']}></div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Opinions;