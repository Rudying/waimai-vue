<template>
	<div id="a">
		<div id="add">
			<form enctype="multipart/form-data" name="photo" id="myForm">
			编号：<input type="text" v-model="tid" /><br /> 
			名称：<input type="text" v-model="tname" /><br /> 
			图片： <input type="file" /><br />
			信息：<input type="text" v-model="tinfo" /><br /> 
			<button class="btn btn-success" @click="save">添加</button>
			</form>
		</div>
		<!--<div id="update">
			<input type="hidden" v-model="tid" /><br /> 名称：
			<input type="text" v-model="tname" /><br /> 图片： <input type="file" v-on:change="tphoto" /><br />
			<button class="btn btn-success" @click="update">修改</button>
		</div>-->
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>类型名称</th>
					<th>图片</th>
					<th>详细内容</th>
					<th>编辑</th>
					<th>删除</th>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="index">
				<tr>
					<td>{{item.tid}}</td>
					<td>{{item.tname}}</td>
					<td><img :src="host+item.tphoto" alt=""></td>
					<td>{{item.tinfo}}</td>
					<td><button class="btn btn-success" @click="ShowUpdate(item)">修改</button></td>
					<td><button class="btn btn-danger" @click="del(item.tid)">删除</button></td>
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
			$("#add").hide();
			$("#update").hide();
		},
		data() {
			return {
				layerRef: null,
				list: [],
				tid: "",
				tname: "",
				tphoto: "",
				tinfo: "",
				host: "http://localhost/images/"
			}
		},
		methods: {
			
			//获取图片地址
// 			getImgUrl(tphoto){
// 			   return require("http://localhost/images/"+tphoto);
// 			},
 
			getList() {
				axios.get('http://localhost/type')
					.then(res => {
						this.list = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			del(id) {
				axios.post(`http://localhost/type/${id}`)
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
				formData.append('photo', document.querySelector('input[type=file]').files[0]) // 'userfile' 这个名字要和后台获取文件的名字一样;
				formData.append("tid", this.tid);
				formData.append("tname", this.tname);
				formData.append("tinfo", this.tinfo);
				axios({
					method: "post",
					url: "http://localhost/type", // 算签名，不需要可以去掉
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data', // 文件上传
					},
				}).then(function(response) {
					console.log(response);
				})
			},
			ShowUpdate(item) {
				this.tid = item.tid;
				this.tname = item.tname;
				this.layerRef = layer.open({
					type: 1,
					skin: 'layui-layer-rim', //加上边框
					area: ['420px', '240px'], //宽高
					content: $("#update")
				});
			},
			update() {
				var param = new URLSearchParams()
				param.append('uid', this.nuid)
				param.append('username', this.nname)
				param.append('password', this.npass)
				axios.post('users/update', param)
					.then(res => {
						alert("修改成功");
						this.getList();
						this.tname = "";
						this.tphoto = "";
						this.tuid = "";
						layer.close(this.layerRef);
					})
			},
		}
	}
</script>

<style>
	img{
		height: 80px;
		width: 100px;
		}
</style>