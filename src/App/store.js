import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import { featuredReducer } from '../pages/featured/reducers';
import { userReducer } from '../pages/user/reducers';
import { branchReducer } from '../pages/branch/reducers';
import { audioReducer } from '../pages/audio/reducers';
import { discussionReducer } from '../pages/discussion/reducers';

const rootReducer = combineReducers({
  featured: featuredReducer,
  user: userReducer,
  branch: branchReducer,
  audio: audioReducer,
  discussion: discussionReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;