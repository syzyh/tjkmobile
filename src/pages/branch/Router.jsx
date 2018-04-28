import React, { Component } from 'react';

import { Route } from 'react-router-dom'

import Branch from "./branch";
import CreateDiscussion from "./create";
import Discussion from '../discussion/Discussion';
import Audio from './audio';

class BranchRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.url} component={Branch} />
        <Route path={`${this.props.match.url}/create`} component={CreateDiscussion} />
        <Route path={`${this.props.match.url}/discussion/:id`} component={Discussion} />
        <Route path={`${this.props.match.url}/audio/:id`} component={Audio} />
      </div>
    );
  }
}

export default BranchRouter;