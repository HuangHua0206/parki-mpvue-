<template>
	<div class="range-pop-wrap">
	<!-- 	<div class="mask" ></div> -->
<!-- 		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		:rightNum="9999">
	  	</CommonTop> -->
	  	<div class="rang-bg">
	  		<div class="close-btn" @click="$emit('closePop')"></div>
	  		<ul class="range-list">
	  			<li class="item" :class="{select: myopenid === item.openid}" v-for="(item, $index) in rangeList" :key="$index">
	  				<div class="avatar">
				        <img :src="item.avatarurl" />
				     </div>
				     <div class="content">
				     	<div class="name">{{item.nickname}}</div>
				     	<div class="num"><span class="integral-icon"></span>{{item.integral}}</div>
				     	<div class="range">{{$index + 1}}</div>
				     </div>
	  			</li>
	  		</ul>
	  	</div>
	</div>
</template>
<script>
	import CommonTop from 'components/top'
	import storage from 'utils/storage'
	export default{
		data() {
			return {
				isOn: true
			}
		},
		props: {
			rangeList: {
				type:Array
			}
		},
		computed: {
			myopenid() {
				const userinfo = storage.getStorage('userinfo') || {}
				return userinfo.openid
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
 		position: absolute;
 
			width:100%;
			height: 100%;
		z-index:100;
		.mask{
 
			left:0;
			top:0;
			position: absolute;
			.bg("pl2_blackhalf@2x");
			width:100%;
			height: 100%;
		}
		
		.rang-bg{
				z-index:55;
			.bg("pl2_list@2x");
			width:694rpx;
			height: 1152rpx;
			position: absolute;
			top: 50%;
			left:50%;
			transform: translate(-50%, -50%);
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
				height: 800rpx;
				overflow-y: auto;
				.item{
					position: relative;
					.bg("pl2_gray_range@2x");
					height: 37px;
					width:269px;
					margin-left: 24px;
					margin-top: 8px;
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
		    						background-size: contain;
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