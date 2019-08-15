<template>
	<div class="hunting-dragon-wrap" @click="$emit('attackMonster', dragonType)">
		<div class="hunting-dragon" :class="{
			'red': dragonType === 'red',
			'blue': dragonType === 'blue',
			'green': dragonType === 'green'
		}">
			<div class="cloud"></div>
			<div class="blood">
		        <div class="blood-avatar" :class="{
					'red': dragonType === 'red',
					'blue': dragonType === 'blue',
					'green': dragonType === 'green'
				}"></div>
		        <div class="blood-num" :style="{width: width <=0 ? 0 : width + '%'}"></div>
		        <div class="count-down">
		        	倒计时 {{timeNum}}
		        </div>
		      </div>
<!-- 			<div class="blood-wrap">
				<div class="avatar" :class="{
					'red': dragonType === 'red',
					'blue': dragonType === 'blue',
					'green': dragonType === 'green'
				}"></div>
				<div class="blood-grey" :style="{width: width <=0 ? 0 : width + '%'}">
					
				</div>
				<div class="blood-red" :style="{width: width <=0 ? 0 : width + '%'}">
						<div class="blood-sunny" >
							<div class="sunny" :style="{width: width < 0.3 ? 0 : width + '%'}"></div>
						</div>
					</div>
			</div>
			<div class="count-down">
		        	倒计时 00:{{timeNum}}
		        </div> -->
			<div class="info">
		    	<div class="left-info">
		    		<div class="attack">
		    			攻击力 ATTACK: {{ animal.power || 5 }}
		    			<span v-if="online" class="plus">+5</span>
		    		</div >
		    		<div class="damage">总伤害 DAMAGE: {{ monsterTotalAttack }}</div>
		    	</div>
		    	
		    	<div class="right-card" v-if="animal.petname">
		    		<image class="img" :src="'http://parkiland.isxcxbackend1.cn/pl2_'+animal.petname+'.png'" />
		    		<div class="level">{{animal.level}}级</div>
		    		<div class="energy">战斗力：{{animal.power}}</div>
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
		computed: {
			width() {
				console.log(this.dragonInfo);
				if (this.dragonInfo && this.dragonInfo.blood) {
					return ((this.dragonInfo.blood - this.monsterTotalAttack) / this.dragonInfo.blood) * 100
				} else {
					return 1
				}
				
			}
		},
		props: {
			dragonType: {
				type: String
			},
			dragonInfo: {
				type: Object
			},
			animal: {
				type: Object
			},
			online: {
				type: Boolean
			},
			monsterTotalAttack: {
				type: Number
			},
			timeNum: {
				type: Number
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
			.blood{
			position: absolute;
			top:140px;
			left:50%;
			width:470rpx;
			transform: translateX(-50%);
			.blood-avatar{
				position: absolute;
				top:0;
				left:0;
				width:46rpx;
				height: 46rpx;
				// .bg('pl2_head@2x');
				z-index:1;
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
			.blood-num{
				position: absolute;
				top:4px;
				left:40rpx;
				height: 34rpx;
				
				.bg('pl2_hunnting0-blood');
				background-size: cover;
				border-right: 2px solid #000;
				border-radius: 8px;
			}
			.count-down{
				position: absolute;
				font-size:9px;
				left:50%;
				width:90px;
				transform: translateX(-50%);
				top:23px;
				background: url("@{cdn}pl2_time@2x.png") no-repeat 0 center;
				background-size:10px 12px; 
				height: 13px;
				line-height:18px;
				font-size:9px;
				padding-left:16px;
			}
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
					padding:4rpx 0 0;
					border:3rpx solid #060501;
					box-sizing:border-box;
					border-radius:10px;
					background:#e60012;
				 	.blood-sunny{
				 		position:absolute;
				 		top:4rpx;
						left:50%;
						transform:translateX(-50%);
				 		width:450rpx;
				 		height:3rpx;
						.sunny{
							position:absolute;
							left:50%;
							transform:translateX(-50%);
							height:3rpx;
							border-radius:5rpx;
				 			background: #fff;
						}
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