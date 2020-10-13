import Vue from 'vue'
import App from './App.vue'
import router from './router'
import util from "./js/util";
import firebase from './js/firebase.js'

Vue.config.productionTip = false

Vue.mixin(util)
Vue.prototype.$firebase = firebase

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
