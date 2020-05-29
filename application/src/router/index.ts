import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginForm from '@/views/LoginForm.vue'
import SignupForm from '@/views/SignupForm.vue'
import LogoutForm from '@/views/LogoutForm.vue'

import gameRoutes from './game'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'game' },
  },
  {
    path: '/login',
    name: 'signin',
    component: LoginForm,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupForm,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutForm,
  },
  ...gameRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
