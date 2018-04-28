import React, { Component } from 'react';
import style from './reply.css';

import moment from 'moment';

//props: data, reply,deleteReply,user
class Reply extends Component {
  render() {
    if (!this.props.data || this.props.data.length === 0) return null;
    return (
      <div className={style['reply']}>
        <div className={style['reply-arrow']}></div>
        <div className={style['reply-contents']}>
          {this.props.data.map(r => (
            <div key={r._id} className={style['reply-item']}>
              <span onClick={()=>this.props.reply(r.user._id)}>
                <span className={style['username']}>{r.user.userName}</span>
                {
                  r.toward_user && r.toward_user._id !== this.props.opinionUser?
                  <span>
                    <span className={style['opinion-content-words']}> 回复 </span>
                    <span className={style['toward-username']}>{r.toward_user.userName}</span>
                  </span> :
                  null
                }
                <span className={style['opinion-content-words']}>: {r.content}</span>
                <span className={style['reply-time']}>{moment(r.date).fromNow()}</span>
              </span>
              { 
                !!this.props.user && r.user._id === this.props.user._id ?
                <span className={style['reply-delete']} onClick={()=>this.props.deleteReply(r._id)}>删除</span> :
                null
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Reply;