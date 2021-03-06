import axios from 'axios';

import {apiConfig} from '../config';
const userUrl = apiConfig('/serve/api/user');
const userSubscriptionUrl = apiConfig('/serve/api/user/subscription');
const discussionUrl = apiConfig('/serve/api/discussion');

axios.defaults.withCredentials = true;

export const signInByCodeAPI = code => {
  return axios.post(userUrl + '/signInByCode', { code });
};

export const signInAPI = (name) => {
  return axios.post(userUrl + '/signIn', { name });
};

export const signOutAPI = () => {
  return axios.post(userUrl + '/signOut', { });
};

export const updateUserAPI = (name, avatar, subscription, collection) => {
  return axios.put(userUrl, {name, avatar, subscription, collection});
};

export const subscribeDepartmentAPI = (user_id, department_id) => {
  return axios.post(userSubscriptionUrl, {user_id, department_id});
};

export const getMyDiscussionsAPI = (user_id) => {
  return axios.get(discussionUrl, {params: {user_id}});
};