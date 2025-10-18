// ログイン者のアクセス制限
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Route } from '@/mold/interface/route'
import Login from '@/views/auth/login.vue'

// 非ログイン者だけアクセスできる画面
export const guestOnlyList: Array<Route> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]
// 自動生成で追加漏れを防ぐ
const guestOnlyNameList: Array<string> = guestOnlyList.map((route) => route.name)

export const guestGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // 認証storeを呼び出す
  const authStore = useAuthStore()
  const routeInGuestOnlyNameList = to.name && guestOnlyNameList.includes(to.name as string)

  if (routeInGuestOnlyNameList && authStore.isVerified) {
    next({ name: 'home' })
  } else {
    next()
  }
}
