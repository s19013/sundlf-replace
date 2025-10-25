import type { App, InjectionKey } from 'vue'
import type { AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const config = {
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
  baseURL: import.meta.env.VITE_API,
}

const axiosPlugin = {
  install(app: App) {
    const axiosInstance = axios.create(config)
    const auth = useAuthStore() // Piniaのストアを参照

    // リクエスト前に必ずinterceptorを実行しtokenを貼る
    axiosInstance.interceptors.request.use(
      function (config) {
        // リクエストが送信される前の処理
        // config：このリクエストの設定（URL, headers, dataなど）をいじる

        if (auth.token) {
          // Authorizationヘッダーにトークンを自動付与
          config.headers.Authorization = `Bearer ${auth.token}`
        }

        return config
      },
      function (error) {
        // リクエスト エラーの処理
        return Promise.reject(error)
      },
    )

    // composition apiで使えるように
    app.provide(axiosKey, axiosInstance)

    // Options API で this.$axios として使えるように
    app.config.globalProperties.$axios = axiosInstance
  },
}

export const axiosKey: InjectionKey<AxiosInstance> = Symbol('axios')
export default axiosPlugin
