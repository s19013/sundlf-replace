// 非ログイン者のアクセス制限
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Route } from '@/mold/interface/route'
import HomeView from '@/views/HomeView.vue'

// ログイン者だけアクセスできる画面
export const authOnlyList: Array<Route> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
]
// 自動生成で追加漏れを防ぐ
const authOnlyNameList: Array<string> = authOnlyList.map((route) => route.name)

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // 認証storeを呼び出す
  const authStore = useAuthStore()
  const routeInAuthOnlyNameList = to.name && authOnlyNameList.includes(to.name as string)

  // ログインしてないのにログイン者のみアクセスできるページにアクセスしようとしてる
  if (routeInAuthOnlyNameList && !authStore.isVerified) {
    next({ name: 'login' })
  } else {
    next()
  }
}
