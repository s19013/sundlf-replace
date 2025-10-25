// import type { Route } from '@/mold/interface/route'
import type {
  NavigationGuard,
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

  // http://router.vuejs.org/guide/advanced/navigation-guards.html#Optional-third-argument-next
  /** vue router に渡すガード */
  public routeGuard: NavigationGuard = (to: RouteLocationNormalized) => {
    // 名前がないルートは対象外
    // 通す
    if (!to.name) return true

    // すでにリダイレクト先なら何もしない（無限ループ防止）
    // 通す
    if (to.name === this.redirectName) return true

    // 拒否条件に引っかかったら指定した場所にリダイレクト
    // 通さない
    if (this.shouldRedirect(to.name, this.accessibleNameList)) {
      return { name: this.redirectName }
    }

    // ここまで来たら何も問題が無いので
    // 通す
    return true
  }
}
