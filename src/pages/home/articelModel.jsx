import React, { Component } from 'react';

import { List } from 'antd-mobile';
// import * as history from 'history';

const Item = List.Item;

class ArticleModel extends Component {
  render() {
    return (
      <div>
      <List renderHeader={() => ''} className="my-list">
        <Item wrap onClick={() => {this.props.history.push('/article')}}>
          <div>
          <p>{this.props.data.title}</p>
          <img style={{width: '100%', height: 'auto'}} src="https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png" alt="pic" />
          <p style={{color: '#888888', fontSize: '0.3rem'}}>{this.props.data.introduce}</p>
          </div>
        </Item>
      </List>
      </div>
    );
  }
}

export default ArticleModel;