<template>
	<div id="a">
		<div id="add">
			<form id="SaveForm" class="form">
				<div class="form-group">
					<label class="col-sm-2 control-label">店铺名：</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" v-model="sname" placeholder="为店铺起一个名字">
					</div>
				</div><br />
				<div class="form-group">
					<label class="col-sm-2 control-label">联系方式：</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" v-model="stel" placeholder="输入店铺的联系方式">
					</div>
				</div><br />
				<div class="form-group">
					<label class="col-sm-2 control-label">地址：</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" v-model="saddress" placeholder="输入店铺的地址">
					</div>
				</div><br />
				<div class="form-group">
					<label class="col-sm-2 control-label">商铺描述</label>
					<textarea class="form-control" v-model="sinfo" rows="3" placeholder="简单描述一下你的店铺。。。"></textarea>
				</div>
				<button class="btn btn-success" @click="save">注册成为商家</button>
			</form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		props: ["uname"],
		mounted() {
			this.getUid();
		},
		data() {
			return {
				sname: '',
				stel: '',
				saddress: '',
				sinfo: '',
				uid: null
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
						this.getSid();
					})
			},
			getSid() {
				//再根据用户id获取到商铺id
				axios.post('http://localhost/shop/' + this.uid)
					.then(res => {
						if(res.data.sid!=null){
							layer.msg("您已注册成为商家，请勿重复添加")
						}
					})
			},
			save() {
				var param = new URLSearchParams();
				param.append('uid', this.uid);
				param.append('sname', this.sname);
				param.append('stel', this.stel);
				param.append('saddress', this.saddress);
				param.append('sinfo', this.sinfo);
				axios.post('http://localhost/shop', param)
					.then(res => {
						layer.msg("添加成功");
						this.sname = "";
						this.stel = "";
						this.saddress = "";
						this.sinfo = "";
					})
					.catch(err => {
						console.error('添加失败' + err);
					})
			}
		}
	}
</script>

<style>

</style>