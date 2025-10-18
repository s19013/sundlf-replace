<script setup lang="ts">
import { ref, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { axiosKey } from '@/plugin/axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

// このプロジェクトようのaxiosを呼び出す
const axios = inject<AxiosInstance>(axiosKey)

// このプロジェクト用のルータを呼び出す
const router = useRouter()

// 認証storeを呼び出す
const authStore = useAuthStore()

interface Form {
  email: string | null
  password: string | null
}

interface ErrorResponse {
  message: string
}

const form: Form = reactive({
  email: null,
  password: null,
})

const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

const submitEvent = () => {
  console.log(form)

  if (!axios) return
  isLoading.value = true
  axios
    .post('login', form)
    .then((response: AxiosResponse) => {
      console.log(response)
      authStore.setFromResponse(response)
      router.push({ name: 'home' })
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error(error.response)
      if (error.response !== undefined) {
        errorMessage.value = error.response.data.message
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="submitEvent">
    <p v-text="errorMessage"></p>
    <label for="">
      メールアドレス
      <input type="email" name="email" v-model="form.email" required />
    </label>

    <label for="">
      パスワード
      <input type="password" name="password" v-model="form.password" required />
    </label>

    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'ログイン中...' : 'ログイン' }}
    </button>
  </form>
</template>
