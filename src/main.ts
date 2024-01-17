import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";

import App from "./App.vue";
import PrimeVue from "primevue/config";
import { ru } from "./localeConfig";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./pages/routes";


const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(PrimeVue, {
    ripple: true,
    locale: ru,
  })
  .use(vuetify)
  .use(ToastService)
  .use(pinia)
  .use(router)
  .mount("#app");
