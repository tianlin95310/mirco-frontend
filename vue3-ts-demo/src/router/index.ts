import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashbroad',
      component: Layout,
      children: [
        {
          path: '/dashbroad',
          name: 'dashbroad',
          component: () /*webpackchunkname*/ => import('../views/dashbroad.vue')
        },
        {
          path: '/menu1',
          name: 'menu1',
          component: () => import('../views/menu1.vue')
        },
        {
          path: '/menu2',
          name: 'menu2',
          component: () => import('../views/menu2.vue')
        },
        {
          path: '/menu3',
          name: 'menu3',
          component: () => import('../views/menu3.vue')
        },
        {
          path: '/menu4',
          name: 'menu4',
          component: () => import('../views/menu4.vue')
        },
        {
          path: '/menu5',
          name: 'menu5',
          component: () => import('../views/menu5.vue')
        },
        {
          path: '/menu6',
          name: 'menu6',
          component: () => import('../views/menu6.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  console.log('beforeEach', to, from)
  return true
})

export default router
