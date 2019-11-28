<template>
	<div>
		<div id="add">
			<form id="SaveForm">
				城市
				<select v-model="city">
					<option></option>
				</select>
				</br>
				街道：
				<select v-model="street">
					<option></option>
				</select>
				</br>
				详细地址：<input type="text" v-model="uinfo" /><br /> 电话：
				<input type="text" v-model="tel" /><br />
				<button class="btn btn-success" @click="save">添加</button>
			</form>
		</div>
		<div id="update">
			<form id="UpdateForm">
				城市
				<select v-model="city">
					<option></option>
				</select>
				</br>
				街道：
				<select v-model="street">
					<option></option>
				</select>
				</br>
				详细地址：<input type="text" v-model="uinfo" /><br /> 电话：
				<input type="text" v-model="tel" /><br />
				<button class="btn btn-success" @click="update">修改</button>
			</form>
		</div>
		<div class="col-md-8 col-md-offset-2">
			<table class="table">
				<thead>
					<div><span><h3>选择地址</h3></span></div>
					<tr>
						<th>姓名</th>
						<th>电话</th>
						<th>城市</th>
						<th>街道</th>
						<th>详细地址</th>
						<th></th>
					</tr>
				</thead>
				<tbody v-for="(item,index) in address">
					<tr>
						<td>{{item.users.username}}</td>
						<td>{{item.tel}}</td>
						<td>{{item.city}}</td>
						<td>{{item.street}}</td>
						<td>{{item.uinfo}}</td>
						<td><input type="radio" class="radio" value="item.uaid" v-model="uaid" /></td>
					</tr>
				</tbody>
				<tr>
					<td colspan="5">
						<button type="button" class="btn btn-success col-md-offset-10">添加地址</button>
					</td>
				</tr>
			</table>
		</div>
		<div class="col-md-8 col-md-offset-2">
			<div>
				<table class="table" style="height: 200px;">
					<thead>
						<div><span><h3>购物车详情</h3></span></div>
						<tr>
							<th>菜品</th>
							<th>菜品名称</th>
							<th>单价 </th>
							<th>数量</th>
						</tr>
					</thead>
					<tbody v-for="item in car">
						<div><span><h4>店铺名称：{{item.shop.sname}}</h4></span></div>
						<tr>
							<td>
								<img :src="host+item.fphoto" style="width: 50px;" />
							</td>
							<td>{{item.fname}}</td>
							<td>{{item.fprice}}</td>
							<td>{{item.ccount}}</td>
						</tr>
						<tr>
							<td colspan="6">
								<span class="col-md-offset-9"><font style="color: #D43F3A;font-size: 25px;">总价：￥{{item.fprice*item.ccount}}</font></span>
								<button class="btn btn-success col-md-offset-10">去支付</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		created() {
			this.getUid();
		},
		data() {
			return {
				uname: store.state.loginName,
				uid: null,
				uaid: null,
				address: null,
				car: null,
				host: "http://localhost/images/",
			}
		},
		methods: {
			getUid() {
				//先根据用户名获取用户id
				var name = new URLSearchParams();
				name.append('username', this.uname);
				axios.post('http://localhost/users/findByName', name)
					.then(res => {
						this.uid = res.data;
						alert("uid:" + this.uid);
						this.getAddress();
						this.getCar();
					})
			},
			getSid() {
				//再根据用户id获取到商铺id
				axios.post('http://localhost/shop/' + this.uid)
					.then(res => {
						this.sid = res.data.sid;
						alert("sid:" + this.sid);
					})
			},
			getAddress() {
				axios.post('http://localhost/address/' + this.uid)
					.then(res => {
						this.address = res.data;
					})
			},
			getCar() {
				axios.post('http://localhost/car/' + this.uid)
					.then(res => {
						this.car = res.data;
						console.log(this.car);
					})
			}
		}
	}
</script>

<style></style>