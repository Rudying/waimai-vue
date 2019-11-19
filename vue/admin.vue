<template>
	<div>
		<div id="span" style="text-align: center;">
			<h1>后台管理</h1>
		</div>
		<div  id="admin" class="col-md-10 col-md-offset-1">
			<div id="admin-left" class="col-md-2">
			    <ul class="nav nav-pills nav-stacked">    
			    <li><router-link to="/permission">权限管理</router-link></li>
			    <li><router-link to="/role">角色管理</router-link></li>
			    <li><router-link to="/user">用户管理</router-link></li>
			    <li><router-link to="/address">用户地址管理</router-link></li>
			    <li><router-link to="/advice">用户投诉管理</router-link></li>
			    <li><router-link to="/collection">用户收藏管理</router-link></li>
			    <li><router-link to="/comment">用户评价管理</router-link></li>
			    <li><router-link to="/element">订单项管理</router-link></li>
			    <li><router-link to="/order">订单管理</router-link></li>
			    <li><router-link to="/food">菜品管理</router-link></li> 
			    <li><router-link to="/store">商家管理</router-link></li>
			    <li><router-link to="/type">菜品类型管理</router-link></li>			 
		</ul>	
			</div>
			<div id="admin-right" class="col-md-9">
				<router-view name="show"></router-view>
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style scoped="scoped">
	#span{
		padding-bottom: 30px;
	}
	#admin{
		height: 700px;
	}
	#admin-left{
		height: 100%;
		background-color:#F6F6F6 ;
		border-radius:5px;
	}
	#admin-right{
		height:100% ;
		border-radius:5px;
		margin-left: 40px;
	}
	ul{
		list-style-type:none;  
	}
	li{
		margin-top: 5px;
		color: white;
		text-align: center;
		font-size: large;	
	}
</style>