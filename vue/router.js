import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import axios from 'axios';

/* 网站首页 */
import top from '../vue/top.vue';
import middle from '../vue/middle.vue';
import ml from '../vue/middle-left.vue';
import mr from '../vue/middle-right.vue';
import bottom from '../vue/bottom.vue';
import shop from '../vue/shop.vue';
import foodtype from '../vue/foodtype.vue';
import login from '../vue/login.vue';
import regist from '../vue/regist.vue';
/* admin后台 */
import admin from '../vue/admin.vue';
import food from '../vue/food.vue';
import advice from '../vue/advice.vue';
import type from '../vue/type.vue';

var router = new VueRouter({
	routes: [{
			path: "/",
			redirect: "/shop"
		},
		{
			path: "/login",
			components: {
				"login": login
			}
		},
		{
			path: "/regist",
			components: {
				"regist": regist
			}
		},
		{
			path: "/admin",
			components: {
				"admin": admin
			},
			children: [{
					path: "/advice",
					components: {
						"show": advice,
					}
				},
				{
					path: "/type",
					components: {
						"show": type,
					}
				}
			]
		},
		{
			path: "/*",
			components: {
				"top": top,
				"middle": middle,
				"bottom": bottom,

			},
			children: [{
				path: "/*",
				components: {
					"ml": ml,
					"mr": mr
				},
				children: [{
						path: "/shop",
						components: {
							"right-bottom": shop,
						},
					},
					{
						path: "/foodtype",
						components: {
							"right-bottom": foodtype,
						},
					}
				]
			}, ]
		}
	]
})

export default router;
