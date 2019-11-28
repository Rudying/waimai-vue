<template>
	<div class="container" id="middle-left">
		<ul class="nav nav-pills nav-stacked">
			<li style="background-color: orange;height: 50px;line-height: 50px;border-radius:5px">全部分类<br /></li>
			<li v-for="item in list">
				<router-link :to="{path:'/foodtype',query: {id:item.tid }}">{{item.tname}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		mounted() {
			this.getList();
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList() {
				axios.get('http://localhost/type')
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			}
		}
	}
</script>

<style scoped="scoped">
	#middle-left {
		height: 100%;
		width: 20%;
		float: left;
		background-color: #F6F6F6;
		border-radius: 5px;
		margin-left: 70px;
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