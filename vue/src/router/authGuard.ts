// 認証済みのみ許可
import HomeView from '@/views/HomeView.vue'
import { Guard } from './Guard'
import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export class AuthGuard extends Guard {
  protected setRedirectName(): RouteRecordName {
    return 'login'
  }

  // ログイン者だけアクセスできる画面
  protected setAccessibleList(): RouteRecordRaw[] {
    return [
      {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
      },
    ]
  }

  // ログインしてないのにログイン者のみアクセスできるページにアクセスしようとしてるのを防ぐ
  public shouldRedirect(toName: RouteRecordName, accessibleNameList: RouteRecordName[]): boolean {
    // 認証storeを呼び出す
    const authStore = useAuthStore()
    const routeInAuthOnlyNameList = accessibleNameList.includes(toName)

    return routeInAuthOnlyNameList && !authStore.isVerified
  }
}
