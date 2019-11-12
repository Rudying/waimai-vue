<template>
	<div class="container" id="middle-right">
		<div id="right-top">
			<carousel class="index-carousel" :autoplay="true" :minSwipeDistance="40" :scrollPerPage="true" :speed="500" :perPage="1"
			 :paginationPadding="10" :paginationSize="10" :loop="true" @param="right">
				<slide>
					<img src="../images/lb1.png" class="img-responsive" />
				</slide>
				<slide>
					<img src="../images/lb2.png" class="img-responsive" />
				</slide>
				<slide>
					<img src="../images/lb3.png" class="img-responsive" />
				</slide>
			</carousel>
		</div>
		<div id="right-bottom">
			<router-view name="right-bottom">
			</router-view>
		
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	 img{
		 height: 300px;
		 width: 100%;
		 border-radius: 5px;
	 }
	#middle-right {
		width: 72%;
		height: 1000px;
		float: left;
		margin-left: 10px;
	}

	#right-top {
		height: 400px;
		width: 100%;
	}

	#right-bottom {
		height: 600px;
		width: 100%;
		float: left;
	}
</style>
