<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>投诉用户</th>
					<th>被投诉门店</th>
					<th>投诉内容</th>
					<th>审核状态</th>
					<th>删除</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.uid}}</td>
					<td>{{item.sid}}</td>
					<td>{{item.ainfo}}</td>
					<td><button class="btn btn-success" @click="deal(item.astatus,item.adid)">{{item.astatus==1?'已处理':'未处理'}}</button></td>
					<td><button class="btn btn-danger" @click="del(item.adid)">删除</button></td>
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
				axios.get('http://localhost/advices')
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			del(id) {
				axios.post(`http://localhost/advices/${id}`)
					.then(res => {
						layer.msg("删除成功");
						this.getList();
					})
					.catch(err => {
						console.error(err);
					})
			},
			deal(astatus, adid) {
				var param = new URLSearchParams()
				param.append('astatus', astatus)
				param.append('adid', adid)
				axios.post('http://localhost/advices/change',param)
					.then(res => {
						this.getList();
					})
					.catch(err => {
						console.error(err);
					})
			}
		}
	}
</script>

<style>

</style>