// import type { Route } from '@/mold/interface/route'
import type {
  // NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
  RouteRecordName,
} from 'vue-router'

/**
 * setAccessibleList() : アクセス可能ルートを定義
 * setRedirectName() : リダイレクト先を定義
 * shouldRedirect() : リダイレクト条件を定義
 *
 * index.tsにaccessibleListとrouteGuardを登録
 */
export abstract class Guard {
  protected redirectName: RouteRecordName = ''
  public accessibleList: RouteRecordRaw[] = []

  /** 名前部分だけのリスト */
  protected accessibleNameList: RouteRecordName[] = []

  constructor() {
    this.redirectName = this.setRedirectName()
    this.accessibleList = this.setAccessibleList()
    // this.accessibleNameList = this.accessibleList.map((route) => route.name)

    // undefined な name を安全に除外
    this.accessibleNameList = this.accessibleList
      .map((route) => route.name)
      .filter((n): n is RouteRecordName => n != null)
  }

  /**  アクセス可能ルートを定義 */
  protected abstract setAccessibleList(): RouteRecordRaw[]

  /** リダイレクト先を定義(パスではなくnameで登録してください) */
  protected abstract setRedirectName(): RouteRecordName

  /** リダイレクト条件を定義 */
  protected abstract shouldRedirect(
    toName: RouteRecordName,
    accessibleNameList: RouteRecordName[],
  ): boolean

  /** vue router に渡すガード */
  public routeGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    if (this.shouldRedirect(to.name as string, this.accessibleNameList)) {
      next({ name: this.redirectName })
    } else {
      next()
    }
  }
}
