import axios from 'axios';

import {apiConfig} from '../config';
//const branchUrl = '/serve/api/branch';
const discussionUrl = apiConfig('/serve/api/discussion');
const opinionUrl = apiConfig('/serve/api/opinion');
const audioUrl = apiConfig('/serve/api/audio');
const departmentUrl = apiConfig('/serve/api/department');

export const fetchAllDiscussionsAPI = (branch_name) => {
  return axios.get(discussionUrl, {params: {branch_name}});
};

export const createDiscussionAPI = (discussion) => {
  return axios.post(discussionUrl, {discussion});
};

export const deleteDiscussionAPI = (discussion_id) => {
  return axios.delete(discussionUrl, {params: {discussion_id}});
};

export const createOpinionAPI = (discussion_id, content, opinion_id, toward_user) => {
  return axios.post(opinionUrl, {discussion_id, content, opinion_id, toward_user});
};

export const deleteOpinionAPI = (opinion_id) => {
  return axios.delete(opinionUrl, {params: {opinion_id}});
};

export const toggleFavoriteAPI = (opinion_id, user_id) => {
  return axios.put(opinionUrl + '/toggleFavorite', {opinion_id, user_id});
};

export const fetchAudiosAPI = (branch_name) => {
  return axios.get(audioUrl, {params: {branch_name}});
};

export const fetchDepartmentAPI = (branch_name) => {
  return axios.get(departmentUrl, {params: {branch_name}});
};