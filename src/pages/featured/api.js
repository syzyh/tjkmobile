import axios from 'axios';

import {apiConfig} from '../config';
const categoryUrl = apiConfig('/serve/api/category');
const departmentUrl = apiConfig('/serve/api/department');

export const fetchAllCategorysAPI = () => {
  return axios.get(categoryUrl);
};

export const fetchAllDepartmentsAPI = () => {
  return axios.get(departmentUrl);
};
