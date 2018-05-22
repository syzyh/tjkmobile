import {
  createDiscussionAPI,
  createOpinionAPI,
  deleteDiscussionAPI,
  deleteOpinionAPI,
  fetchAllDiscussionsAPI,
  toggleFavoriteAPI,
  fetchAudiosAPI,
  fetchDepartmentAPI,
} from './api';

import _ from 'lodash';

export const createDiscussion = (discussion) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_creating_discussion"});
    createDiscussionAPI(discussion).then(
      result => {
        console.log(result);
        if (result.data.error) {
          dispatch({ type: "creating_discussion_failure", error: result.data.error });
        } else {
          const discussions = [...getState().branch.discussions];
          discussions.unshift(result.data.discussion);
          dispatch({type: "creating_discussion_success", payload: discussions});

          const myDiscussions = [...getState().user.myDiscussions];
          myDiscussions.unshift(result.data.discussion);
          dispatch({type: "updating_myDiscussions_success", payload: myDiscussions});
        }
      },
      error => dispatch({ type: "creating_discussion_failure", error: '网络出错' })
    );
  };
};

export const createOpinion = (discussion_id, content, reply_id, toward_user) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_creating_opinion"});
      createOpinionAPI(discussion_id, content, reply_id, toward_user).then(
        result => {
          if (result.data.error) {
            dispatch({ type: "creating_opinion_failure", error: result.data.error });
          } else {
            const discussions = getState().branch.discussions;
            const newOpinion = {...result.data.opinion, user: getState().user};
            const newDiscussions = _.map(discussions, d => {
              if (d._id === discussion_id) {
                if (reply_id) {
                  const opinion = _.find(d.opinions, o => o._id === reply_id);
                  newOpinion.toward_user = toward_user;
                  opinion.replys.push(newOpinion)
                } else {
                  d.opinions.unshift(newOpinion);
                }
                return d;
              }
              return d;
            });
            dispatch({type: "creating_opinion_success", payload: newDiscussions });
          }
        },
        error => dispatch({ type: "creating_opinion_failure", error: '网络出错' })
      );
  };
};

export const deleteDiscussion = (discussion_id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_delete_discussion"});
    deleteDiscussionAPI(discussion_id).then(
      result => {
        console.log(result);
        if (!result.data.deleted) {
          dispatch({ type: "delete_discussion_failure", error: '创建失败' });
        } else {
          const discussions = getState().branch.discussions;
          const newDiscussions = _.filter(discussions, d => d.discussion_id !== discussion_id);
          dispatch({type: "delete_discussion_success", payload: newDiscussions});
        }
      },
      error => dispatch({ type: "delete_discussion_failure", error: '网络登录出错' })
    );
  };
};

export const deleteOpinion = (opinion_id, discussion_id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_delete_opinion"});
    deleteOpinionAPI(opinion_id).then(
      result => {
        if (!result.data.deleted) {
          dispatch({ type: "delete_opinion_failure", error: '创建失败' });
        } else {
          const discussions = getState().branch.discussions;
          const newDiscussions = _.map(discussions, d => {
            if (d.discussion_id === discussion_id) {
              d.opinions = _.filter(d.opinions, o => o.opinion_id !== opinion_id );
            }
            return d;
          });
          dispatch({type: "delete_opinion_success", payload: newDiscussions});
        }
      },
      error => dispatch({ type: "delete_opinion_failure", error: '网络登录出错' })
    );
  };
};

export const fetchAllDiscussions = (branch_name) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_fetching_discussions"});
    fetchAllDiscussionsAPI(branch_name).then(
      result => {
        dispatch({type: "fetching_discussions_success", payload: result.data});
      },
      error => dispatch({ type: "fetching_discussions_failure", error: '网络登录出错' })
    );
  };
};

export const fetchAudios = (branch_name) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_fetching_audios"});
    fetchAudiosAPI(branch_name).then(
      result => {
        console.log(result);
        dispatch({type: "fetching_audios_success", payload: result.data})
      },
      error => dispatch({ type: "fetching_audios_failure", error: '网络获取数据出错'})
    )
  }
}

export const fetchDepartment = (branch_name) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_fetching_department"});
    fetchDepartmentAPI(branch_name).then(
      result => {
        console.log("fetch department:", result);
        dispatch({type: "fetching_department_success", ...result.data})
      },
      error => dispatch({ type: "fetching_department_failure", error: '网络获取数据出错'})
    )
  }
}

export const toggleFavorite = (opinion_id, user_id, discussion_id) => {
  return (dispatch, getState) => {
    dispatch({ type: "start_toggle_opinion"});
    toggleFavoriteAPI(opinion_id, user_id).then(
      result => {
        console.log(result);
        if (result.data.updated) {
          const discussions = getState().branch.discussions;
          const newDiscussions = _.map(discussions, d => {
            if (d.discussion_id === discussion_id) {
              d.opinions = result.data.opinion;
            }
            return d;
          });
          dispatch({type: "toggle_opinion_success", payload: newDiscussions});
        } else {
          dispatch({ type: "toggle_opinion_failure", error: '网络登录出错' })
        }
      },
      error => dispatch({ type: "toggle_opinion_failure", error: '网络登录出错' })
    );
  };
}