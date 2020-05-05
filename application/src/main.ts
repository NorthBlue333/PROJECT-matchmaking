import Vue from "vue";
import VueTailwind from 'vue-tailwind'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createProvider } from "./vue-apollo";

Vue.use(VueTailwind)



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
