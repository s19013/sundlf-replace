import type { App, InjectionKey } from 'vue'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

const option = {
  // cors設定
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // laravelがつけることを推奨している
    // 「このリクエストは Ajax ですよ」とサーバーに伝えるための目印
    'X-Requested-With': 'XMLHttpRequest',
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

    // composition apiで使えるように
    app.provide(axiosKey, axiosInstance)

    // option api で使えるように
    app.config.globalProperties.$axios = axiosInstance
  },
}

export const axiosKey: InjectionKey<AxiosInstance> = Symbol('axios')
export default axiosPlugin
