import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import { db } from './Db';



Vue.config.productionTip = false
axios.defaults.baseURL='db'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
