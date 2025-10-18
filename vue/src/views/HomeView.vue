<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/useAxios'
import { onMounted } from 'vue'
import type { AxiosResponse, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

// このプロジェクトようのaxiosを呼び出す
const axios = useAxios()

// このプロジェクト用のルータを呼び出す
const router = useRouter()

// 認証storeを呼び出す
const authStore = useAuthStore()

const logout = () => {
  axios
    .post('logout')
    .then((response: AxiosResponse) => {
      console.log(response)
      authStore.$reset()
      router.push({ name: 'login' })
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error.message)
    })
}

onMounted(() => {
  axios
    .get('user')
    .then((response: AxiosResponse) => {
      console.log(response)
    })
    .catch((error: AxiosError) => {
      console.error(error.response?.data ?? error.message)
    })
})
</script>

<template>
  <main>
    <TheWelcome />

    <button @click="logout" type="button">logout</button>
  </main>
</template>
