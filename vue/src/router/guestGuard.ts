// ログイン者のアクセス制限
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Route } from '@/mold/interface/route'
import Login from '@/views/auth/login.vue'

// 非ログイン者だけアクセスできる画面
export const gestOnlyList: Array<Route> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]
const gestOnlyNameList: Array<string> = ['login']

export const guestGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // 認証storeを呼び出す
  const authStore = useAuthStore()
  const routeInGestOnlyNameList = to.name && gestOnlyNameList.includes(to.name as string)

  if (routeInGestOnlyNameList && authStore.isVerified) {
    next({ name: 'home' })
  } else {
    next()
  }
}
