import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBarP from '../../util/NavBarP';
import { SwipeAction, List } from 'antd-mobile';
import { Link } from 'react-router-dom';

import style from './user.css';
import { subscribeDepartment } from './action.js';

class MySubscribe extends Component {
  render() {
    if (!this.props.user) return <div>尚未登录</div>;
    return (
      <NavBarP
        title="我的订阅"
        leftContent="返回"
        onLeftClick={()=>this.props.history.goBack()}
      >
      {
        this.props.user.subscriptionList.length === 0 ?
        (<div>尚未有订阅的栏目</div>) :
        (
        <List>
        {
          this.props.user.subscriptionList.map(d => (
            <div key={d._id}>
            <SwipeAction
              key={d._id}
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '取消',
                  onPress: () => console.log('cancel'),
                  style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                  text: '退订',
                  onPress: () => this.props.subscribeDepartment(this.props.user._id, d._id),
                  style: { backgroundColor: '#F4333C', color: 'white' },
                },
              ]}
            >
              <List.Item
                extra="编辑"
                thumb={d.department_imgUrl}
                key={d._id}
                multipleLine
                className={style['large_thumb']}
                arrow="horizontal"
                onClick={()=>this.props.history.push('/branch/' + d.department_urlName)}
              >
                {d.department_name}
              </List.Item>
            </SwipeAction>
            </div>
          ))
        }
        </List>
        )
      }
      </NavBarP>
    );
  }
}

export default connect(
  state => {
    return { user: state.user.user };
  },
  dispatch => ({
    subscribeDepartment: (user_id, department_id) => {dispatch(subscribeDepartment(user_id, department_id))},
  })
)(MySubscribe);