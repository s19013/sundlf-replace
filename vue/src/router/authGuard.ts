// 非ログイン者のアクセス制限
import HomeView from '@/views/HomeView.vue'
import { Guard } from './Guard'
import { useAuthStore } from '@/stores/auth'

export class AuthGuard extends Guard {
  redirectName = 'login'

  // ログイン者だけアクセスできる画面
  accessibleList = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ]

  // ログインしてないのにログイン者のみアクセスできるページにアクセスしようとしてるのを防ぐ
  shouldRedirect(toName: string, accessibleNameList: Array<string>): boolean {
    // 認証storeを呼び出す
    const authStore = useAuthStore()
    const routeInAuthOnlyNameList = accessibleNameList.includes(toName as string)

    return routeInAuthOnlyNameList && !authStore.isVerified
  }
}
