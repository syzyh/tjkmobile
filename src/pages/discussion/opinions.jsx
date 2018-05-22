import React, { Component } from 'react';
import {Modal} from 'antd-mobile';
import moment from 'moment';

import Reply from './reply';
import dStyle from './discussion.css';
import style from './opinions.css';

const alert = Modal.alert;
//deleteOpinion, opinions, createOpinion,user
class Opinions extends Component {
  deleteOpinionAlert = id => {
    console.log(id);
    const {deleteOpinion} = this.props;
    alert('删除评论', '确定要删除评论吗？',[
      {text: '取消'},
      {text: '删除', onPress: ()=> deleteOpinion(id)}
    ])
  }

  render() {
    const {opinions} = this.props;
    return (
      <div>
        <div className={style['opinion-split-line']}></div>
        <div className={style['opinion-show-words']}>全部回复</div>
        {
          opinions.length === 0 ?
          <div className={style['opinion-show-null']}>尚无回复</div> :
          opinions.map((o, index) => (
            <div key={index}>
              <div className={style['opinion-line']}></div>
              <div className={style['opinion-all']}>
                <div className={style['opinion-avatar']}>
                  <img alt="头像" src={o.user.avatarUrl} />
                </div>
                <div className={style['opinion-rightpart']}>
                  <div className={dStyle['discussion-username']}>{o.user.userName}</div>
                  <div className={style['opinion-content']} onClick={() => {this.props.createOpinion(o._id, o.user._id)}}>
                    {o.content}
                  </div>
                  <div className={style['opinion-footer']}>
                    <span className={dStyle['discussion-time']}>{moment(o.date).fromNow()}</span>
                    { 
                      !!this.props.user && (o.user._id === this.props.user._id || this.props.user.role === 'admin') ? 
                      <span className={style['opinion-delete']} onClick={()=>this.deleteOpinionAlert(o._id)}>删除</span> : 
                      null
                    }
                    <div className={style['opinion-footer-number']}>
                      <i className={"iconfont icon-xiaoxi1"}></i>
                      <span>{' ' + o.replys.length}</span>
                    </div>
                  </div>
                  <Reply data={o.replys} opinionUser={o.user._id} reply={u => this.props.createOpinion(o._id,u)} deleteReply={this.deleteOpinionAlert} user={this.props.user}/>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Opinions;