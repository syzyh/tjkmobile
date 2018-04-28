import React, { Component } from 'react';

import { navPage } from './util.css';

class NavPage extends Component {
  render() {
    return (
      <div className={navPage}>
        {this.props.children}
      </div>
    );
  }
}

export default NavPage;