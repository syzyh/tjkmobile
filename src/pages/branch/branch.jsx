import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Icon, Tabs, Button} from 'antd-mobile';
import style from './branch.css';

import NavPage from '../../util/NavPage';
import Forum from './forum';
import Audios from './audios';

import {Link} from 'react-router-dom';
import _ from 'lodash';

import { fetchDepartment } from './action.js';
import { subscribeDepartment } from '../user/action.js';
import { setDiscussion } from '../discussion/action.js';

class Branch extends Component {
  constructor(props, context) {
    super(props, context);
    const imgHeight = window.document.body.clientWidth * 9 / 22;
    const remImgHeight = imgHeight / Number.parseInt(getComputedStyle(document.documentElement)['font-size'].split('px')[0], 10);
    //const listHeight = (window.screen.height / window.screen.width * window.document.body.clientWidth   - 87 - imgHeight) + 'px';
    this.state = {
      floatButton: 'block',
      remImgHeight,
      //remListHeight,
    };
  }

  componentDidMount() {
    this.props.fetchDepartment(this.props.match.url.split('branch/')[1]);
  }

  onTabsChange = (tab, index) => {
    if (index === 0) {
      this.setState({floatButton: 'block'});
    } else {
      this.setState({floatButton: 'none'});
    }
  };

  onCreateDiscussion = () => {
    console.log("test");
  }

  render() {
    const tabs = [
      { title: '论坛' },
      { title: '音频' },
      { title: '视频' },
    ];
    console.log(this.props);
    return (
      <NavPage>
      {
        this.props.history.length > 0 ?
        (<Link to={this.props.match.url.split('/branch')[0]} className={style['back-link']}>
          <div className={style["back-icon"]}>
            <Icon type="left" style={{color: '#000'}} />
          </div> 
        </Link>) :
        null
      }
      { this.props.department ? (
        <div>
        <div style={{position: "relative"}}>
          <img style={{height: this.state.remImgHeight + 'rem'}} className={style["branch-img"]} src={this.props.department.department_imgUrl2} alt="" />
          <div className={style["branch-description"]}>
            <div className={style["branch-name"]}>{this.props.department.department_name}</div>
            {
              _.findIndex(this.props.subscriptionList, s => s._id === this.props.department._id) < 0 ?
               <Button size="small" className={style["branch-subscribe-button"]} type="primary" onClick={() => {this.props.subscribeDepartment(this.props._id, this.props.department._id);}}>订阅</Button> :
                <Button size="small" className={style["branch-subscribe-button"]} type="primary" onClick={() => {this.props.subscribeDepartment(this.props._id, this.props.department._id);}}>取消订阅</Button>
            }
          </div>
        </div>
        <Tabs tabs={tabs} initialPage={0} swipeable={false} onChange={this.onTabsChange} >
            <div style={{ height: this.state.listHeight, overflow: 'scroll' }}>
              <Forum slicedHeight={ 0.87 + this.state.remImgHeight } setDiscussion={this.props.setDiscussion} discussions={this.props.discussions}/>
            </div>
            <div style={{ backgroundColor: '#f5f5f9' }}>
              <Audios type="audio" audios={this.props.audios} />
            </div>
            <div style={{ backgroundColor: '#f5f5f9' }}>
              <Audios type="video" audios={this.props.audios} />
            </div>
        </Tabs>
        <Link to={`${this.props.match.url}/create`} >
          <div className={style["edit-button"]} style={{display: this.state.floatButton}} onClick={this.onCreateDiscussion} >
            <i className={"iconfont icon-write"} style={{fontSize: '0.6rem'}}></i>
          </div>
        </Link>
        </div>
        ) : null
      }

      </NavPage>
    );
  }
}

export default connect(
  state => {
    return { ...state.user.user, ...state.branch };
  },
  dispatch => ({
    fetchDepartment: n => {dispatch(fetchDepartment(n))},
    subscribeDepartment: (user_id, department) => {dispatch(subscribeDepartment(user_id, department))},
    setDiscussion: a => {dispatch(setDiscussion(a))},
  })
)(Branch);