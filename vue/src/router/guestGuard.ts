// ログイン者のアクセス制限
import Login from '@/views/auth/login.vue'
import { Guard } from './Guard'
import { useAuthStore } from '@/stores/auth'
import type { Route } from '@/mold/interface/route'

export class GuestGuard extends Guard {
  protected setRedirectName(): string {
    return 'home'
  }

  // 非ログイン者だけアクセスできる画面
  protected setAccessibleList(): Array<Route> {
    return [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
    ]
  }

  // ログイン者が非ログイン者のみアクセスできるページにアクセスしようとしてるのを防ぐ
  public shouldRedirect(toName: string, accessibleNameList: Array<string>): boolean {
    // 認証storeを呼び出す
    const authStore = useAuthStore()
    const routeInGuestOnlyNameList = accessibleNameList.includes(toName as string)

    return routeInGuestOnlyNameList && authStore.isVerified
  }
}
