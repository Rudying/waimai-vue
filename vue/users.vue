<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>用户名</th>
					<th>密码</th>
					<th>性别</th>
					<th>昵称</th>
					<th>邮箱</th>
					<th>电话</th>
					<th>重置密码</th>
					<th>禁用</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.username}}</td>
					<td>{{item.password}}</td>
					<td>{{item.sex}}</td>
					<td>{{item.nickname}}</td>
					<td>{{item.email}}</td>
					<td>{{item.photo}}</td>
					<td><button class="btn btn-success" @click="reset(item.uid)">重置密码</button></td>
					<td><button class="btn btn-danger" @click="forbid(item.uid)">禁用</button></td>
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
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList() {
				axios.get('http://localhost/users')
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			reset(id) {
				var self = this;
				layer.confirm('确定要重置吗？', {
					btn: ['确定', '取消'], //按钮
				}, function(index) {
					axios.post(`http://localhost/users/${id}`)
						.then(res => {
							layer.close(index);
							layer.msg("重置成功");
							self.getList();
						})
						.catch(err => {
							console.error(err);
						})
				});
			},
			forbid() {

			}
		}
	}
</script>

<style>

</style>