<template>
	<div id="a">
		<div id="add">
			<form id="SaveForm">
				菜品名称：<input type="text" id="" v-model="fname" /><br /> 菜品类型：
				<select v-model="tid">
					<option v-for="item in type" :value='item.tid'>{{item.tname}}</option>
				</select>
				</br>
				菜品描述：<input type="text" v-model="finfo" /><br /> 单价：
				<input type="text" v-model="fprice" /><br /> 图片： <input type="file" multiple="multiple" id="photo" ref="photo" /><br />
				<button class="btn btn-success" @click="save">添加</button>
			</form>
		</div>
		<div id="update">
			<form id="UpdateForm">
				<input type="hidden" v-model="fid" /> 
				<input type="hidden" v-model="sid" />
				菜品名称：
				<input type="text" id="" v-model="fname2" /><br /> 菜品类型：
				<select v-model="tid2">
					<option v-for="item in type" :value='item.tid'>{{item.tname}}</option>
				</select>
				</br>
				菜品描述：<input type="text" v-model="finfo2" /><br /> 单价：
				<input type="text" v-model="fprice2" /><br /> 图片： <input type="file" multiple="multiple" id="photo2" ref="photo2" /><br />
				<button class="btn btn-success" @click="update">修改</button>
			</form>
		</div>
		<table class="table table-border table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>菜品类型</th>
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
					<td>{{item.fname}}</td>
					<td>{{item.finfo}}</td>
					<td v-for="a in (item.fphoto.split(','))">
						<img :src="host+a" style="width: 100px;height: 100px;" />
					</td>
					<td>{{item.fprice}}</td>
					<td><button class="btn btn-success" @click="ShowUpdate(item)">修改</button></td>
					<td><button class="btn btn-danger" @click="del(item.fid)">删除</button></td>
				</tr>
			</tbody>
		</table>
		<!-- 分页 -->
		<div class="col-md-10 col-md-offset-1 text-center" id="page">
			<ul class="pagination">
				<li>
					<a @click="first">首页</a>
				</li>
				<li>
					<a @click="prev">上一页</a>
				</li>
				<li>
					<a><span>{{currentPage}}</span>/<span>{{pageCount}}</span></a>
				</li>
				<li>
					<a @click="next">下一页</a>
				</li>
				<li>
					<a @click="last">尾页</a>
				</li>
			</ul>
		</div>
		<button class="btn btn-info" @click="showSave" style="margin-top: 10px;">添加菜品</button>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		props: ["uname"],
		created() {
			this.findcount(); //获得所有行数	
			this.getUid();
		},
		mounted() {		
			this.getType();			
			$("#add").hide();
			$("#update").hide();
		},
		data() {
			return {
				layerRef: null,
				list: [],
				type: [],
				fid: "",
				fname: "",
				finfo: "",
				fprice: "",
				sid: null,
				uid:"",
				tid: "",
				fname2: "",
				finfo2: "",
				fprice2: "",
				tid2: "",
				host: "http://localhost/images/",
				currentPage: 1, //当前页
				pageSize: 3, //每页行数
				count: "", //总行数
				pageCount: "", //总页数
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
						this.getSid();
					})
			},
			getSid() {
				//再根据用户id获取到商铺id
				axios.post('http://localhost/shop/'+this.uid)
					.then(res => {
						this.sid = res.data.sid;
						alert("sid:" + this.sid);
						this.getList();
					})
			},
			getType() {
				axios.get('http://localhost/type')
					.then(res => {
						this.type = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			getList() {
				var param = new URLSearchParams()
				param.append('offset', this.currentPage)
				param.append('limit', this.pageSize)
				param.append('sid', this.sid)
				axios.post('http://localhost/food/findBySid',param)
					.then(res => {
						this.list = res.data;
						this.getPageCount(); //获得所有页数	
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			last() {
				this.currentPage = this.pageCount;
				this.getList();
			},
			next() {
				if(this.currentPage < this.pageCount) {
					this.currentPage += 1;
					this.getList();
				} else {
					this.currentPage = this.pageCount;
					layer.msg('已经是最后一页');
				}
			},
			prev() {
				if(this.currentPage > 1) {
					this.currentPage -= 1;
					this.getList();
				} else {
					this.currentPage = 1;
					layer.msg('已经是第一页');
				}
			},
			first() {
				this.currentPage = 1;
				this.getList();
			},
			findcount() {
				axios.post('http://localhost/food/count')
					.then(res => {
						this.count = res.data;
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					});
			},
			getPageCount() {
				this.pageCount = Math.ceil(this.count / this.pageSize); //向上取整
			},

			del(id) {
				var self = this;
				layer.confirm('确定要删除吗？', {
					btn: ['确定', '取消'], //按钮
				}, function(index) {
					axios.post(`http://localhost/food/${id}`)
						.then(res => {
							layer.close(index);
							layer.msg("删除成功");
							self.getList();
						})
						.catch(err => {
							console.error(err);
						})
				});
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
//						this.getUid();
						this.getList();
						this.fname = "";
						this.finfo = "";
						this.fprice = "";
						this.tid = "";
						this.$refs.photo.value = ''; //清空文件
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
				formData.append("sid", this.sid);
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
						this.getUid();
						this.fid = "";
						this.fname2 = "";
						this.finfo2 = "";
						this.fprice2 = "";
						this.tid2 = "";
						this.$refs.photo2.value = ''; //清空文件
						
						
					})
			},
		}
	}
</script>

<style></style>