import React, { Component } from 'react';

import { NavBar } from 'antd-mobile';
import { navBar, navScroll, navBarAll, navFooter } from './util.css';

class NavBarP extends Component { 

  render() {
    return (
      <div className={navBarAll}>
        <div className={navBar}>
          <NavBar {...this.props} >{this.props.title}</NavBar>
        </div>
        <div className={navScroll} >
          {this.props.children}
        </div>
        <div className={navFooter}>
          {this.props.footer}
        </div>
      </div>
    );
  }
}

export default NavBarP;