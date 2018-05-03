import axios from 'axios';

import {apiConfig} from '../config';
const opinionUrl = apiConfig('/serve/api/opinion');
const discussionUrl = apiConfig('/serve/api/discussion');

export const fetchDiscussionAPI = (id) => {
  return axios.get(discussionUrl, {params: {id}});
};

export const deleteDiscussionAPI = (discussion_id) => {
  return axios.delete(discussionUrl, {params: {discussion_id}});
};

export const createOpinionAPI = (discussion_id, content, opinion_id, toward_user) => {
  return axios.post(opinionUrl, {discussion_id, content, opinion_id, toward_user});
};

export const deleteOpinionAPI = (opinion_id) => {
  console.log("delete opinion", opinion_id);
  return axios.delete(opinionUrl, {params: {opinion_id}});
}
