import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'

interface userData {
  name: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user: userData = reactive({ name: null })
  const isVerified = computed<boolean>(() => token.value !== null)

  // 初期化処理（コンストラクタ代わり）
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    Object.assign(user, JSON.parse(savedUser))
  }

  function setFromResponse(response: AxiosResponse) {
    const data = response.data

    token.value = data.token
    Object.assign(user, data.user)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    if (token.value) {
      localStorage.setItem('token', token.value)
    }
  }

  // セットアップ形式の場合手動でリセット関数を定義しないといけない
  function $reset() {
    token.value = null
    user.name = null

    // ローカルストレージから削除
    localStorage.clear()
  }

  return { token, user, isVerified, setFromResponse, $reset }
})
