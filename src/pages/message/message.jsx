import React, { Component } from 'react';
import { List,NavBar } from 'antd-mobile';

import style from './message.css';

const Item = List.Item;

class SearchPage extends Component {
  render() {
    return (
      <div>
        <NavBar>消息</NavBar>
        <List>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {}}
            className={style['message-listItem']}
          >评论</Item>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={() => {}}
            arrow="horizontal"
            className={style['message-listItem']}
          >
            通知
          </Item>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={() => {}}
            arrow="horizontal"
            className={style['message-listItem']}
          >
            客服
          </Item>
        </List>
      </div>
    );
  }
}

export default SearchPage;