<template>
	<div>
		<table class="table table-striped">
			<caption>
				<h3>个人详情</h3>
			</caption>
			<thead>
				<tr>
					<th>姓名</th>
					<th>昵称</th>
					<th>性别</th>
					<th>email</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{this.list.username}}</td>
					<td>{{this.list.nickname}}</td>
					<td>{{this.list.sex}}</td>
					<td>{{this.list.email}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		created() {
			axios.get("http://localhost/users/findOne/" + this.uid).then((response) => {
				this.list = response.data;
				// layer.msg(this.uid)
			})
		},
		data() {
			return {
				uid: this.$route.params.id,
				list: []
			}
		},
	}
</script>

<style>
</style>
