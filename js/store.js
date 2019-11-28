import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import router from '../vue/router.js'

var store = new Vuex.Store({
	state:{
		loginName:""
	},
	mutations:{
		getLoginName(state,loginName){
			this.state.loginName = loginName
		}
	}
})
export default store;