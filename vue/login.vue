<template>
	<div>
		<div class="d1">
			<img src="../images/regist.png" width="600">
		</div>
		<div class="d2">
			<form>
				<div class="login">
					<div style="text-align: center;">
							<div style="height: 60px;">
								<div class="login_1">会员登录</div>
								<div @click="shouye">
									<a href="#"   style="color: white;">
										<h3 style="line-height: 60px;">返回首页</h3>
									</a>
								</div>
							</div>
							<div class="login_3"></div>
							<div style="margin-top: 30px;"></div>
							<div class="size" >用户名:&nbsp;<input ref="tt" maxlength="11"  class="shurukuang" type="text" placeholder="请输入您的用户名" v-model="username" @keyup.enter="login" /></div>
							<div class="size" >密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;<input class="shurukuang" type="password" 
								 placeholder="请输入您的密码" v-model="password" @keyup.enter="login" /></div>
							<div class="size"  >
								<div class="left fl" >验证码:&nbsp;<input class="yanzhengma" type="text"  placeholder="验证码" /></div>
								<div class="right fl"></div>
								<div style="margin-bottom: 20px;"></div>
							</div>
							<!-- <span class="alertMsg">{{alertMsg}}</span> -->
							<div class="login_3" ></div>
						<div>
							<button class="btn btncolor" type="button" @click="login" >
								立即登录
							</button>
							<button class="btn btncolor" style="margin-left: 20px;" type="button" @click="register">
								立即注册
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default{
		data(){
			return{
				username:"",
				password:"",
				loginUser:"",
			}
		},
		methods:{
			shouye(){
				this.$router.push("/");
			},
			register(){
				this.$router.push("/regist");
			},
			login(){
				var reg = /^[1-9a-zA-Z][0-9a-zA-Z]{4,10}$/;
				var path = this;
				if(reg.test(this.username)){
					axios.post("/users/login",{
						username:path.username,
						password:path.password
					}).then(function(response){
						if(response.data==""){
							layer.msg('登录失败，该账号已在其他地方登录');
							path.username="";
							path.password="";
							path.$refs.tt.focus();
						}else{
							layer.msg('登录成功');
							path.$router.push("/");
						}
					}).catch(function(){
						layer.msg('登录失败，账号或密码不正确');
					})
					
				}else{
					layer.msg('账号格式不正确');
					path.username="";
					path.password="";
					path.$refs.tt.focus();
				}
			}
		},
		mounted() {
			this.$refs.tt.focus();
		},
	}
</script>

<style scoped="scoped">
	.d1{
		margin-top: 120px;
		margin-left: 200px;
		width: 700px; float: left;
	}
	.d2{
		float: left; 
		margin-left: 150px; 
		margin-top: 150px;
	}
	.login_1{
		margin-left: 20px;
		font-size: 30px;
		line-height: 60px;
		float: left;
	}
	.login_2{
		line-height: 60px;
		margin-left: 30px;
		font-size: 15px; 
		float: left;
	}
	.login_3{
		border: 1px solid #FF6700;
		width: 350px;
		margin: auto;
		
	}
	.size{
		margin-bottom: 20px; font-size: 15px;
	}
	.btncolor{
		border-radius: 15px;
		background-color: #FF6700;
		font-size: 20px;
		margin-top: 15px;
	}
	
	.loginStyle {
		margin-top: 100px;
	}
	
	.shurukuang,
	.yanzhengma {
		color: #000000;
		font-family: "微软雅黑";
		border-radius: 5px;
	}
	
	.alertMsg {
		color: red;
		font-family: "微软雅黑";
		font-size: 20px;
	}
	
	.login {
		width: 400px;
		height: 330px;
		margin: 30px auto;
		background: #444;
		color: #fff;
		border-radius: 15px;
	}
	
</style>
