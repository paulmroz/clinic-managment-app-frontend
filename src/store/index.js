import Vue from 'vue'
import Vuex from 'vuex'
import notificationsModule from "./modules/notifications.module";
import authModule from "./modules/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {authModule, notificationsModule}
});

