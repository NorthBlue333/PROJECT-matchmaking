import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Signin",
    component: LoginForm
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupForm
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
