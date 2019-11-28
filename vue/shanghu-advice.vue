<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>投诉内容</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.ainfo}}</td>
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