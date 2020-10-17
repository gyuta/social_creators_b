import Vue from 'vue'
import App from './App.vue'
import router from './router'
import util from "./js/util";
import firebase from './js/firebase.js'
import Croppa from 'vue-croppa';
import "./js/filter"
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCfA5OsWJh1cX4wB6LmJwXx-MoW6rJeqZM',
    libraries: 'places',
  },
})

Vue.config.productionTip = false

Vue.mixin(util)
Vue.use(Croppa)
Vue.prototype.$firebase = firebase

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
