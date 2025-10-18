import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, authOnlyList } from '@/router/authGuard'
import { guestGuard, guestOnlyList } from '@/router/guestGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authOnlyList,
    ...guestOnlyList,
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

router.beforeEach(authGuard)
router.beforeEach(guestGuard)

export default router
