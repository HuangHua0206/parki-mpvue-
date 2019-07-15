<template>
	<div class="range-pop-wrap">
		<div class="mask" ></div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		:rightNum="9999">
	  	</CommonTop>
	  	<div class="rang-bg">
	  		<div class="close-btn" @click="$emit('closePop')"></div>
	  		<ul class="range-list">
	  			<li class="item" :class="{select: isOn}">
	  				<div class="avatar">
				        <img src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" />
				     </div>
				     <div class="content">
				     	<div class="name">HEAVEN</div>
				     	<div class="num"><span class="integral-icon"></span>9999</div>
				     	<div class="range">1</div>
				     </div>
	  			</li>
	  			<li class="item">
	  				<div class="avatar">
				        <img src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" />
				     </div>
				     <div class="content">
				     	<div class="name">HEAVEN</div>
				     	<div class="num">9999</div>
				     	<div class="range">1</div>
				     </div>
	  			</li>
	  			<li class="item">
	  				<div class="avatar">
				        <img src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" />
				     </div>
				     <div class="content">
				     	<div class="name">HEAVEN</div>
				     	<div class="num">9999</div>
				     	<div class="range">1</div>
				     </div>
	  			</li>
	  		</ul>
	  	</div>
	</div>
</template>
<script>
	import CommonTop from 'components/top'
	export default{
		data() {
			return {
				isOn: true
			}
		},
		methods: {	
		},
		components: { CommonTop }
	}
</script>
<style lang="less">
@import "~less/mixin.less";
	.range-pop-wrap{
		.mask{
			left:0;
			top:0;
			position: absolute;
			.bg("pl2_blackhalf@2x");
			width:100%;
			height: 100%;
		}
		
		.rang-bg{
			z-index:30;
			.bg("pl2_list@2x");
			width:347px;
			height: 506px;
			position: absolute;
			top: 77px;
			left:50%;
			transform: translateX(-50%);
			box-sizing: border-box;
			padding:94px 26px 0;
			.close-btn{
				width:30px;
				height: 30px;
				.bg("pl2_no@2x");
				position: absolute;
				right:-10px;
				top:-10px;
			}
			.range-list{
				.item{
					position: relative;
					.bg("pl2_gray_range@2x");
					height: 37px;
					width:269px;
					margin-left: 22px;
					margin-bottom: 25px;
					&.select{
						.bg("pl2_green_ange@2x");
					}
					.avatar{
				 		position: absolute;
						left:-22px;
						top:50%;
						transform: translateY(-50%);
				    	height: 49px;
				    	width: 49px;
				    	img{
				          height: 100%;
				    	  width: 100%;
				          border-radius: 50%;
				          border: 3px solid #000;
				        }
					}
					.content{
						margin-left:27px;
						display: flex;
						justify-content: space-between;
						div{
							width: 80px;
							text-align:center;
							font-size: 10px;
							font-family: 'textfont';
							line-height:  37px;
							color:#fff;
							&.num{
								position: relative;
								// vertical-align: top;
								box-sizing: border-box;
								// padding-left:10px;
								color:#FFAD00;
								.integral-icon{
									position: absolute;
				 					vertical-align: center;
				 					width:9px;
				 					height: 19px;
				 					left:6px;
				 					top:6px;
				 					// .bg("pl2_energy_2@2x");
				 					background: url("@{cdn}pl2_energy_2@2x.png")  center 2px no-repeat;
		    						background-size: 100% 100%;
				 					display: inline-block;
				 					// background-origin: 0 0;
				 				}
							}
						}
					}
				}
			}
		}
	}
</style>