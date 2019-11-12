<template>
	<div class="container" id="middle-left">
		<ul class="nav nav-pills nav-stacked">
			<li style="background-color: orange;height: 50px;line-height: 50px;border-radius:5px">全部分类<br /></li>
			<li><router-link to="/foodtype">水果</router-link></li>
			<li><router-link to="/foodtype">简餐</router-link></li>
			<li><router-link to="/foodtype">西餐</router-link></li>
			<li><router-link to="/foodtype" >中餐</router-link></li>
		</ul>		
	</div>
</template>

<script>
	
</script>

<style scoped="scoped">
	#middle-left {
		height: 100%;
		width: 20%;
		float: left;
		background-color:#F6F6F6 ;
		border-radius:5px;
		margin-left: 70px;
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