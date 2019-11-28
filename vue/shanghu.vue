<template>
	<div>
		<div id="span" style="text-align: center;">
			<h1>商户服务中心</h1>
		</div>
		<div id="shanghu" class="col-md-10 col-md-offset-1">
			<div id="shanghu-left" class="col-md-2">
				<ul class="nav nav-pills nav-stacked">
					<li>
						<router-link to="/shanghu-register">注册成为商户</router-link>
					</li>
					<li>
						<router-link to="/shanghu-food">菜品管理</router-link>
					</li>
					<li>
						<router-link to="/shanghu-type">菜品类型管理</router-link>
					</li>
					<li>
						<router-link to="/shanghu-advice">查看用户投诉</router-link>
					</li>
					<li>
						<router-link to="/shanghu-comment">查看用户评价</router-link>
					</li>
					<button class="btn btn-info" @click="changeStatus">{{this.shop.sstatus==1?'营业中':'打烊中'}}</button>

				</ul>
			</div>
			<div id="shanghu-right" class="col-md-9">
				<router-view name="shanghu-show" :uname="name"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		mounted() {
			this.getUid();
		},
		data() {
			return {
				name: store.state.loginName,
				uid: null,
				sid: null,
				shop: null
			}
		},
		methods: {
			getUid() {
				var name = new URLSearchParams();
				name.append('username', this.name);
				axios.post('http://localhost/users/findByName', name)
					.then(res => {
						this.uid = res.data;
						this.getShop();
					})
			},
			getShop() {
				axios.post('http://localhost/shop/' + this.uid)
					.then(res => {
						this.shop = res.data;
					})
			},
			changeStatus() {
				axios.post('http://localhost/shop/change/'+this.shop.sid)
					.then(res => {
						this.getUid();
					})
			}
		}
	}
</script>

<style scoped="scoped">
	#span {
		padding-bottom: 30px;
	}
	
	#shanghu {
		height: 700px;
	}
	
	#shanghu-left {
		height: 100%;
		background-color: #F6F6F6;
		border-radius: 5px;
	}
	
	#shanghu-right {
		height: 100%;
		border-radius: 5px;
		margin-left: 40px;
	}
	
	ul {
		list-style-type: none;
	}
	
	li {
		margin-top: 5px;
		color: white;
		text-align: center;
		font-size: large;
	}
</style>