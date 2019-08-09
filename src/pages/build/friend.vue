<template>
	<div class="friend-list-wrap"  >
	 
		<div class="hunting">
			<div class="logo"></div>
			<div class="info">
				<div class="left-txt">每天都可以给在线的好友赠送能量。</div>
				<div class="right-txt">
					<span>剩余次数：</span>
					<span class="num"> {{left}} </span>
				</div>
			</div>
			<div class="desc">每天0:00刷新次数</div>
			<ul class="friend-list">
	  			<li class="item" v-for="(item, $index) in friendList" :key="$index">
	  				<div class="avatar">
				        <img :src="item.avatarurl" />
				     </div>
				     <div class="content">
				     	<div class="user-info">
				     		<div class="name">{{item.nickname}}</div>
				     		<div class="money">
								<div class="icon"></div>
								<div class="cost">+{{item.integral}}</div>
							</div>
				     	</div>
				     	<div class="energy">
				     		<div class="ball blue" @click="$emit('giveEnergy', {
				     			color: '3',
				     			...item
				     		})"></div>
				     		<div class="ball orange" @click="$emit('giveEnergy', {
				     			color: '1',
				     			...item
				     		})"></div>
				     		<div class="ball green" @click="$emit('giveEnergy', {
				     			color: '4',
				     			...item
				     		})"></div>
				     		<div class="ball yellow" @click="$emit('giveEnergy', {
				     			color: '2',
				     			...item
				     		})"></div>
				     	</div>
				     </div>
	  			</li>

	  		</ul>
			<div class="close-btn" @click="$emit('closePop')"> </div>
		</div>
	</div>
</template>
<script>
	export default{
		props: {
			friendList: {
				type: Array
			},
			left: {
				type: Number
			}
		}
	} 
</script>
<style type="text/css" lang="less">
	@import '~less/mixin.less';
	.friend-list-wrap{
		position: absolute;
		left:0;
		top:0;
		width: 100%;
		height: 100%;
		z-index:65;
		.hunting{
			.bg('pl2_hunting_bg');
			width:607rpx;
			height:1059rpx;
			position: absolute;
			right:0;
			bottom:27px;
			padding:41rpx 25rpx 0 64rpx;
			.logo{
				width:110rpx;
				height:86rpx;
				margin: 0 auto;
				.bg('pl2_friend_logo');
			}
			.info{
				padding-left: 41rpx;
				padding-right: 10rpx;
				width:100%;
				height: 22rpx;
				box-sizing: border-box;
				border-radius: 6px;
				margin-top: 26rpx;

				background: url("@{cdn}pl2_tips@2x.png") no-repeat 10rpx 0 rgba(0, 0, 0, 0.1);
				background-size:21rpx 25rpx;
				font-size:16rpx;
				line-height: 22rpx;
				color: #fff;
				display: flex;
				justify-content: space-between;
				.right-txt{
					.num{
						color:#FFC225;
						margin-left: 10rpx;
					}
				}
			}
			.desc{
				color:rgba(77,92,102,1);
				font-size:16rpx;
				text-align:right;
				height: 22rpx;
				line-height:22rpx;		
				margin-bottom: 30rpx;	
			}
			.friend-list{
				height: 830rpx;
				overflow-y: auto;
				.item{
					position: relative;
					.bg("pl2_gray_range@2x");
					height: 85rpx;
					width:269px;
					margin-left: 22px;
					margin-bottom: 41rpx;
					margin-top:10rpx;
					&.select{
						.bg("pl2_green_ange@2x");
					}
					.avatar{
				 		position: absolute;
						left:-22px;
						top:-1rpx;
						// transform: translateY(-50%);
				    	height: 87rpx;
				    	width: 87rpx;
				    	img{
				          height: 100%;
				    	  width: 100%;
				          border-radius: 50%;
				          border: 3px solid #000;
				        }
					}
					.content{
						height: 100%;
						margin-left:30px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.user-info{

							.name{
								height: 26rpx;
								line-height:26rpx;
								font-size:26rpx;
								color:rgba(0,0,0,1);
							}
							.money{
								height:32rpx;
								// text-align: right;
								display:flex;
								// margin-bottom: 10px;
								// justify-content:flex-end;
							//	margin-top:15px;
								.icon{
									.bg("pl2_energy");
									width:21rpx;
									height:32rpx;
									margin-right: 8px;
								}
								.cost{
									height:32rpx;
									// line-height: 34rpx;
									color: #ffad01;
									line-height: 32rpx;
									font-size:24rpx;
								}
							}
						}
					}
					.energy{
						margin-right: 10rpx;
						display: flex;
						justify-content: flex-end;
						.ball{
							width:50rpx;
							height: 50rpx;
							border-radius:50%;
							
							
							&.get{
								.bg('pl2_friend_get');
							}
							&.yellow{
								.bg("pl2_ball_yellow@2x");
							}
							&.blue{
								.bg("pl2_ball_blue@2x");
							}
							&.green{
								.bg("pl2_ball_green@2x");
							}
							&.orange{
								.bg("pl2_ball_orange@2x");
							}
						}
					}
				}
			}
			.close-btn{
				position: absolute;
				top:50%;
				transform:translateY(-50%);
				height: 42px;
				width:42px;
				.bg("pl2_right_back@2x");
				left:-20px;

			}
		}
		
	}
</style>