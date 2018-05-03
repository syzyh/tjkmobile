import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TabBar } from 'antd-mobile';

import Home from '../pages/home/home';
import Feature from '../pages/featured/featured';
import UserRouter from '../pages/user/UserRouter';
import Message from '../pages/message/message'

import {signIn, signInByCode} from '../pages/user/action';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'featured',
      hidden: false,
    };
  }

  componentDidMount() {
    console.log('App:', this.props);
    const rawcode = this.props.location.search.split('code=')[1]
    if(!this.props.user.user && !!rawcode) {
      if (!!rawcode) {
        const code = rawcode.split("&")[0];
        console.log("code in url params:", code);
        this.props.signInByCode(code);
      } else {
        this.props.signIn();
      }
    }
    const selectedTab = this.props.match.params.tabName; 
    if (selectedTab) this.setState({selectedTab});
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.tabName !== this.props.match.params.tabName) {
      this.setState({selectedTab: this.props.match.params.tabName});
    }
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#86a697"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="发现"
          key="发现"
          icon={
            <i style={{fontSize: "0.52rem"}} className={"iconfont icon-faxian"}></i>
          }
          selectedIcon={<i style={{fontSize: "0.52rem"}} className={"iconfont icon-faxian1"}></i>
          }
          selected={this.state.selectedTab === 'featured'}
          onPress={() => {
            this.props.history.push("/tab/featured");
          }}
          data-seed="logId"
        >
          <Feature />
        </TabBar.Item>
        <TabBar.Item
          icon={
            <i className={"iconfont icon-dingyue1"}></i>
          }
          selectedIcon={<i className={"iconfont icon-dingyue"}></i>}
          title="我的订阅"
          key="我的订阅"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.props.history.push("/tab/home");
          }}
          data-seed="logId1"
        >
          <Home history={this.props.history} />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className={"iconfont icon-rengezhongxin"}></i>}
          selectedIcon={<i className={"iconfont icon-101"}></i>}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'user'}
          onPress={() => {
            this.props.history.push("/tab/user");;
          }}
        >
          <UserRouter {...this.props} />
        </TabBar.Item>
      </TabBar>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user }),
  dispatch => ({
    signIn: (name) => { dispatch(signIn(name)); },
    signInByCode: code => { dispatch(signInByCode(code)); }
  })
)(App);

        // <TabBar.Item
        //   icon={
        //     <i className={"iconfont icon-xiaoxi"}></i>
        //   }
        //   selectedIcon={<i className={"iconfont icon-xiaoxi1"}></i>}
        //   title="消息"
        //   key="消息"
        //   selected={this.state.selectedTab === 'message'}
        //   onPress={() => {
        //     this.props.history.push("/tab/message");
        //   }}
        // >
        //   <Message />
        // </TabBar.Item>