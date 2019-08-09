<template>
	<div class="hunting-list-wrap"  >
	 
		<div class="hunting">
			<div class="logo"></div>
			<div class="info">
				<div class="left-txt">利用宠物狩猎怪物可以获得大量奖励。</div>
				<div class="right-txt">
					<span>剩余次数：</span>
					<span class="num"> 3 </span>
				</div>
			</div>
			<div class="desc">每天0:00刷新次数</div>
			<div class="card blue"></div>
			<div class="card green"></div>
			<div class="card red"></div>
			<div class="close-btn" @click="$emit('closePop')"> </div>
		</div>
	</div>
</template>
<style type="text/css" lang="less">
	@import '~less/mixin.less';
	.hunting-list-wrap{
		position: absolute;
		left:0;
		top:0;
		width: 100%;
		height: 100%;
		z-index:65;
		.hunting{
			.bg('pl2_hunting_bg');
			width:614rpx;
			height:1094rpx;
			position: absolute;
			right:0;
			bottom:27px;
			padding:41rpx 25rpx 0 64rpx;
			.logo{
				width:151rpx;
				height:101rpx;
				margin: 0 auto;
				.bg('pl2_hunting_logo');
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
			.card{
				width:100%;
				height:223rpx;
				margin-bottom: 45rpx;
				&.blue{
					.bg('pl2_hunting_blue');
				}
				&.green{
					.bg('pl2_hunting_green');
				}
				&.red{
					.bg('pl2_huting_red');
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