import React from 'react';
import ReactDOM from 'react-dom';
import AppRouters from './Router.jsx';

import { Provider } from 'react-redux';
import appStore from './store';

import moment from 'moment';
import 'moment/locale/zh-cn' 

//import registerServiceWorker from './registerServiceWorker';
import './index.css';

moment.locale('zh-cn');
ReactDOM.render( 
  <Provider store={appStore}>
    <AppRouters />
  </Provider>,
  document.getElementById('root')
);
//registerServiceWorker();
