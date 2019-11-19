<template>
	<div id="shop">
		<div class="m-result" style="float: left;">
			<ul id="showgoods">
				<li class="goods">
					<div class="goodswrap promotion">
						<a href="#">
							<div class="img">
								<img class="imgtag" src="images/xx.jpg">
							</div>
						</a>
						<div class="desc clearfix">
							<p class="price"> <span class="cur"><i>¥</i>99</span> </p>
							<div class="titlewrap">
								<a class="title" href="#">
									<h3>杜记 黄焖鸡米饭 量大 肉多 欢迎回头客</h3>
								</a>
							</div>
							<a href="#" class="addcart" title="gid">
		
								<button class="btn btn-danger glyphicon glyphicon-shopping-cart" style="font-size: 18px;">加入购物车</button>
		
							</a>
						</div>
					</div>
				</li>
				<li class="goods">
					<div class="goodswrap promotion">
						<a href="#">
							<div class="img">
								<img class="imgtag" src="images/xx.jpg">
							</div>
						</a>
						<div class="desc clearfix">
							<p class="price"> <span class="cur"><i>¥</i>99</span> </p>
							<div class="titlewrap">
								<a class="title" href="#">
									<h3>杜记 黄焖鸡米饭 量大 肉多 欢迎回头客</h3>
								</a>
							</div>
							<a href="#" class="addcart" title="gid">
						
								<button class="btn btn-danger glyphicon glyphicon-shopping-cart" style="font-size: 18px;">加入购物车</button>
						
							</a>
						</div>
					</div>
				</li>
				<li class="goods">
					<div class="goodswrap promotion">
						<a href="#">
							<div class="img">
								<img class="imgtag" src="images/xx.jpg">
							</div>
						</a>
						<div class="desc clearfix">
							<p class="price"> <span class="cur"><i>¥</i>99</span> </p>
							<div class="titlewrap">
								<a class="title" href="#">
									<h3>杜记 黄焖鸡米饭 量大 肉多 欢迎回头客</h3>
								</a>
							</div>
							<a href="#" class="addcart" title="gid">
						
								<button class="btn btn-danger glyphicon glyphicon-shopping-cart" style="font-size: 18px;">加入购物车</button>
						
							</a>
						</div>
					</div>
				</li>
				<li class="goods">
					<div class="goodswrap promotion">
						<a href="#">
							<div class="img">
								<img class="imgtag" src="images/xx.jpg">
							</div>
						</a>
						<div class="desc clearfix">
							<p class="price"> <span class="cur"><i>¥</i>99</span> </p>
							<div class="titlewrap">
								<a class="title" href="#">
									<h3>杜记 黄焖鸡米饭 量大 肉多 欢迎回头客</h3>
								</a>
							</div>
							<a href="#" class="addcart" title="gid">
						
								<button class="btn btn-danger glyphicon glyphicon-shopping-cart" style="font-size: 18px;">加入购物车</button>
						
							</a>
						</div>
					</div>
				</li>
		        
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	#shop {
		height: 100%;
		width: 100%;
		background-color: azure;
		text-align: center;
		border-radius: 5px;
		float: left;		
	}
	
	ul{list-style:none;}

	.m-result{
		width: 1200px;
		margin-bottom: 6px;
		margin-left: -37px;
		margin-top: 10px;
	}
	.m-result .goods {
		position: relative;
		float: left;
		width: 262px;
		height: 387px;
		margin: 0 7px 14px;
		_margin: 0 6px 14px;
		background-color: #fff;
		font-size: 12px
	}
	
	.m-result .goodswrap {
		position: absolute;
		width: 262px;
		background-color: #fff;
		border: 1px solid #f3f3f3;
		border-bottom: none
	}
	
	.m-result .goods .img {
		position: relative
	}
	
	.m-result .goods a {
		display: block;
		color: #333
	}
	
	.m-result .img img {	   
		transition: transform 0.5s; 
		display: block;
		width: 260px;
		height: 257px;
		padding: 12px 12px 10px
	}
	.m-result .img img:hover{	
		transform: scale(1.1);
	} 
	
	.m-result .goods .desc {
		width: 234px;
		padding: 0 14px 11px
	}
	
	.m-result .goods .title {
		height: 40px;
		margin-top: 5px;
		overflow: hidden;
		font-size: 13px;
		line-height: 20px;
		word-wrap: break-word;
		word-break: break-all
	}
	
	.m-result .title:hover {
		color: #e31436
	}
	
	.m-result .goods .price {
		height: 20px;
		color: #e31436;
		overflow: hidden;
		font-size: 0
	}
	
	.m-result .price .cur {
		display: inline-block;
		margin-right: 2px;
		font-weight: 700;
		font-size: 22px;
		line-height: 24px
	}
	
	.m-result .price i {
		font-size: 12px;
		font-weight: 700
	}
	
	.m-result .goods:hover .title {
		min-height: 40px;
		height: auto
	}
	.m-result .goods:hover {
		z-index: 99;
		*zoom: 1
	}
	
	.m-result .goods:hover .goodswrap {
		border: 1px solid #e31436;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, .2)
	}
	
	.m-result .addcart:hover {
		color: #e31436
	}
	
	
	
</style>