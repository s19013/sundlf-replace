import type { Component } from 'vue'

export interface Route {
  path: string
  name: string
  component: Component
}
