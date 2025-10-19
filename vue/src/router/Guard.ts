import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { Route } from '@/mold/interface/route'

export abstract class Guard {
  protected abstract redirectName: string
  protected abstract accessibleList: Array<Route>
  abstract shouldRedirect(toName: string, accessibleList: Array<string>): boolean

  // 名前部分だけのリスト
  private accessibleNameList = (): Array<string> => this.accessibleList.map((route) => route.name)

  routeGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    if (this.shouldRedirect(to.name as string, this.accessibleNameList())) {
      next({ name: this.redirectName })
    } else {
      next()
    }
  }
}
