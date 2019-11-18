<template>
		<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>用户名</th>
					<th>城市</th>
					<th>街道</th>
					<th>详细地址</th>
					<th>电话</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.users.username}}</td>
					<td>{{item.city}}</td>
					<td>{{item.street}}</td>
					<td>{{item.uinfo}}</td>
					<td>{{item.tel}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		mounted() {
			this.getList();
		},
		data(){
			return{
				list:[]
			}
		},
		methods: {
			getList() {
				axios.get('http://localhost/address')
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

<style>
</style>