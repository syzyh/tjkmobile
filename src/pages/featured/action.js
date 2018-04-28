import {
  fetchAllCategorysAPI,
  fetchAllDepartmentsAPI,
} from './api';

import _ from 'lodash';

export const fetchingData = () => {
  return (dispatch, getState) => {
    dispatch({ type: "start_updating_data"});
    Promise.all([fetchAllCategorysAPI(), fetchAllDepartmentsAPI()]).then(
      result => {
        const categorys = _.orderBy(result[0].data, ['category_order', 'category_name'], ['asc', 'asc']);
        const departments = _.orderBy(result[1].data, ['department_order', 'department_name'], ['asc', 'asc']);
        for(let i = 0, length = departments.length; i < length; i++) {
          for(let j = 0, length = categorys.length; j < length; j++) {
            if (departments[i].category_id === categorys[j]._id) {
              if (!categorys[j].departments) categorys[j].departments = [];
              categorys[j].departments.push(departments[i]);
              break;
            }
          }
        }
        const carousel = categorys.slice(0, 1)[0].departments;
        const featured = categorys.slice(1);
        dispatch({ type: "updating_data_success", carousel, featured });
      },
      error => dispatch({ type: "updating_data_failure", error: '网络加载界面出错' })
    );
  };
};