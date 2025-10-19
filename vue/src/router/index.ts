import { createRouter, createWebHistory } from 'vue-router'
import { AuthGuard } from '@/router/authGuard'
import { GuestGuard } from '@/router/guestGuard'

const authGuard = new AuthGuard()
const guestGuard = new GuestGuard()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authGuard.accessibleList,
    ...guestGuard.accessibleList,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(authGuard.routeGuard)
router.beforeEach(guestGuard.routeGuard)

export default router
