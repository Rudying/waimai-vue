<template>
	<div class="container" id="box">
		<div id="top">
			<div id="top_1">t1</div>
			<div id="top_2">
				<h3 align="center" style="color: #3498DB;">
					个人中心
				</h3>
			</div>
			<div id="top_3">t3</div>
		</div>
		<div id="middle">
			<div id="middle_1">
				<div id="m">
					<router-link to="/mymsg1/1">我的信息</router-link>
				</div>
				
				<div id="m">
					<router-link to="/myeva">我的评价</router-link>
				</div>
				
				<div id="m">
					<router-link to="/mycol">我的收藏</router-link>
				</div>
				
				<div id="m">
					<router-link to="/myaddress">我的地址</router-link>
				</div>
				
				<div id="m">
					<router-link to="/myorder">我的订单</router-link>
				</div>
				
				<div id="m">
					<router-link to="/password/1">修改密码</router-link>
				</div>
			</div>
			<div id="middle_2">
				<router-view name="mymsg1"></router-view>
				<router-view name="password"></router-view>
			</div>
		</div>
		<div id="buttom">
			buttom
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	#box{
		border: #000000 solid 0.0625rem;
	}
	#top{
		border: #000000 solid 0.0625rem;
		height: 100px;
		width: auto;
	}
	#top_1{
		border: #000000 solid 0.0625rem;
		height: 100%;
		width: 20%;
		float: left;
	}
	#top_2{
		border: #000000 solid 0.0625rem;
		height: 100%;
		width: 60%;
		float: left;
	}
	#top_3{
		border: #000000 solid 0.0625rem;
		height: 100%;
		width: 20%;
		float: left;
	}
	#middle{
		border: #000000 solid 0.0625rem;
		height: 557px;
	}
	#middle_1{
		margin-top: 10px;
		/* border: #000000 solid 0.0625rem; */
		height: 557px;
		width: 20%;
		float: left;
	}
	#m{
		margin-top: 45px;
		align-content: center;
		font-size: 25px;
		text-align: center;
	}
	#middle_2{
		border: #000000 solid 0.0625rem;
		height: 557px;
		width: 80%;
		float: left;
	}
	#buttom{
		border: #000000 solid 0.0625rem;
		height: 80px;
	}
</style>
