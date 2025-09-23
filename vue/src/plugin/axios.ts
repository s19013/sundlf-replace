import type { App } from 'vue'
import axios from 'axios';

const option = {
  // cors設定
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'UserLang': window.navigator.language,
  },
  baseURL:'',
}

const axiosPlugin = {
  install(app: App, env: string) {
    // 開発
    if (env === "local" || env === 'dev') {
      option.baseURL = 'http://backend-sundlf:8000/api/';
    }

    // 本番
    if (env === "product" || env === 'pro') {
      option.baseURL = 'https://sundlf.com/api/';
    }

    const axiosInstance = axios.create(option);
    app.provide('axios', axiosInstance);
  },
};
export default axiosPlugin;
