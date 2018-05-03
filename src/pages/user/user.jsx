import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavBar, List, InputItem } from 'antd-mobile';

import style from './user.css';

import { signIn, signOut } from './action.js';

const Item = List.Item;

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
    };
  } 

  handleName = (value) => {
    this.setState({inputName: value});
  }

  render() {
    console.log("user props in userjsx:", this.props);
    const user = this.props.user;
    if (user && this.props.hasLogin) {
      const myDiscussionsUrl = this.props.match.url + "/myDiscussions/"+ user._id;
      const mySubscribeUrl = this.props.match.url + "/mySubscribe";
      return (
      <div>
        <NavBar>我</NavBar>
        <List className="my-list" renderHeader={null}>
          <Item
            thumb={user.avatarUrl}
            multipleLine
            className={style['large_thumb']}
          >
            <div style={{fontSize: "0.44rem", height: "0.6rem"}}>{user.userName}</div>
          </Item>
        </List>
        
        <List renderHeader={() => ''}>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={()=>this.props.history.push(myDiscussionsUrl)}
          >
            我的发帖
          </Item>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            arrow="horizontal"
            onClick={()=>this.props.history.push(mySubscribeUrl)}
          >我的订阅</Item>
        </List>

        <List renderHeader={() => ''}>
          <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal" onClick={()=>{}}>设置</Item>
        </List>

        <List renderHeader={() => ''}>
          <Item 
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            arrow="horizontal"
            onClick={() => {this.props.signOut();}}
          >退出账号</Item>
        </List>
      </div>
    );
    } else {
      return (
      <div>
        <NavBar>我</NavBar>
        <div style={{textAlign: 'center'}}>尚未登录</div>
      </div>
    );
    }
  }
}

export default connect(
  state => {
    return { ...state.user };
  },
  dispatch => ({
    signIn: (name) => { dispatch(signIn(name)); },
    signOut: () => { dispatch(signOut());},
  })
)(UserSetting);
        // <List>
        //   <InputItem
        //     clear
        //     placeholder="输入名称"
        //     value={this.state.inputName}
        //     onChange={this.handleName}
        //   >名称</InputItem>
        //   <List.Item>
        //     <div
        //       style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
        //       onClick={() => {
        //         this.props.signIn(this.state.inputName);
        //       }}
        //     >
        //       登录
        //     </div>
        //   </List.Item>
        // </List>