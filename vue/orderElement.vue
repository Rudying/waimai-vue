<template>
	<div id="a">
		订单详情：<input v-model="num" placeholder="请输入订单编号" />
		<button class="btn btn-info" @click="search">查询</button>
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>订单编号</th>
					<th>下单用户</th>
					<th>店铺名称</th>
					<th>商品信息</th>
					<th>商品单价</th>
					<th>购买数量</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.order.onumber}}</td>
					<td>{{item.order.user.username}}</td>
					<td>{{item.order.shop.sname}}</td>
					<td>{{item.fname}}</td>
					<td>{{item.fprice}}</td>
					<td>{{item.ecount}}</td>
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
				list: [],
				num: ''
			}
		},
		methods: {
			getList() {
				axios.get("http://localhost/element")
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			search() {
				var param = new URLSearchParams();
				param.append('num',this.num);
				axios.post("http://localhost/element/search",param)
					.then(res => {
						this.list = res.data;
						console.log(this.list)
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