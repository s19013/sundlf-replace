<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { inject, onMounted } from 'vue'
import { axiosKey } from '@/plugin/axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

// このプロジェクトようのaxiosを呼び出す
const axios = inject<AxiosInstance>(axiosKey)

onMounted(() => {
  if (!axios) return
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
  </main>
</template>
