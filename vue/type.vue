<template>
	<div id="a">
		<div id="add">
			编号：<input type="text" v-model="tid" /><br />
			名称：<input type="text" v-model="tname" /><br />
			图片： <input type="file" id="tphoto" ref="tphoto" /><br />
			信息：<input type="text" v-model="tinfo" /><br />
			<button class="btn btn-success" @click="save">添加</button>
		</div>

		<div id="update">
			<input type="hidden" v-model="tid2" /><br />
			名称：<input type="text" v-model="tname2" /><br />
			图片：<input type="file" id="tphoto2" ref="tphoto2" /><br />
			信息：<input type="text" v-model="tinfo2" /><br />
			<button class="btn btn-success" @click="update">修改</button>
		</div>

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
		<!-- 分页 -->
		<div class="col-md-10 col-md-offset-1 text-center" id="page">
			<ul class="pagination">
				<li><a @click="first">首页</a></li>
				<li><a @click="prev">上一页</a></li>
				<li><a><span>{{currentPage}}</span>/<span
						>{{pageCount}}</span></a></li>
				<li><a @click="next">下一页</a></li>
				<li><a @click="last">尾页</a></li>
			</ul>
		</div>
		<button class="btn btn-info" @click="showSave">添加类型</button>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		created(){
			this.findcount(); //获得所有行数	
		},
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
				tinfo: "",
				tid2: "",
				tname2: "",
				tinfo2: "",
				host: "http://localhost/images/",
				currentPage:1, //当前页
				pageSize:2, //每页行数
				count: "", //总行数
				pageCount:"",//总页数
			}
		},
		methods: {
			last(){
				this.currentPage = this.pageCount;
				this.getList();
			},
			next(){
				if(this.currentPage<this.pageCount){
					this.currentPage += 1;
					this.getList();
				}else{
					this.currentPage = this.pageCount;
					layer.msg('已经是最后一页');
				}
				
			},
			prev(){
				if(this.currentPage>1){
					this.currentPage -= 1;
					this.getList();
				}else{
					this.currentPage = 1;
					layer.msg('已经是第一页');
				}
				
			},
			first(){
				this.currentPage = 1;
				this.getList();
			},
			findcount(){	
				axios.post('http://localhost/type/count')
				.then(res => {
					this.count = res.data;
				})
				.catch(err => {
					console.error('获取数据失败' + err);
				});
			},
			getPageCount(){
				this.pageCount=Math.ceil(this.count/this.pageSize); //向上取整
			},
			getList() {
				
				var param = new URLSearchParams();
				param.append('offset', this.currentPage);
				param.append('limit', this.pageSize);
				
				axios.post('http://localhost/type/find', param)
					.then(res => {
						this.list = res.data; //获得分页后得到的数据
						this.getPageCount(); //获得所有页数	
					})
					.catch(err => {
						console.error('获取数据失败' + err);
					})
			},
			del(id) {
				axios.post(`http://localhost/type/${id}`)
					.then(res => {
						layer.msg("删除成功");
						this.findcount(); //获得所有行数
						this.getList();
// 						if(this.currentPage>this.pageCount){
// 							this.prev();
// 						}	
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
				formData.append('photo', $("#tphoto")[0].files[0]) // 'userfile' 这个名字要和后台获取文件的名字一样;
				formData.append("tid", this.tid);
				formData.append("tname", this.tname);
				formData.append("tinfo", this.tinfo);
				axios.post("http://localhost/type", formData)
					.then(res => {
						layer.close(this.layerRef);
						this.findcount(); //获得所有行数
						this.getList();
						this.tid = '';
						this.tname = '';
						this.tinfo = '';
						this.$refs.tphoto.value = ''; //清空文件
					})

			},
			ShowUpdate(item) {
				this.tid2 = item.tid;
				this.tname2 = item.tname;
				this.tinfo2 = item.tinfo;
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

				formData.append("tid", this.tid2);
				formData.append("tname", this.tname2);
				formData.append("tinfo", this.tinfo2);
				formData.append("photo", $("#tphoto2")[0].files[0]);
				axios.post("http://localhost/type/update", formData)
					.then(res => {
						layer.close(this.layerRef);
						this.getList();
						this.tid2 = '';
						this.tname2 = '';
						this.tinfo2 = '';
						this.$refs.tphoto2.value = ''; //清空文件
					})
			},
		}
	}
</script>

<style>
	img {
		height: 80px;
		width: 100px;
	}
</style>
