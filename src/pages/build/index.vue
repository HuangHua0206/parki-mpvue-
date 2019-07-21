<template>
	<div class="build-wrap">
		<div class="cloud"></div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		share>
  		</CommonTop>
  		<div @click="goCollect" class="button collect-energy" :class="{'fade-left-in': fadeIn}"  ></div>
		<div class="button hunting-button" :class="{'fade-right-in': fadeIn}" ></div>
		<div class="button friend-button"  :class="{'fade-right-in': fadeIn}" ></div>
		<div class="build-store"></div>
		<div class="build-my"></div>
		<div class="mask" style="z-index:6" v-if="true">
			<div class="area"></div>
		</div>
	</div>
</template>
<script>
import CommonTop from 'components/top'
export default {
	data() {
		return {
			fadeIn: false
		}
	},
	components: { CommonTop },
	methods: {
		goCollect() {
	    	wx.redirectTo({
				url: '/pages/collect/main'
			});
		}
	},
	mounted() {
		console.log(999)
		this.fadeIn = true
	},
	onUnload() {
		this.fadeIn = false
	},
}
</script>
<style lang="less">
@import '~less/mixin.less';
	.build-wrap{
		background: url("@{cdn}pl2_build-bg.jpg")  0 0 no-repeat;
    	background-size: 100% auto;
		position:absolute;
		height:100%;
		width:100%;
		left:0;
		top:0;
		.cloud{
			height:100%;
			width:100%;
			position:absolute;
			.bg("pl2_cloud@2x");
		}
		.button{
			transition: 1s;
			position:absolute;
			width:67px;
			height:57px;
			
			&.collect-energy{
				left:-70px;
				top:108px;
				.bg("pl2_collection@2x@2x");
			}
			&.hunting-button{
				right:-70px;
				top:108px;
				.bg("pl2_hunting@2x");
			}
			&.friend-button{
				right:-70px;
				top:179px;
				.bg("pl2_friend@2x");
				.bracelet{
					position:absolute;
					animation:onlineAnimation 5s infinite ease;
					padding-left:15px;
				 
					box-sizing:border-box;
					font-size:13px;
					background: url("@{cdn}pl2_energy_2@2x.png") no-repeat 0 0;
					background-size:10px 100%;
					height:15px;
					top:10px;
					
					color:rgb(255,173,0);
				}
				.progress-mask{
					border-radius:12px;
					position: absolute;
					width:48px;
					height: 10px;
					bottom:15px;
					border:2px solid #000;
					box-sizing:border-box;
					background: #fff;
					left:14px;
					overflow:hidden;
				
					// .bg("pl2_line_schedule_mask@2x");
					.progress{
						box-sizing: border-box;
						border-radius:12px;
						width:0px;
						height: 6px;
						background:#fffb7d;
						// bottom:15px;
						border-radius:12px;
						// left:14px;
						// .bg("pl2_line_schedule@2x");
						// background: url("@{cdn}pl2_line_schedule@2x.png") no-repeat 0 0;
						// background-size:100% 100%;
						&.hasBracelet{
							animation: progressBraceletOnline 5s infinite ease;
						}
						.sunny{
							position: absolute;
							top:1px;
							left:3px;
							width: 0px;
							height: 1px; 
							background: #fff;
						 	&.hasBracelet{
								animation: progressSunny 5s infinite ease;
							}
						}
					}
					
				}
				
			}
			&.offline-button{
				right:-70px;
				top:180px;
				.bg("pl2_off line@2x");
			}
			&.fade-left-in{
				left:0;
			}
			&.fade-right-in{
				right:0;
			}
		}
		.build-store{
			position:absolute;
			width:103px;
			height:73px;
			bottom:13px;
			left:80px;
			.bg("pl2_Building_shop@2x");
		}
		.build-my{
			position:absolute;
			width:99px;
			height:73px;
			bottom:13px;
			right:83px;
			.bg("pl2_Warehouse@2x");
		}
		.mask{
			.area{
				.bg("pl2_area@2x");
				background: url("@{cdn}pl2_area@2x.png")  center center no-repeat;
				background-size: cover;
				width:100%;
				// height:51%;
				// top:26%;
				height:342px;
				top:173px;
				position:absolute;
				left:0;
			}
		}
	}
</style>