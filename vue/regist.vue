<template>
	<div>
		<div class="register">
			<div>
				<div class="top_1">注册</div>
				<div class="top_2">
					<img src="../images/head.png" height="100px" @click="shouye">
				</div>
			</div>
			<div class="top_3"></div>
			<form>
				<div style=" margin: 50px; width: 600px;">
					<div class="text">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号: <input type="text" style="width: 300px;"
						 placeholder="请输入不以0开头5-11位账号" v-model="username" @keyup="usernameYZ" @change="judgeusername">&nbsp;<span class="namespan">{{nameRS}}</span><br></div>
					<div class="text">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码: <input type="password" style="width: 300px;"
						 placeholder="请设置密码" @change="VerifyPasswordd" @keyup="passwordYZ" v-model="password">&nbsp;<span class="passspan">{{passwordRS}}</span><br></div>
					<div class="text">确&nbsp;认&nbsp;密&nbsp;码:&nbsp;<input type="password" style="width: 300px;" placeholder="确认密码"
						 @change="VerifyPasswordd" v-model="vppassword">&nbsp;<span class="vpspan">{{VerifyPassword}}</span><br></div>
					<div class="text">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别: &nbsp;&nbsp;&nbsp;&nbsp;<input type="radio"
						 v-model="sex" value="男">&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" v-model="sex" value="女">&nbsp;女<br></div>
					<div class="text">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱: <input style="width: 300px;" type="text"
						 placeholder="请输入邮箱" @keyup="emailYZ" v-model="email">&nbsp;<span class="emailspan">{{emailRS}}</span><br></div>
				</div>
				<div>
					<button class="btn regb" type="button" @click="submitt">立即注册</button>
					<button class="btn regb" type="button" @click="reset">重置</button>
				</div>
			</form>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				username: null,
				password: null,
				sex: "男",
				email: null,

				emailRS: null,
				nameRS: null,
				passwordRS: null,
				VerifyPassword: null,
				vppassword: null,

				e: false,
				u: false,
				p: false,
				v: false,

			}
		},
		methods: {
			//返回首页
			shouye() {
				this.$router.push("/")
			},
			//邮箱格式验证
			emailYZ() {
				var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.([a-zA-Z]+)+$/;
				if (reg.test(this.email)) {
					$(".emailspan").css("color", "green");
					this.emailRS = "格式正确  √";
					this.e = true;
				} else {
					$(".emailspan").css("color", "red");
					this.emailRS = "格式错误  ×"
				}
			},
			//判断用户名格式 4-10位纯数字
			usernameYZ() {
				var reg = /^[1-9a-zA-Z][0-9a-zA-Z]{4,10}$/;
				if (reg.test(this.username)) {
					$(".namespan").css("color", "green");
					this.nameRS = "格式正确  √";
					this.u = true;
				} else {
					$(".namespan").css("color", "red");
					this.nameRS = "格式错误  ×"
				}
			},
			//判断密码格式是否正确 6-16位
			passwordYZ() {
				var reg = /^[\w_-]{6,16}$/;
				if (reg.test(this.password)) {
					$(".passspan").css("color", "green");
					this.passwordRS = "格式正确  √";
					this.p = true;
				} else {
					$(".passspan").css("color", "red");
					this.passwordRS = "格式错误  ×"
				}
			},
			//判断两次密码是否输入一致
			VerifyPasswordd() {
				if (this.password == this.vppassword && this.password != null) {
					$(".vpspan").css("color", "green");
					this.VerifyPassword = "密码匹配  √";
					this.v = true;
				} else {
					$(".vpspan").css("color", "red");
					this.VerifyPassword = "密码不匹配  ×"
				}
			},
			//提交注册填写的信息
			submitt() {
				if (this.e == true && this.u == true && this.p == true && this.v == true) {
					var rf = this;
					axios.post("/users", {
						username: this.username,
						password: this.password,
						sex: this.sex,
						email: this.email
					}).then(function() {
						layer.msg('添加成功');
						rf.$router.push("/")
					}).catch(function() {
						layer.msg('添加失败');
						rf.$router.push("/register")
					})
				}
			},
			//判断输入的账号库中是否存在
			judgeusername() {
				if (this.nameRS == "格式正确  √") {
					var nameRs = this;
					axios.get("/users/" + this.username).then(function(response) {
						if (response.data != true) {
							nameRs.nameRS = "该账号已存在  ×"
							$(".namespan").css("color", "red");
							nameRs.u = false;
						}
					})
				}

			},
			//重置输入框
			reset() {
				this.username = null;
				this.password = null;
				this.sex = "男";
				this.email = null;
				this.emailRS = null;
				this.nameRS = null;
				this.passwordRS = null;
				this.VerifyPassword = null;
				this.vppassword = null;
				this.e = false;
				this.u = false;
				this.p = false;
				this.v = false;
			}
		}
	}
</script>

<style scoped="scoped">
	.register {
		height: 500px;
		width: 900px;
		margin: auto;
		margin-top: 120px;
		float: left;
		margin: 150px;
	}

	.top_1 {
		float: left;
		width: 100px;
		font-size: 35px;
		line-height: 50px;
		margin: 30px;
		font-family: "楷体";
	}

	.top_2 {
		float: right;
		font-size: 20px;
		line-height: 50px;
		margin-right: 10px;
		color: #FF6700;
	}

	.top_2:hover {
		cursor: pointer;
		title: "aaa"
	}

	.top_3 {
		border-radius: 5px;
		margin-top: 100px;
		border: 3px solid #FF6700;
	}

	.text {
		margin: 25px;
		font-size: 20px;
		font-family: "楷体";
	}

	.regb {
		background-color: #FF6700;
		font-size: 25px;
		width: 200px;
		margin-left: 100px;
		color: white;
		font-family: "楷体";
	}
</style>
