<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>角色ID</th>
					<th>角色名称</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.rid}}</td>
					<td>{{item.rname}}</td>
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
				axios.get('http://localhost/roles')
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