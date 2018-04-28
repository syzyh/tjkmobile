import React, { Component } from 'react';

import { NavBar } from 'antd-mobile';
import HomeList from './homeList';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar>订阅</NavBar>
        <HomeList />
      </div>
    );
  }
}

export default Home;