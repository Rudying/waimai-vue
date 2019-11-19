<template>
	<div id="a">
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>评价人</th>
					<th>被评价菜品</th>
					<th>被评价店铺</th>
					<th>评价内容</th>
					<th>评价时间</th>
					<th>图片</th>
					<th>评分</th>
					<th>审核状态</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.user.username}}</td>
					<td>{{item.food.fname}}</td>
					<td>{{item.food.shop.sname}}</td>
					<td>{{item.cinfo}}</td>
					<td>{{dateFormat(item.ctime)}}</td>
					<td v-for="a in (item.cphoto.split(','))">
						<img :src="host+a" style="width: 100px;height: 100px;" />
					</td>
					<td>{{item.ccoin}}</td>
					<td>
						<button class="btn btn-success" @click="deal(item.cstatus,item.cid)">{{item.cstatus==1?'审核通过':'未审核'}}</button>
					</td>
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
				host: "http://localhost/images/",
				shop:""
			}
		},
		methods: {
			getList() {
				axios.get('http://localhost/comment')
					.then(res => {
						this.list = res.data;
						console.log(list);
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			dateFormat(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一 如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
			deal(cstatus, cid) {
				var param = new URLSearchParams();
				param.append('cstatus', cstatus);
				param.append('cid', cid);
				axios.post('http://localhost/comment/deal',param)
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