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
  baseURL: 'http://localhost:8000/api/',
}

const axiosPlugin = {
  install(app: App, env: string) {
    // 開発
    if (env === 'development') {
      // ブラウザが走ってるのはコンテナの外側（ホストOS）。
      // Docker内のDNS（コンテナ名解決,サービス名解決）は ブラウザからは見えないからできない。
      // 要するにdocker内部で通信する時しか,"http://sundlf-backend:8000/api/"とは通信できない

      // コンテナ名じゃなくて,localhostでok
      config.baseURL = 'http://localhost:8000/api/'
    }

    // 本番
    if (env === 'production') {
      config.baseURL = 'https://sundlf.com/api/'
    }

    const axiosInstance = axios.create(config)

    // リクエスト前に必ずinterceptorを実行しtokenを貼る
    axiosInstance.interceptors.request.use(
      function (config) {
        // リクエストが送信される前の処理
        // config：このリクエストの設定（URL, headers, dataなど）をいじる
        const auth = useAuthStore() // Piniaのストアを参照

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
