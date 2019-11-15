<template>
	<div>
		<div>
			<label for="name" id="t">
				<p>修改密码</p>
			</label>
		</div>
		<form id="fid">
			<div class="row">
				<div class="col-md-3 col-md-offset-2">
					<label for="name"></label>
					<input type="hidden" class="form-control" name="password" placeholder="uid" v-model="uid">
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 col-md-offset-2">
					<h3>
						<label for="name">请输入新密码</label>
					</h3>
					<input type="password" class="form-control" name="password" placeholder="请输入密码" v-model="password">
				</div>
			</div><br>
			<div class="row">
				<div class="col-md-3 col-md-offset-2">
					<h3>
						<label for="name">请再次输入</label>
					</h3>
					<input type="password" class="form-control" name="password1" placeholder="请输入密码" v-model="password1" @keyup.enter="update">
				</div>
			</div> <br>
			<div class="row col-md-3 col-md-offset-2">
				<button type="button" class="btn btn-block" @click="update">修改</button>
			</div>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		created() {
			layer.msg("123")
		},
		data() {
			return {
				password: '',
				password1: '',
				 uid:this.$route.params.id
			}
		},
		methods: {
			update() {
				if(this.password==this.password1){
					axios.put("http://localhost/users",{
						uid:this.uid,
						password:this.password
					}).then((response)=>{
						layer.msg("修改成功")
					})
				}else{
					layer.msg("两次输入密码不相同")
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#t {
		height: 20%;
		width: 100%;
		margin-top: 10px;
		font-size: 25px;
		text-align: center;
		align-content: center;
	}

	#fid {
		width: 100%;
		margin-top: 40px;
	}

	#font {
		float: left;
		width: 100%;
		font-size: 25px;
		text-align: center;
		align-content: center;
	}

	input[type=text],
	input[type=password] {
		width: 500px;
	}
</style>
