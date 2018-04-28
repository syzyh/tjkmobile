import React, { Component } from 'react';

import ArticleModel from './articelModel';

class ArticleList extends Component {
  state = {
    data: [
      {
        title: '标题：这是一个标题',
        introduce: '简介：这是一个简介'
      }, {
        title: '标题：这是一个标题2',
        introduce: '简介：这是一个简介'
      }
    ]
  }
  render() {
    return (
      <div>
        {this.state.data.map(d => (
          <ArticleModel key={d.title} data={d} history={this.props.history} />
        ))}
      </div>
    );
  }
}

export default ArticleList;