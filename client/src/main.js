import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueRouter, axios, VueAxios);

Vue.config.productionTip = false

import HomePage from './components/HomePage.vue';
import AddCar from './components/AddCar.vue';
import ViewCar from './components/ViewCar.vue';
import AboutUs from './components/AboutUs.vue';

const routes = [
  { path: '/', component: HomePage},
  { path: '/add', component: AddCar},
  { path: '/view/:id', component: ViewCar, name: 'view', params: true},
  { path: '/about', component: AboutUs},
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