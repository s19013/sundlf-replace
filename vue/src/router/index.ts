import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { AuthGuard } from '@/router/authGuard'
import { GuestGuard } from '@/router/guestGuard'

const authGuard = new AuthGuard()
const guestGuard = new GuestGuard()

const routes: RouteRecordRaw[] = [
  ...authGuard.accessibleList,
  ...guestGuard.accessibleList,
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard.routeGuard)
router.beforeEach(guestGuard.routeGuard)

export default router
