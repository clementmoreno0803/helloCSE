import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import App from "./App.vue";
import router from "./router";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives
});

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
