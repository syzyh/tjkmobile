import {
  fetchDiscussionAPI,
  createOpinionAPI,
  deleteDiscussionAPI,
  deleteOpinionAPI,
} from './api';

import _ from 'lodash';

export const fetchDiscussionById = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_fetching_discussion"});
    fetchDiscussionAPI(id).then(
      result => {
        console.log("fetch discussion result:", result);
        dispatch({type: "fetching_discussion_success", payload: result.data})
      },
      error => dispatch({ type: "fetching_discussion_failure", error: '网络获取数据出错'})
    )
  }
};

export const setDiscussion = (discussion) => {
  return (dispatch, getState) => {
    dispatch({type: "fetching_discussion_success", payload: discussion});
  }
};

export const createOpinion = (content, reply_id, toward_user) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_discussion"});
    const d = getState().discussion.discussion;
    let towardUser = toward_user;
    if (!toward_user) {
      towardUser = d.user._id;
    }
    createOpinionAPI(d._id, content, reply_id, towardUser).then(
      result => {
        console.log("result", result);
        if (result.data.error) {
          dispatch({ type: "updating_discussion_failure", error: result.data.error });
        } else {
          console.log("create opinion result", result.data);
          const newDiscussion = {...d, opinions: result.data};
          dispatch({type: "updating_discussion_success", payload: newDiscussion });
        }
      },
      error => dispatch({ type: "updating_discussion_failure", error: '网络出错' })
    );
  };
};

export const deleteDiscussion = (discussion_id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_discussion"});
    deleteDiscussionAPI(discussion_id).then(
      result => {
        console.log(result);
        if (!result.data.deleted) {
          dispatch({ type: "updating_discussion_failure", error: '删除失败' });
        } else {
          const discussions = getState().branch.discussions;
          const newDiscussions = _.filter(discussions, d => d.discussion_id !== discussion_id);
          dispatch({type: "delete_discussion_success", payload: newDiscussions});
          dispatch({type: "updating_discussion_success", payload: null });
        }
      },
      error => dispatch({ type: "updating_discussion_failure", error: '网络登录出错' })
    );
  };
};

export const deleteOpinion = (opinion_id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_discussion"});
    deleteOpinionAPI(opinion_id).then(
      result => {
        console.log(result);
        if (!result.data.deleted) {
          dispatch({ type: "updating_discussion_failure", error: '删除失败' });
        } else {
          const discussion = getState().discussion.discussion;
          const newOpinions = _.map(discussion.opinions, o => {
            const newReplys = _.filter(o.replys, r => r._id !== opinion_id );
            o.replys = newReplys;
            return o;
          }).filter(o => o._id !== opinion_id);
          const newDiscussion = {...discussion, opinions: newOpinions};
          dispatch({type: "updating_discussion_success", payload: newDiscussion });
        }
      },
      error => dispatch({ type: "updating_discussion_failure", error: '网络登录出错' })
    );
  };
};