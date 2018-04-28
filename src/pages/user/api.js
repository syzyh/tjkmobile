import axios from 'axios';
axios.defaults.withCredentials = true;

const userUrl = '/serve/api/user';
const userSubscriptionUrl = '/serve/api/user/subscription';
const discussionUrl = '/serve/api/discussion';

// const weChatAxios = axios.create({
//   baseURL: 'https://api.weixin.qq.com',
//   timeout: 1000,
// });

// export const getTokenAPI = code => {
//   console.log("get token api:", code);
//   return weChatAxios.get("/sns/oauth2/access_token",
//     {params: 
//       {
//         appid: "wx4a7a656e121fa87f",
//         secret: "966a2c45030de77fceae260153cceef6",
//         code, 
//         grant_type:"authorization_code"
//       }
//     });
// };

// export const getUserInfoByTokenAPI = (access_token, openid) => {
//   return weChatAxios.get("/sns/oauth2/userinfo", {params:{access_token,openid}});
// };

// export const signUpByUserInfoAPI = (openid, userName, avatarUrl) => {
//   return axios.get(userUrl + "/signUp", {openid, userName, avatarUrl});
// };

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