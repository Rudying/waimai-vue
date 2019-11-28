<template>
	<div id="top">
		<div id="top-nav">
			<div id="top-nav-info">					
				<div class="col-md-5 col-md-offset-7">
					<span>
						
						<a href="#"  @click="login" v-if="loginName==''" style="text-decoration:none" >您好，请登录&nbsp&nbsp 丨</a>
						<span href="#" v-else="loginName" >欢迎 {{loginName}} 登录&nbsp&nbsp丨&nbsp&nbsp<a href="#" @click="shopCar" style="text-decoration:none">购物车</a>&nbsp&nbsp丨&nbsp&nbsp<a href="#" @click="logout" style="text-decoration:none">安全退出</a> 丨</span>
						<a href="#" @click="regist"  style="text-decoration:none">免费注册</a>
					</span>
					<span>&nbsp&nbsp|&nbsp&nbsp</span>
					<a href="#" style="text-decoration:none" @click="myindex">个人中心</a>
					<span>&nbsp&nbsp|&nbsp&nbsp</span>
					<a href="#"  style="text-decoration:none" @click="shanghu">商户服务</a>
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
		data(){
			return{
				loginName:"",
			}
		},
		methods:{
			shopCar(){
				this.$router.push("/shopCar")
			},
			shouye(){
				this.$router.push("/")
			},
			login(){
				this.$router.push("/login")
			},
			regist(){
				this.$router.push("/regist")
			},
			myindex(){
				if(store.state.loginName!=""){
					this.$router.push("/mymsg1")
				}else{
					layer.msg('当前未登录，无法进入');
				}
				
			},
			shanghu(){
				this.$router.push("/shanghu")
			},
			logout(){
				axios.post("/users/logout",{
					loginName:this.loginName
				}).then((response)=>{
					layer.msg('已退出当前账号');
					this.loginName = "";
					store.commit("getLoginName","");
					this.$router.push("/");
				})
			}
		},
		beforeCreate(){
			var path = this;
			axios.get("/users/isLogin").then(function(response){
				console.log(response.data)
				if(!response.data.isLogin){
					path.$router.push("/");
				}else{
					path.loginName =  response.data.loginName
				}
			})
		},
		beforeUpdate() {
			if(this.loginName!=""){
				store.commit("getLoginName",this.loginName)
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
	#top-nav{
		height: 30px;
		background-color: #F6F6F6;
		line-height: 30px;
	}
	.top-nav2-right{
		height: 50px;
		width: 600px;
		background-color: orange;
		margin-top: 30px;
		margin-left: 200px;
		font-size: large;
		line-height: 50px;
	}
</style>
