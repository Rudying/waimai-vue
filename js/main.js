import $ from 'jquery';
 import Vue from 'vue';
 import VueRouter from 'vue-router';
 Vue.use(VueRouter);
 import 'bootstrap3/dist/css/bootstrap.min.css';
 import layer from 'layui-layer';
 import axios from 'axios';

 import router from '../vue/router.js'
 import App from '../vue/App.vue';
 import VueCarousel from 'vue-carousel';
 Vue.use(VueCarousel);
 import Vuex from 'vuex';
 Vue.use(Vuex);


 axios.defaults.baseURL = "http://localhost";

 var app = new Vue({
 	el: "#app",
 	render: function(c) {
 		return c(App);
 	},
 	router
 });
