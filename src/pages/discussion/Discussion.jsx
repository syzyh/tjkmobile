import React, { Component } from 'react';
import { connect } from 'react-redux';

//import Opinion from './Opinion';
import Opinions from './opinions';
import CreateOpinion from './CreateOpinion';
import { Toast, Modal } from 'antd-mobile';

import NavBarP from '../../util/NavBarP';
import NavPage from '../../util/NavPage';

import moment from 'moment';

import style from './discussion.css';

import {
  fetchDiscussionById,
  createOpinion,
  deleteDiscussion,
  deleteOpinion,
} from './action.js';

const alert = Modal.alert;

const Words = (props) => {
  return (
    <div>
      {props.content.split('\n').map((a, index) => (<div key={index} className={style['discussion-words']}>{a}</div>))}
    </div>
  )
}
class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletingDiscussion: false,
      creating: false,
      reply_id: null,
      toward_user: null,
    }
  }

  componentDidMount() {
    const d = this.props.discussion.discussion
    if (!d || d._id !== this.props.match.params.id ) {
      this.props.fetchDiscussionById(this.props.match.params.id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.deletingDiscussion) {
      Toast.loading("正在删除", 0);
      if (nextProps.discussion.error) {
        Toast.hide();
        Toast.fail("删除失败", 1);
        this.setState({deletingDiscussion: false});
      } else {
        if (nextProps.discussion.discussion === null) {
          Toast.hide();
          Toast.success("删除成功", 1);
          this.setState({deletingDiscussion: false});
          this.props.history.goBack();
        }
      }
    }
  }

  createOpinionModal = (r, t) => {
    this.setState({creating: !this.state.creating, reply_id:r, toward_user:t});
  }

  createReply = content => {
    this.props.createOpinion(content, this.state.reply_id, this.state.toward_user);
  }
  
  render() {
    const d = this.props.discussion.discussion;

    return (
      <NavPage>
        <NavBarP
          title="阅读帖子"
          leftContent="返回"
          onLeftClick={()=>this.props.history.goBack()}
          footer={
            <div className={style['opinion-submit']}>
              <div className={style['opinion-submit-input']} onClick={()=>this.createOpinionModal()}>
                发表评论
              </div>
            </div>
          }
          rightContent={
            !!d && !!this.props.user && (this.props.user._id === d.user._id) ? 
            (
              <div
                key="delete"
                className={style["discussion-edit-icon"]}
                onClick={
                  () => alert('删除', '确定要删除帖子？', [
                    {text: '取消'},
                    {text: '删除', onPress: () => {
                      this.props.deleteDiscussion(d._id);
                      this.setState({deletingDiscussion: true});
                      }
                    }
                  ]) 
                }
              >
                <i className={"iconfont icon-shanchu"}></i>
              </div>
            ): 
            null
          }
        >
          {d === null ? 
          <div>加载中</div> :
          <div className={style['discussion-page']}>
            <div className={style['discussion-header']}>
              <img className={style['discussion-avatar']} alt="头像" src={d.user.avatarUrl} />
              <div className={style['discussion-avatarwords']}>
                <div className={style['discussion-username']}>{d.user.userName}</div>
                <div className={style['discussion-time']}>{moment(d.modified_date).fromNow()}</div>
              </div>
            </div>
            <div className={style['discussion-title']}>{d.title}</div>
            {d.content.map((c,index) => (
              <div key={index} className={style['discussion-content']}>
                {
                  c.startsWith('!$[') ? 
                  <img alt="discussion images" className={style['discussion-img']} src={c.split('!$[')[1]} /> :
                  <Words content={c} />
                }
              </div>
            ))}
            <Opinions
              opinions={d.opinions}
              user={this.props.user}
              createOpinion={this.createOpinionModal}
              deleteOpinion={this.props.deleteOpinion}
            />
            <CreateOpinion
              creating={this.state.creating}
              getOpinion={c => this.createReply(c)}
            />
            <div className={style['opinion-submit-position']}></div>
          </div>
          }
        </NavBarP>
      </NavPage>
    );
  }
}

export default connect(
  state => {
    return { discussion: state.discussion, user: state.user.user };
  },
  dispatch => ({
    fetchDiscussionById: (id) => {dispatch(fetchDiscussionById(id))},
    deleteDiscussion: (id) => {dispatch(deleteDiscussion(id))},
    deleteOpinion: id => {dispatch(deleteOpinion(id))},
    createOpinion: (c, r, tu) => { dispatch(createOpinion(c, r, tu)); },
  })
)(Discussion);