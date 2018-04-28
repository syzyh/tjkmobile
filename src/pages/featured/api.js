import axios from 'axios';

const categoryUrl = '/serve/api/category';
const departmentUrl = '/serve/api/department';

export const fetchAllCategorysAPI = () => {
  return axios.get(categoryUrl);
};

export const fetchAllDepartmentsAPI = () => {
  return axios.get(departmentUrl);
};
