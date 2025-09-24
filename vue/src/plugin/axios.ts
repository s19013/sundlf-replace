import type { App,InjectionKey  } from 'vue'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const axiosKey: InjectionKey<AxiosInstance> = Symbol('axios')


const option = {
  // cors設定
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'xsrfCookieName':'XSRF-TOKEN',
    'xsrfHeaderName':'X-XSRF-TOKEN'
    // 'UserLang': window.navigator.language,
  },
  baseURL: 'http://localhost:8000/api/',
}

const axiosPlugin = {
  install(app: App, env: string) {
    // 開発
    if (env === 'development') {
      // コンテナ名じゃなくて,localhostでok
      option.baseURL = 'http://localhost:8000/api/'
    }

    // 本番
    if (env === 'production') {
      option.baseURL = 'https://sundlf.com/api/'
    }

    const axiosInstance = axios.create(option)
    app.provide('axios', axiosInstance)
  },
}
export default axiosPlugin
