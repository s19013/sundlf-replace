// composableについて:https://ja.vuejs.org/guide/reusability/composables
import { inject } from 'vue'
import { axiosKey } from '@/plugin/axios'
import type { AxiosInstance } from 'axios'

// nullチェックを終えた状態のaxiosを渡す
export function useAxios(): AxiosInstance {
  const axios = inject<AxiosInstance>(axiosKey)

  if (!axios) {
    throw new Error(
      'Axiosインスタンスがありません。main.tsにaxiosPluginがインストールされていることを確認してください。',
    )
  }

  return axios
}
