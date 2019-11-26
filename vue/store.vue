<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>店主</th>
					<th>店铺名称</th>
					<th>店铺描述</th>
					<th>联系电话</th>
					<th>店铺地址</th>
					<th>开店时间</th>
					<th>打烊时间</th>
					<th>营业状态</th>
					<th>评分</th>
					<th>联系商家</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.users.username}}</td>
					<td>{{item.sname}}</td>
					<td>{{item.sinfo}}</td>
					<td>{{item.stel}}</td>
					<td>{{item.saddress}}</td>
					<td>{{dateFormat(item.opentime)}}</td>
					<td>{{dateFormat(item.closetime)}}</td>
					<td>{{item.sstatus==1?'营业中':'休业中'}}</td>
					<td>{{item.coin}}</td>
					<td><button class="btn btn-info">联系商家</button></td>
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
				axios.get('http://localhost/shop')
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			dateFormat(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return  hours + ":" + minutes + ":" + seconds;
			}
		}
	}
</script>

<style>

</style>