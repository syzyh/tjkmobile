import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavBar } from 'antd-mobile';
import Forum from '../branch/forum';

import { fetchMyDiscussions } from './action.js';
import { setDiscussion } from '../discussion/action.js';

class MyDiscussions extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount() {
    this.props.fetchMyDiscussions(this.props.match.params.userId);
  }
  render() {
    return (
      <div>
        <NavBar
          leftContent="返回"
          onLeftClick={()=>this.props.history.goBack()}
        >我的发帖</NavBar>
        <Forum
          slicedHeight={0.9+0.87+1}
          discussions={this.props.user.myDiscussions}
          setDiscussion={this.props.setDiscussion}
         />
      </div>
    );
  }
}

export default connect(
  state => {
    return { user: state.user };
  },
  dispatch => ({
    fetchMyDiscussions: (id) => {dispatch(fetchMyDiscussions(id))},
    setDiscussion: a => {dispatch(setDiscussion(a))}
  })
)(MyDiscussions);