import axios from "axios";

import cookies from "js-cookie";

const httpClient = axios.create({
  baseURL: 'https://calorietrackingapi.herokuapp.com', // process.env.APP_API_BASE_URL,
});

httpClient.interceptors.request.use(function (config: any) {
  const token = cookies.get('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default httpClient;

