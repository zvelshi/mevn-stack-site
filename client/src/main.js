import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import HomePage from './components/HomePage.vue';
import AddCar from './components/AddCar.vue';
import ViewCar from './components/ViewCar.vue';

Vue.config.productionTip = false
Vue.use(VueRouter, Axios);

const routes = [
  { path: '/', component: HomePage},
  { path: '/add', component: AddCar},
  { path: '/view/:id', component: ViewCar, name: 'view', params: true}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});