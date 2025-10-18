import type { Component } from 'vue'

// vue routerのRouteの型
export interface Route {
  path: string
  name: string
  component: Component
}
