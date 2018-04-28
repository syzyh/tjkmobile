import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavBar, List, Modal } from 'antd-mobile';

const Item = List.Item;
const prompt = Modal.prompt;

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
    };
  }
  
  componentDidMount() {
    
  }
  

  handleName = (value) => {
    this.setState({inputName: value});
  }

  render() {
    console.log("user props in userjsx:", this.props);
    const user = this.props.user;
    if (user) {
    return (
      <div>
        <NavBar
          leftContent="返回"
          onLeftClick={()=>this.props.history.goBack()}
        >编辑资料</NavBar>
        <List renderHeader={() => ''}>
          <Item
            arrow="horizontal"
            extra={<img src={user.avatarUrl} alt="extra avatar" />}
            onClick={()=>{}}
          >
            头像
          </Item>
          <Item arrow="horizontal" extra={user.userName} onClick={()=>prompt('昵称', '请输入新名称',
            [
              {
                text: '关闭',
                onPress: value => {}
              },
              {
                text: '确定',
                onPress: value => {}
              }
            ],'default', null, [user.userName]
          )}>昵称</Item>
          <Item arrow="horizontal">性别</Item>
          <Item arrow="horizontal">邮箱</Item>
        </List>
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
    
  })
)(Person);