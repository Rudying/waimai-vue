<template>
	<div>
		<div class="d2">
			<div class="login">
				<div style="height: 60px;">
					<div class="login_1">会员登录</div>
					<span id="h" style="line-height: 60px; font-size: 20px;"  @click="shouye">返回首页</span>
				</div>
				<div class="login_3"></div>
				<div style="margin-top: 30px;"></div>
				<div class="size" >用户名:&nbsp;<input ref="tt" maxlength="11"  class="shurukuang" type="text" placeholder="请输入您的用户名" v-model="username" @keyup.enter="login" /></div>
				<div class="size" >密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;<input class="shurukuang" type="password" 
					 placeholder="请输入您的密码" v-model="password" /></div>
				<div class="size"  >
					验证码:&nbsp;<input ref="yy" style="width: 60px;" class="yanzhengma" @keyup.enter="submit" id="verify" type="text"  placeholder="验证码" />
					<canvas width="100" height="40" id="verifyCanvas"></canvas>
					<img id="code_img" @click="shuaxin">
				</div>
				<div class="login_3" ></div>
				<div>
					<button class="btn btncolor" @click="submit" type="button" >
						立即登录
					</button>
					<button class="btn btncolor" style="margin-left: 20px;" type="button" @click="register">
						立即注册
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
	'L', 'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
	'y', 'z'
	];
	var colors = [];
	export default{
		data(){
			return{
				username:"",
				password:"",
				loginUser:"",
				yzm:"",
			}
		},
		methods:{
			submit(){
				//下面就是判断是否== 的代码，无需解释
				var oValue = $('#verify').val().toUpperCase();
				if (oValue == 0) {
					layer.msg('验证码不能为空');
				} else if (oValue != this.yzm.join("").toUpperCase()) {
					//若输入框与图片输入不匹配，清空输入框
					layer.msg('验证码输入错误');
					$('#verify').val("");
					$('#verifyCanvas').remove();
					$('#verify').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>');
					this.drawCode();
					//验证码输入框获得焦点
					this.$refs.yy.focus();
				} else {
					this.login();
				}
			},
			shuaxin(){
				//点击图片切换随机的验证码
				$('#verifyCanvas').remove();
				$('#verify').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>')
				this.drawCode();
			},
			convertCanvasToImage(canvas){
				//绘制图片
				document.getElementById("verifyCanvas").style.display = "none";
				var image = document.getElementById("code_img");
				image.src = canvas.toDataURL("image/png");
				return image;
			},
			drawDot(canvas, context){
				 // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
				var px = Math.floor(Math.random() * canvas.width);
				var py = Math.floor(Math.random() * canvas.height);
				context.moveTo(px, py);
				context.lineTo(px + 1, py + 1);
				context.lineWidth = 0.5;
				context.stroke();
			},
			drawline(canvas, context){
				// 随机线
				context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
				context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
				context.lineWidth = 0.5; //随机线宽
				context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
				context.stroke(); //描边，即起点描到终点
			},
			drawCode(){
				var canvas = document.getElementById("verifyCanvas"); //获取HTML端画布
				var context = canvas.getContext("2d"); //获取画布2D上下文
				context.fillStyle = "skyblue"; //画布填充色
				context.fillRect(0, 0, canvas.width, canvas.height); //画布填充位置
				// 创建渐变
				var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
				gradient.addColorStop("0", "#8A2387");
				gradient.addColorStop("0.5", "#E94057");
				gradient.addColorStop("1.0", "#F27121");
		         //清空画布
				context.fillStyle = gradient; //设置字体颜色
				context.font = "30px Arial"; //设置字体
				var rand = new Array();
				var x = new Array();
				var y = new Array();
				for (var i = 0; i < 4; i++) {
					rand[i] = nums[Math.floor(Math.random() * nums.length)]
					x[i] = i * 16 + 10;
					y[i] = Math.random() * 20 + 20;
					context.fillText(rand[i], x[i], y[i]);
				}
				this.yzm = rand;
				// console.log(rand);
				//画3条随机线
				for (var i = 0; i < 3; i++) {
					this.drawline(canvas, context);
				}
		 
				// 画30个随机点
				for (var i = 0; i < 30; i++) {
					this.drawDot(canvas, context);
				}
			   this.convertCanvasToImage(canvas)
			},
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
			this.drawCode();
			this.$refs.tt.focus();
		},
	}
</script>

<style scoped="scoped">
	#code_img {
	    width: 100px;
	    height: 40px;
		margin-left: 10px;
		cursor: pointer;
		vertical-align: top;
	}
	.d2{
		background-image: url(../images/a.jpg);
		width: 100%;
		height: 789px;
		margin-top: -20px;
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
		background: #444;
		color: #fff;
		border-radius: 15px;
		text-align: center;
		float: left;
		margin: 150px 1000px
	}
	
	#h:hover{
		cursor: pointer;
	}
	
	
</style>
