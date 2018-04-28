import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import App from './App.js';
import Audio from '../pages/audio/audio';
import Discussion from '../pages/discussion/Discussion';
import BranchRouter from '../pages/branch/Router';

class AppRouters extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/audio/:id' component={Audio} />
          <Route path='/discussion/:id' component={Discussion} />
          <Route path='/branch/:name' component={BranchRouter} />
          <Route path='/tab/:tabName' component={App} />
          <Route exact path='/' component={App} />
        </div>
      </Router>
    );
  }
}

export default AppRouters;