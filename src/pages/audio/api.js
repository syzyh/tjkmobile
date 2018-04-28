import axios from 'axios';

const audioUrl = '/serve/api/audio';
const opinionUrl = '/serve/api/opinion';

export const fetchAudioAPI = (id) => {
  return axios.get(audioUrl, {params: {id}});
};

export const fetchOpinionAPI = (id) => {
  return axios.get(opinionUrl, {params: {id}});
};

export const createOpinionAPI = (audio_id, content, opinion_id, toward_user) => {
  return axios.post(opinionUrl, {audio_id, content, opinion_id, toward_user});
};

export const deleteOpinionAPI = (opinion_id) => {
  console.log("delete opinion", opinion_id);
  return axios.delete(opinionUrl, {params: {opinion_id}});
}