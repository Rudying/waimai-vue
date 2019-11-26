<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>订单编号</th>
					<th>用户名</th>
					<th>商铺名</th>
					<th>用户地址</th>
					<th>下单时间</th>
					<th>订单备注</th>
					<th>订单状态</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.onumber}}</td>
					<td>{{item.user.username}}</td>
					<td>{{item.shop.sname}}</td>
					<td>{{item.oaddress}}</td>
					<td>{{dateFormat(item.createtime)}}</td>
					<td>{{item.omessage}}</td>
					<td><span>{{item.ostatus==1?'未接单':'已接单'}}</span></td>
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
				axios.get("http://localhost/orders")
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

				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
			show() {
				var status = $("span");
				var arr = new Array;
				status.each(function() {
					arr.push($(this).val());
				});
				alert(arr);
			}
		}
	}
</script>

<style>

</style>