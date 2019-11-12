<template>
	<div id="a">
		<div id="add">
			<form id="SaveForm">
				菜品名称：<input type="text" id="" v-model="fname" /><br /> 菜品类型：
				<select v-model="tid">
					<option v-for="item in type" :value='item.tid'>{{item.tname}}</option>
				</select>
				</br>
				所属店铺：
				<select v-model="sid">
					<option v-for="item in shop" :value='item.sid'>{{item.sname}}</option>
				</select>
				</br>
				菜品描述：<input type="text" v-model="finfo" /><br /> 单价：
				<input type="text" v-model="fprice" /><br /> 图片： <input type="file" multiple="multiple" id="photo" /><br />
				<button class="btn btn-success" @click="save">添加</button>
			</form>
		</div>
		<div id="update">
			<form id="UpdateForm">
				<input type="hidden" v-model="fid" /> 菜品名称：
				<input type="text" id="" v-model="fname2" /><br /> 菜品类型：
				<select v-model="tid2">
					<option v-for="item in type" :value='item.tid'>{{item.tname}}</option>
				</select>
				</br>
				所属店铺：
				<select v-model="sid2">
					<option v-for="item in shop" :value='item.sid'>{{item.sname}}</option>
				</select>
				</br>
				菜品描述：<input type="text" v-model="finfo2" /><br /> 单价：
				<input type="text" v-model="fprice2" /><br /> 图片： <input type="file" multiple="multiple" id="photo2" /><br />
				<button class="btn btn-success" @click="update">修改</button>
			</form>
		</div>
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>菜品类型</th>
					<th>所属店铺</th>
					<th>菜品名称</th>
					<th>描述</th>
					<th>图片</th>
					<th>单价</th>
					<th>编辑</th>
					<th>删除</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list">
				<tr>
					<td>{{index+1}}</td>
					<td>{{item.type.tname}}</td>
					<td>{{item.shop.sname}}</td>
					<td>{{item.fname}}</td>
					<td>{{item.finfo}}</td>
					<td v-for="a in (item.fphoto.split(','))">
						<img :src="host+a" style="width: 100px;height: 100px;"/>
					</td>
					<td>{{item.fprice}}</td>
					<td><button class="btn btn-success" @click="ShowUpdate(item)">修改</button></td>
					<td><button class="btn btn-danger" @click="del(item.fid)">删除</button></td>
				</tr>
			</tbody>
		</table>
		<button class="btn btn-info" @click="showSave">添加类型</button>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		mounted() {
			this.getList();
			this.getType();
			this.getShop();
			$("#add").hide();
			$("#update").hide();
		},
		data() {
			return {
				layerRef: null,
				list: [],
				type: [],
				shop: [],
				fid: "",
				fname: "",
				finfo: "",
				fprice: "",
				sid: "",
				tid: "",
				fname2: "",
				finfo2: "",
				fprice2: "",
				sid2: "",
				tid2: "",
				host:"http://localhost/images/"
			}
		},
		methods: {
			getType() {
				axios.get('http://localhost/type')
					.then(res => {
						this.type = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			getShop() {
				axios.get('http://localhost/shop')
					.then(res => {
						this.shop = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			getList() {
				axios.get('http://localhost/food')
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})

			},
			del(id) {
				axios.post(`http://localhost/food/${id}`)
					.then(res => {
						layer.msg("删除成功");
						this.getList();
					})
					.catch(err => {
						console.error(err);
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
				var formData = new FormData() // 声明一个FormData对象
				var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
				formData.append("tid", this.tid);
				formData.append("sid", this.sid);
				formData.append("fname", this.fname);
				formData.append("finfo", this.finfo);
				formData.append("fprice", this.fprice);
				var files = $("#photo")[0].files;
				for(var i = 0; i < files.length; i++) {
					formData.append("photo", $("#photo")[0].files[i]);
				}
				axios.post('http://localhost/food', formData)
					.then(res => {
						layer.close(this.layerRef);
						this.getList();
						this.fname = "";
						this.finfo = "";
						this.fprice = "";
						this.sid = "";
						this.tid = "";
					})
			},
			ShowUpdate(item) {
				this.fid = item.fid;
				this.fname2 = item.fname;
				this.finfo2 = item.finfo;
				this.fprice2 = item.fprice;
				this.sid2 = item.shop.sid;
				this.tid2 = item.type.tid;
				this.layerRef = layer.open({
					type: 1,
					skin: 'layui-layer-rim', //加上边框
					area: ['420px', '240px'], //宽高
					content: $("#update")
				});
			},
			update() {
				var formData = new FormData() // 声明一个FormData对象
				var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
				formData.append("fid", this.fid);
				formData.append("tid", this.tid2);
				formData.append("sid", this.sid2);
				formData.append("fname", this.fname2);
				formData.append("finfo", this.finfo2);
				formData.append("fprice", this.fprice2);
				var files = $("#photo2")[0].files;
				for(var i = 0; i < files.length; i++) {
					formData.append("photo", $("#photo2")[0].files[i]);
				}
				axios.post('http://localhost/food/update', formData)
					.then(res => {
						layer.close(this.layerRef);
						this.getList();
						this.fid = "";
						this.fname2 = "";
						this.finfo2 = "";
						this.fprice2 = "";
						this.sid2 = "";
						this.tid2 = "";
					})
			},
		}
	}
</script>

<style>

</style>