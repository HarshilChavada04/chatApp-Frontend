import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth';


axios.defaults.baseURL = process.env.API_BASE_URL;

const api = axios.create();

export default boot(({ app }) => {
  const auth = useAuthStore();

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  api.interceptors.request.use(function (config) {
    config.headers.Accept = 'application/json';
    config.headers.Authorization = 'Bearer ' + auth.getToken;
    return config;
  });

});

export { api };
