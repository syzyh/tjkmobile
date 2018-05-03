import {
  fetchAudioAPI,
  createOpinionAPI,
  deleteOpinionAPI,
} from './api';

import _ from 'lodash';

export const fetchAudioById = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_fetching_audio"});
    fetchAudioAPI(id).then(
      result => {
        console.log("fetch audio result:", result);
        dispatch({type: "fetching_audio_success", ...result.data})
      },
      error => dispatch({ type: "fetching_audio_failure", error: '网络获取数据出错'})
    )
  }
};

export const createOpinion = (content, reply_id, toward_user) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_create_audioOpinion"});
    const a = getState().audio.audio;
    createOpinionAPI(a._id, content, reply_id, toward_user).then(
      result => {
        console.log("result", result);
        if (result.data.error) {
          dispatch({ type: "create_audioOpinion_failure", error: result.data.error });
        } else {
          console.log("create opinion result", result.data);
          dispatch({type: "create_audioOpinion_success", payload: result.data });
        }
      },
      error => dispatch({ type: "create_audioOpinion_failure", error: '网络出错' })
    );
  };
};


export const deleteOpinion = (opinion_id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_delete_audioOpinion"});
    deleteOpinionAPI(opinion_id).then(
      result => {
        console.log(result);
        if (!result.data.deleted) {
          dispatch({ type: "delete_audioOpinion_failure", error: '删除失败' });
        } else {
          const opinions = getState().audio.opinions;
          const newOpinions = _.map(opinions, o => {
            const newReplys = _.filter(o.replys, r => r._id !== opinion_id );
            o.replys = newReplys;
            return o;
          }).filter(o => o._id !== opinion_id);
          dispatch({type: "delete_audioOpinion_success", payload: newOpinions });
        }
      },
      error => dispatch({ type: "delete_audioOpinion_failure", error: '网络登录出错' })
    );
  };
};
//export const createAudioOpinon = (content)
