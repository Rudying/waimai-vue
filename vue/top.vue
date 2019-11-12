<template>
	<div id="top">
		<div id="top-nav">
			<div id="top-nav-info">
				<div class="col-md-5 col-md-offset-7">
					<span>

						<a href="#" @click="login" v-if="a" style="text-decoration:none">你好，请登录&nbsp&nbsp丨</a>
						<span href="#" v-else="a">{{loginName}} 丨 <a href="#" @click="logout" style="text-decoration:none">安全退出</a> 丨</span>

						<a href="#" @click="regist" style="text-decoration:none">免费注册</a>
					</span>
					<span>&nbsp&nbsp|&nbsp&nbsp</span>
					<a href="#" style="text-decoration:none">个人中心</a>
					<span>&nbsp&nbsp|&nbsp&nbsp</span>
					<a target="_blank" href="#" style="text-decoration:none">商户服务</a>
					<span>&nbsp&nbsp|&nbsp&nbsp</span>
					<a target="_blank" href="#" style="text-decoration:none">帮助中心</a>
				</div>
			</div>
		</div>

		<div id="top-nav2">
			<div class="top-nav2-left col-md-2 col-md-offset-1">
				<a title="蜗牛外卖" href="#" @click="shouye"><img src="images/head.png" /></a>
			</div>
			<div class="top-nav2-right col-md-9">
				<input type="text" placeholder="搜索商户名、地址、菜名、外卖等" autocomplete="off" style="height: 46px;width: 480px;margin-left: -13px;">
				<a target="_blank" style="color: white;margin-left: 30px;">搜索</a>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				a: true,
				loginName: ""
			}
		},
		methods: {
			shouye() {
				this.$router.push("/");
			},
			login() {
				this.$router.push("/login")
			},
			regist() {
				this.$router.push("/regist")
			},
			logout() {
				var a = this;
				axios.get("/users/logout").then(function(response) {
					a.a = true;
					layer.msg('已退出当前账号');
					a.$router.push("/");
				})
			}
		},
		created() {
			if (this.$route.query.hasOwnProperty("loginUser")) {
				this.a = false;
				this.loginName = "欢迎 " + this.$route.query.loginUser.username + " 登录";
			}
			if (this.loginName.substring(3, 11) == "undefine") {
				this.a = true;
				this.$router.push("/")
			}
		}
	};
</script>

<style scoped="scoped">
	#top {
		height: 150px;
	}

	img {
		width: 300px;
		height: 110px;
	}

	#top-nav {
		height: 30px;
		background-color: #F6F6F6;
		line-height: 30px;
	}

	.top-nav2-right {
		height: 50px;
		width: 600px;
		background-color: orange;
		margin-top: 30px;
		margin-left: 200px;
		font-size: large;
		line-height: 50px;
	}
</style>
