<template>
	<div class="hunting-dragon-wrap">
		<div class="hunting-dragon" :class="{
			'red': dragonType === 'red',
			'blue': dragonType === 'blue',
			'green': dragonType === 'green'
		}">
			<div class="cloud"></div>
			<div class="blood-wrap">
				<div class="avatar" :class="{
					'red': dragonType === 'red',
					'blue': dragonType === 'blue',
					'green': dragonType === 'green'
				}"></div>
				<div class="blood-grey">
					
				</div>
				<div class="blood-red">
						<div class="blood-sunny"></div>
					</div>
			</div>
			<div class="count-down">
		        	倒计时 04:22
		        </div>
			<div class="info">
		    	<div class="left-info">
		    		<div class="attack">
		    			攻击力 ATTACK: 15
		    			<span class="plus">+5</span>
		    		</div >
		    		<div class="damage">总伤害 DAMAGE: 555</div>
		    	</div>
		    	
		    	<div class="right-card">
		    		<image class="img" :src="'http://parkiland.isxcxbackend1.cn/pl2_'+'小鸡'+'.png'" />
		    		<div class="level">1级</div>
		    		<div class="energy">战斗力：8</div>
		    	</div>
		    </div>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {}
		},
		props: {
			dragonType: {
				type: String
			}
		}
	}
</script>
<style lang="less">
@import '~less/mixin.less';
	.hunting-dragon-wrap{
		z-index:100;
		position: absolute;
		height: 100%;
		width: 100%;
		.hunting-dragon{
			
			height: 100%;
			width: 100%;
			&.red{
				.bg("pl2_Dinosaurred@2x");
			}
			&.blue{
				.bg("pl2_Dinosaurblue@2x");
			}
			&.green{
				.bg("pl2_Dinosaurgreen@2x");
			}
			.cloud{
				.bg("pl2_cloudcloud@2x");
				height:367rpx;
				width:100%;
			}
			.blood-wrap{
				position:absolute;
				top:253rpx;
				left:98rpx;
				width:507rpx;
				height:46rpx;
				.avatar{
					position:absolute;
					left:0;
					top:0;
					// transform:translateY(-50%);
					z-index:1;
					
					width:46rpx;
					height:46rpx;
					&.red{
						.bg('pl2_Dinosaurredhead@2x');
					}
					&.blue{
						.bg("pl2_Dinosaubluehead@2x");
					}
					&.green{
						.bg("pl2_Dinosaurgreenhead@2x");
					}

				}
				.blood-grey{
					background:#626262;
					border:3rpx solid #060501;
					height:27rpx;
					width:100%;
					// width:10rpx;
					box-sizing:border-box;
					border-radius:10px;
					position:absolute;
					left:25rpx;
					top:10rpx;
					//transform:translateY(-50%);
					
				}
				.blood-red{
					position:absolute;
					top:3rpx;
					left:25rpx;
					height:27rpx;
					width:100%;
					// width:10rpx;
					padding:4rpx 19rpx 0;
					border:3rpx solid #060501;
					box-sizing:border-box;
					border-radius:10px;
					background:#e60012;
				 	.blood-sunny{
				 		// position:absolute;
				 	// 	top:4rpx;
						// left:50%;
						// transform:translateX(-50%);
				 		background: #f6a6ac;
				 		width:100%;
				 		height:3rpx;

				 	}

				}
				
			}
			.count-down{
				position: absolute;
				font-size:9px;
				left:50%;
				transform:translateX(-50%);
				width:90px;
				top:293rpx;
				background: url("@{cdn}pl2_time@2x.png") no-repeat 0 center;
				background-size:10px 12px; 
				height: 13px;
				line-height:18px;
				font-size:9px;
				padding-left:16px;
			}
			.info{
				box-sizing: border-box;
				position: absolute;
				bottom: 23px;
				left:50px;
				width:276px;
				height: 113px;
				.bg('pl2_excel@2x');
				padding:0 12px 10px 15px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left-info{
					.attack{
						box-sizing:border-box;
						background: url("@{cdn}pl2_attack@2x.png") no-repeat 0 center;
						background-size: 17px 16px;
						padding-left: 26px;
						font-size:10px;
						// font-weight: bold;
						height: 20px;
						line-height:20px;
						.plus{
							display: inline-block;
							margin-top: 2px;
							margin-left: 8px;
							height: 15px;
							background: url("@{cdn}pl2_kid@2x.png") no-repeat 0 center;
							background-size: 15px 15px;
							color:rgb(255, 186, 0);
							padding-left: 18px;
							line-height: 18px;
						}

					}
					.damage{
						box-sizing:border-box;
						background: url("@{cdn}pl2_damage@2x.png") no-repeat 0 center;
						background-size: 14px 20px;
						padding-left: 26px;
						margin-top: 15px;
						font-size:10px;
						// font-weight: bold;
						height: 20px;
						line-height:20px;
					}
				}
				.right-card{
		 
					width:63px;
					height: 85px;
		 
					border-radius: 6px;
					padding:1px;
					position: relative;
					.img{
						width:100%;
						height:100%;

					}
					.level{
						position:absolute;
						left:10rpx;
						bottom:13rpx;
						color:#fff;
						font-size:8px;
					}
					.energy{
						position:absolute;
						right:10rpx;
						bottom:15rpx;
						color:#fff;
						font-size:5px;
					}
				}
			}
		}
	}
</style>