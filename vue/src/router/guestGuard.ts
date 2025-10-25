// 未認証のみ許可
import Login from '@/views/auth/login.vue'
import { Guard } from './Guard'
import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export class GuestGuard extends Guard {
  protected setRedirectName(): RouteRecordName {
    return 'home'
  }

  // 非ログイン者だけアクセスできる画面
  protected setAccessibleList(): RouteRecordRaw[] {
    return [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
    ]
  }

  // ログイン者が非ログイン者のみアクセスできるページにアクセスしようとしてるのを防ぐ
  public shouldRedirect(toName: RouteRecordName, accessibleNameList: RouteRecordName[]): boolean {
    // 認証storeを呼び出す
    const authStore = useAuthStore()
    const routeInGuestOnlyNameList = accessibleNameList.includes(toName)

    return routeInGuestOnlyNameList && authStore.isVerified
  }
}
