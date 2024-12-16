import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Layout from '@/views/layout/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */'@/views/Dashboard.vue')
      }
    ]
  },
  {
    path: '/menu1',
    component: Layout,
    children: [
      {
        path: 'testChildModP',
        name: 'TestChildModP',
        component: () => import('@/views/menus1/testChildModP.vue')
      },
      {
        path: 'vueTransition',
        name: 'VueTransition',
        component: () => import('@/views/menus1/vueTransition.vue')
      },
      {
        path: 'vueLifecycle',
        name: 'VueLifecycle',
        component: () => import('@/views/menus1/vueLifecycle.vue')
      },
      {
        path: 'selfVModelEle',
        name: 'SelfVModelEle',
        component: () => import('@/views/menus1/selfVModelEle.vue')
      },
      {
        path: 'selfDirective',
        name: 'SelfDirective',
        component: () => import('@/views/menus1/selfDirective.vue')
      },
      {
        path: 'bindArray',
        name: 'BindArray',
        component: () => import('@/views/menus1/bindArray.vue')
      },
      {
        path: 'combineApi',
        name: 'CombineApi',
        component: () => import('@/views/menus1/combineApi.vue')
      },
      {
        path: 'testAsyncComp',
        name: 'TestAsyncComp',
        component: () => import('@/views/menus1/testAsyncComp.vue')
      }
    ]
  },
  {
    path: '/menu2',
    component: Layout,
    children: [
      {
        path: 'testTransition',
        name: 'TestTransition',
        component: () => import('@/views/menus2/testTransition.vue')
      },
      {
        path: 'testAnimation',
        name: 'TestAnimation',
        component: () => import('@/views/menus2/testAnimation.vue')
      },
      {
        path: 'testCssStyle',
        name: 'TestCssStyle',
        component: () => import('@/views/menus2/testCssStyle.vue')
      },
      {
        path: 'testFlex',
        name: 'TestFlex',
        component: () => import('@/views/menus2/testFlex.vue')
      },
      {
        path: 'scroll',
        name: 'Scroll',
        component: () => import('@/views/menus2/scroll.vue')
      },
      {
        path: 'selector',
        name: 'Selector',
        component: () => import('@/views/menus2/selector.vue')
      }
    ]
  },
  {
    path: '/menu3',
    component: Layout,
    children: [
      {
        path: 'testJsListAndMap',
        name: 'TestJsListAndMap',
        component: () => import('@/views/menus3/testJsListAndMap.vue')
      },
      {
        path: 'listOperate',
        name: 'ListOperate',
        component: () => import('@/views/menus3/listOperate.vue')
      },
      {
        path: 'func',
        name: 'Func',
        component: () => import('@/views/menus3/func.vue')
      },
      {
        path: 'objectAnal',
        name: 'ObjectAnal',
        component: () => import('@/views/menus3/objectAnal.vue')
      },
      {
        path: 'particle',
        name: 'Particle',
        component: () => import('@/views/menus3/particle.vue')
      },
      {
        path: 'regExp',
        name: 'RegExp',
        component: () => import('@/views/menus3/regExp.vue')
      },
      {
        path: 'testEvent',
        name: 'TestEvent',
        component: () => import('@/views/menus3/testEvent.vue')
      },
      {
        path: 'positionAndSize',
        name: 'PositionAndSize',
        component: () => import('@/views/menus3/positionAndSize.vue')
      },
      {
        path: 'htmlSafety',
        name: 'HtmlSafety',
        component: () => import('@/views/menus3/htmlSafety.vue')
      }
    ]
  },
  {
    path: '/menu4',
    component: Layout,
    children: [
      {
        path: 'dateFormat',
        name: 'DateFormat',
        component: () => import('@/views/menus4/dateFormat.vue')
      },
      {
        path: 'stringDealwith',
        name: 'StringDealwith',
        component: () => import('@/views/menus4/stringDealwith.vue')
      },
      {
        path: 'promiseUse',
        name: 'PromiseUse',
        component: () => import('@/views/menus4/promiseUse.vue')
      },
      {
        path: 'htmlDeal',
        name: 'HtmlDeal',
        component: () => import('@/views/menus4/htmlDeal.vue')
      },
      {
        path: 'bomAbout',
        name: 'bomAbout',
        component: () => import('@/views/menus4/bomAbout.vue')
      }
    ]
  },
  {
    path: '/menu5',
    component: Layout,
    children: [
      {
        path: 'drawPuke',
        name: 'DrawPuke',
        component: () => import('@/views/menus5/drawPuke.vue')
      },
      {
        path: 'lot',
        name: 'lot',
        component: () => import('@/views/menus5/lot.vue')
      },
      {
        path: 'componentInter',
        name: 'componentInter',
        component: () => import('@/views/menus5/componentInter.vue')
      },
      {
        path: 'dynamicTheme',
        name: 'dynamicTheme',
        component: () => import('@/views/menus5/dynamicTheme.vue')
      }
    ]
  },
  {
    path: '/menu6',
    component: Layout,
    children: [
      {
        path: 'htmlView',
        name: 'HtmlView',
        component: () => import('@/views/menus6/htmlView.vue')
      },
      {
        path: 'canvasView',
        name: 'CanvasView',
        component: () => import('@/views/menus6/canvasView.vue')
      }
    ]
  },
  {
    path: '/menu7',
    component: Layout,
    children: [
      {
        path: 'Algorithm',
        name: 'Algorithm',
        component: () => import('@/views/menus7/Algorithm.vue')
      }
    ]
  },
  {
    path: '/menu2/mobile',
    name: 'mobile',
    component: () => import('@/views/menus2/mobile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/login2',
    name: 'LoginStepTwo',
    component: () => import('@/views/LoginStepTwo.vue')
  },
  {
    path: '/pukegame1',
    name: 'PukeGame',
    component: () => import('@/views/menus5/pukegame1.vue')
  },
  {
    path: '/menu8',
    component: Layout,
    children: [
      {
        path: 'thirdApi',
        name: 'thirdApi',
        component: () => import('@/views/menus8/thirdApi.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
