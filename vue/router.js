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
// 个人中心
import myindex from '../vue/myindex.vue';
//这玩意暂时没发现啥作用.目前先别删下面这行
import top1 from '../vue/top1.vue';
import mymsg1 from '../vue/mymsg1.vue';
import password from '../vue/password.vue';
import address from '../vue/address.vue'
/* admin后台 */
import admin from '../vue/admin.vue';
import food from '../vue/food.vue';
import advice from '../vue/userAdvice.vue';
import type from '../vue/type.vue';
import permission from '../vue/permission.vue';
import role from '../vue/role.vue';
import user from '../vue/users.vue';
import ua from '../vue/userAddress.vue';
import uc from '../vue/userCollection.vue';
import uco from '../vue/userComment.vue';
import uo from '../vue/userOrders.vue';
import oe from '../vue/orderElement.vue';
import store from '../vue/store.vue';
/*商户服务*/
import shanghu from '../vue/shanghu.vue';
import shanghuregister from '../vue/shanghu-register.vue';
import shanghufood from '../vue/shanghu-food.vue';
import shanghutype from '../vue/shanghu-type.vue';
import shanghucomment from '../vue/shanghu-comment.vue';
import shanghuadvice from '../vue/shanghu-advice.vue';

import shopCar from './shopCar.vue';
import paysuccess from './paysuccess.vue';


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
				},
				{
					path: "/food",
					components: {
						"show": food,
					}
				},
				{
					path: "/permission",
					components: {
						"show": permission,
					}
				},
				{
					path: "/role",
					components: {
						"show": role,
					}
				},
				{
					path: "/user",
					components: {
						"show": user,
					}
				},
				{
					path: "/address",
					components: {
						"show": ua,
					}
				},
				{
					path: "/collection",
					components: {
						"show": uc,
					}
				},
				{
					path: "/comment",
					components: {
						"show": uco,
					}
				},
				{
					path: "/element",
					components: {
						"show": oe,
					}
				},
				{
					path: "/order",
					components: {
						"show": uo,
					}
				},
				{
					path: "/store",
					components: {
						"show": store,
					}
				},
			]
		},
		{
			path: "/*",
			components: {
				"top": top,
				"middle": middle,
				"bottom": bottom,
			},
			// ===========================================================
			children: [{
					path: "/myindex",
					components: {
						"myindex": myindex
					},
					children: [{
							path: "/mymsg1/:id",
							components: {
								"mymsg1": mymsg1,
								"myindex": myindex
							}
						},
						{
							path: "/password/:id",
							components: {
								"password": password,
								"myindex": myindex,
							}
						},
						{
							path: "/address",
							components: {
								"address": address,
								"myindex": myindex,
							}
						},

					],
				},
				//============商户服务==============
				{
					path: "/shanghu",
					components: {
						"shanghu": shanghu
					},
					children: [{
							path: "/shanghu-register",
							components: {
								"shanghu-show": shanghuregister,
							}
						},
						{
							path: "/shanghu-food",
							components: {
								"shanghu-show": shanghufood,
							}
						},
						{
							path: "/shanghu-type",
							components: {
								"shanghu-show": shanghutype,
							}
						},
						{
							path: "/shanghu-comment",
							components: {
								"shanghu-show": shanghucomment,
							}
						},
						{
							path: "/shanghu-advice",
							components: {
								"shanghu-show": shanghuadvice,
							}
						},
					],
				},

				{
					path: "/shopCar",
					components: {
						"shopCar": shopCar,
					}
				},

				{
					path: "/paysuccess",
					components: {
						"success": paysuccess,
					}
				},

				{
					path: "/*",
					components: {
						"ml": ml,
						"mr": mr,
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
						},
					]
				},
			]
		}
	]
})

export default router;