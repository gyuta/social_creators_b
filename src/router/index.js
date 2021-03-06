import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/Mypage.vue')
  },
  {
    path: '/mystore',
    name: 'mystore',
    component: () => import('../views/Mystore.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/Map.vue')
  },
  {
    path: '/store/:id',
    name: 'store_detail',
    component: () => import('../views/StoreDetail.vue')
  },
  {
    path: '/story/:id',
    name: 'story',
    component: () => import('../views/Story.vue')
  },
  {
    path: '/ranking/:id',
    name: 'ranking',
    component: () => import('../views/Ranking.vue')
  },
  {
    path: '/notify',
    name: 'notify',
    component: () => import('../views/Notify.vue')
  },
  {
    path: '/news/:id',
    name: 'news',
    component: () => import('../views/News.vue')
  },
  {
    path: '/greeding_rank',
    name: 'greeding_rank',
    component: () => import('../views/GreedRank.vue')
  },
  {
    path: '/greeding_count',
    name: 'greeding_count',
    component: () => import('../views/GreedCount.vue')
  },
  {
    path: '/',
    name: 'stores',
    component: () => import('../views/Stores.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
