import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs } from 'antd-mobile';

import Forum from '../branch/forum';
import Audios from '../branch/audios';

import { setDiscussion } from '../discussion/action.js';


class HomeList extends Component {
  render() {
    const tabs = [
      { title: '论坛' },
      { title: '音频' },
      { title: '视频' },
    ];

    const user = this.props.user;
    return (
      <div>
      { user && user.subscriptionList.length > 0 ? (
        <Tabs tabs={tabs} initialPage={0} swipeable={false} onChange={this.onTabsChange} >
            <div style={{ overflow: 'scroll' }}>
              <Forum 
                slicedHeight={0.9 + 0.87 + 1}
                setDiscussion={this.props.setDiscussion}
                discussions={user.subscriptionDiscussions}
              />
            </div>
            <div style={{ backgroundColor: '#f5f5f9' }}>
              <Audios type="audio" setAudio={this.props.setAudio} audios={user.subscriptionAudios}/>
            </div>
            <div style={{ backgroundColor: '#f5f5f9' }}>
              <Audios type="video" setAudio={this.props.setAudio} audios={user.subscriptionAudios}/>
            </div>
        </Tabs>
        ) : null
      }
      </div>
    );
  }
}

export default connect(
  state => {
    return { ...state.user };
  },
  dispatch => ({
    setDiscussion: a => {dispatch(setDiscussion(a))},
  })
)(HomeList);