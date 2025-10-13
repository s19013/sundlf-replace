import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'

interface userData {
  name: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user: userData = reactive({ name: null })

  function setFromResponse(response: AxiosResponse) {
    const data = response.data

    token.value = data.token
    user.name = data.name
  }

  // セットアップ形式の場合手動でリセット関数を定義しないといけない
  function $reset() {
    token.value = null
    user.name = null
  }

  return { token, user, setFromResponse, $reset }
})
