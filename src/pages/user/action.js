import {
  signInAPI,
  signOutAPI,
  subscribeDepartmentAPI,
  //updateUserAPI,
  getMyDiscussionsAPI,
  signInByCodeAPI,
} from './api';

export const signInByCode = code => {
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_user"});
    signInByCodeAPI(code).then(
      result => {
        if(result.data.failure) {
          dispatch({ type: "updating_user_failure", error: 'sign in error' });
        } else {
          dispatch({type: "updating_user_success", payload: result.data});
        }
      },
      error => {
        dispatch({ type: "updating_user_failure", error: 'sign in error' });
      }
    );
  }
};
// export const signInByCode = code => {
//   return (dispatch, getState) => {
//     dispatch({ type: "start_updating_user"});
//     console.log("start code:", code);
//     getTokenAPI(code).then(
//       result => {
//         console.log("token get by code:", result);
//         const {access_token, openid} = result.data;
//         signInByOpenidAPI(openid).then(
//           result => {
//             console.log("sign in result:", result.data);
//             if (result.data.fail) {
//               dispatch({ type: "updating_user_failure", error: 'sign in error' });
//             }
//             else if (result.data.noUser) {
//               getUserInfoByTokenAPI(access_token, openid).then(
//                 result => {
//                   console.log("user info:", result.data);
//                   signUpByUserInfoAPI(result.openid, result.nickname, result.headimgurl).then(
//                     result => {
//                       console.log("sign up result:", result.data);
//                       dispatch({type: "updating_user_success", payload: result.data});
//                     },
//                     error => {
//                       dispatch({ type: "updating_user_failure", error: 'sign in error' });
//                     }
//                   )
//                 },
//                 error => {
//                   dispatch({ type: "updating_user_failure", error: 'sign in error' });
//                 }
//               );
//             } else {
//               dispatch({type: "updating_user_success", payload: result.data});
//             }
//           }
//         );
//       },
//       error => {
//         console.log("token error by code:", error);
//         dispatch({ type: "updating_user_failure", error: 'sign in error' });
//       }
//     )
//   }
// }

export const signIn = (name) => {
  console.log('sign in:', name);
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_user"});
    signInAPI(name).then(
      result => {
        if (result.data.noName) {
          dispatch({ type: "updating_user_failure", error: '' });
        } else {
          console.log(result.data)
          dispatch({type: "updating_user_success", payload: result.data});
        }
      },
      error => dispatch({ type: "updating_user_failure", error: '网络登录出错' })
    );
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    dispatch({ type: "start_signout_user"});
    signOutAPI().then(
      result => {
        console.log("signout result:", result);
        if (!result.data.success) {
          dispatch({ type: "signout_user_failure", error: '' });
        } else {
          console.log(result.data)
          dispatch({type: "signout_user_success"});
        }
      },
      error => dispatch({ type: "signout_user_failure", error: '网络登录出错' })
    );
  };
};

export const subscribeDepartment = (user_id, department_id) => {
  console.log('subscribeDepartment:', user_id, department_id)
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_subscription"});
    subscribeDepartmentAPI(user_id, department_id).then(
      result => {
        if (result.data.success) {
          console.log('subscribe result',result.data);
          const newUser = {...getState().user.user};
          newUser.subscriptionList = result.data.subscriptionList;
          console.log('new user:', newUser);
          dispatch({type: "updating_subscription_success", payload: newUser});
        } else {
          dispatch({type: "updating_subscription_failure", error: "订阅失败"});
        }
      }, 
      error => {
        dispatch({type: "updating_subscription_failure", error: "订阅网络失败"});
      }
    );
  };
};

export const fetchMyDiscussions = user_id => {
  return (dispatch, getState) => {
    console.log("fecth my discussions", user_id);
    dispatch({ type: "start_fetching_myDiscussions"});
    getMyDiscussionsAPI(user_id).then(
      result => {
        if (result.data.success) {
          console.log(result.data);
          dispatch({type: "fetching_myDiscussions_success", payload: result.data.discussions});
        } else {
          dispatch({type: "fetching_myDiscussions_failure", error: "获取我的发帖失败"});
        }
      },
      error => {
        dispatch({type: "fetching_myDiscussions_failure", error: "获取我的发帖失败"});
      }
    )
  }
}