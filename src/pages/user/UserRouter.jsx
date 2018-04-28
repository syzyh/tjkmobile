import React, { Component } from 'react';

import { Route } from 'react-router-dom'

import User from "./user";
import Person from "./Person";
import MyDiscussions from './MyDiscussions';
import MySubscribe from './MySubscribe';

class UserRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.url} component={User} />
        <Route path={`${this.props.match.url}/person`} component={Person} />
        <Route path={`${this.props.match.url}/myDiscussions/:userId`} component={MyDiscussions} />
        <Route path={`${this.props.match.url}/mySubscribe`} component={MySubscribe} />
      </div>
    );
  }
}

export default UserRouter;