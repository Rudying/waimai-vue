<template>
	<div>
		<div id="add">
			<form id="SaveForm">
				城市
				<select v-model="city">
					<option>北京</option>
					<option>上海</option>
					<option>西安</option>
				</select>
				</br>
				街道：
				<select v-model="street">
					<option>sdfsfs</option>
					<option>dsadsad</option>
					<option>dsadas</option>
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
				<select v-model="city2">
					<option>北京</option>
					<option>上海</option>
					<option>西安</option>
				</select>
				</br>
				街道：
				<select v-model="street2">
					<option>sdfsfs</option>
					<option>dsadsad</option>
					<option>dsadas</option>
				</select>
				</br>
				详细地址：<input type="text" v-model="uinfo2" /><br /> 电话：
				<input type="text" v-model="tel2" /><br />
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
						<th>编辑</th>
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
						<button class="btn btn-success" @click="showUpdate(item)">修改</button>
						<td><input type="radio" class="radio" :value="item.uaid" v-model="uaid" @click="point"/></td>
					</tr>
				</tbody>
				<tr>
					<td colspan="5">
						<button type="button" class="btn btn-success" @click="showSave">添加新地址</button>
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
							<th>商铺</th>
							<th>菜品名称</th>
							<th>单价 </th>
							<th>数量</th>
						</tr>
					</thead>
					<tbody v-for="item in car">
						<tr>
							<td>
								<img :src="host+item.fphoto" style="width: 50px;" />
							</td>
							<td>{{item.shop.sname}}</td>
							<td>{{item.fname}}</td>							
							<td>{{item.fprice}}</td>
							<td>{{item.ccount}}</td>
						</tr>
					</tbody>
					<textarea class="form-control" v-model="omessage" rows="3" placeholder="写下你的备注。。。"></textarea>
						<tr>
							<td colspan="6">
								<span class="col-md-offset-9"><font style="color: #D43F3A;font-size: 25px;">总价：￥{{price}}</font></span>
								<button class="btn btn-success col-md-offset-10" @click="pay">去支付</button>
							</td>
						</tr>
				</table>
			</div>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		mounted() {
			$("#add").hide();
			$("#update").hide();
		},
		created() {
			this.getUid();
		},
		data() {
			return {
				uname: store.state.loginName,
				layerRef: null,
				uid: null,
				uaid: null,
				address: null,
				car: null,
				host: "http://localhost/images/",
				city: null,
				street: null,
				uinfo: null,
				tel: null,
				city2: null,
				street2: null,
				uinfo2: null,
				tel2: null,
				carElement:null,
				price:null,
				omessage:null
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
                        this.getPrice();
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
//						for (var i=0;i<this.car.length;i++) {
//							this.getCarElement(this.car[i].shop.sid,this.uid);
//						}						
					})
			},
//			getCarElement(sid,uid){
//				var param = new URLSearchParams();
//				param.append('sid', sid);
//				param.append('uid', uid);
//				axios.post('http://localhost/car',param)
//				.then(res=>{
//					this.carElement=res.data;
//					console.log(this.carElement);
//				})
//			}, 
            getPrice(){
            	axios.post('http://localhost/car/findPrice/'+this.uid)
            	.then(res=>{
            		this.price=res.data;
            	})
            },
			showSave() {
				this.layerRef = layer.open({
					type: 1,
					skin: 'layui-layer-rim', //加上边框
					area: ['420px', '240px'], //宽高
					content: $("#add")
				});
			},
			save() {
				var param = new URLSearchParams();
				param.append('uid', this.uid);
				param.append('city', this.city);
				param.append('street', this.street);
				param.append('uinfo', this.uinfo);
				param.append('tel', this.tel);
				axios.post('http://localhost/address/', param)
					.then(res => {
						layer.close(this.layerRef);
						this.getUid();
						this.city = "";
						this.street = "";
						this.uinfo = "";
						this.tel = "";
					})

			},
			showUpdate(item) {
				this.uaid = item.uaid;
				this.city2 = item.city;
				this.street2 = item.street;
				this.uinfo2 = item.uinfo;
				this.tel2 = item.tel;
				this.layerRef = layer.open({
					type: 1,
					skin: 'layui-layer-rim', //加上边框
					area: ['420px', '240px'], //宽高
					content: $("#update")
				});
			},
			update() {
				var param = new URLSearchParams();
				param.append('uaid', this.uaid);
				param.append('uid', this.uid);
				param.append('city', this.city2);
				param.append('street', this.street2);
				param.append('uinfo', this.uinfo2);
				param.append('tel', this.tel2);
				axios.post('http://localhost/address/update', param)
					.then(res => {
						layer.close(this.layerRef);
						this.getUid();
						this.uaid="";
						this.city2 = "";
						this.street2 = "";
						this.uinfo2 = "";
						this.tel2 = "";
					})
			},
			pay(){
				
			},
			point(){
				alert(this.uaid);
			}
		}
	}
</script>

<style></style>