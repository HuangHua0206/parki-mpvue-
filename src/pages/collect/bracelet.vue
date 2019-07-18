<template>
	<div class="bracelet-pop-wrap">
		<div class="mask" @click="$emit('closePop')"></div>
		<div class="bracelet-bg">
			<div class="logo"></div>
			<div class="scan"></div>
			
			<div class="txt">
				<p class="attention-title">特殊奖励:</p>
				<div class="attention-first">
				<div class="content">1:手环和绑定手机共同收集会活的额外奖励</div>
				<div class="desc">The collection of bracelets and bound phones will receive additional rewards.The bracelet will receive a gold coin reward when it is close to the phone.</div>
			</div>
			<div class="attention-first">
				<div class="content">2:手环与收集靠近时会活的金币奖励</div>
				<div class="desc">THE BRACELET WILL RECEIVE A GOLD COIN REWARD WHEN IT IS CLOSE TO THE PHONE</div>
			</div>
			<div class="band">
				<div class="img"></div>
				<div class="desc">已绑定XXXX</div>
			</div>
			</div>
			<div class="close-btn" @click="$emit('closePop')"> </div>
		</div>
		
	</div>
</template>
<script>
	export default{
		methods: {
		}
	}
</script>
<style lang="less">
@import "~less/mixin.less";
	.bracelet-pop-wrap{
		z-index:55;
		position: absolute;
		width:100%;
	    height: 100%;
		.mask{
			left:0;
			top:0;
			position: absolute;
			.bg("pl2_blackhalf@2x");
			width:100%;
			height: 100%;
		}
		
		.bracelet-bg{
			z-index:10;
			.bg("pl2_Bracelet_yellow@2x");
			width:306px;
			height: 547px;
			position: absolute;
			right:0;
			bottom:14px;
			// padding: 0 25px;
			.logo{
 
				width:58px;
				height: 44px;
				.bg("pl2_Bracelet-logo@2x");
				margin:22px auto 33px;
			}
			.scan{
				.bg("pl2_pic@2x");
				width:77px;
				height: 114px;
				margin:0 auto ;
			}
			.txt{
				padding:0 39px 0 59px;
				.attention-title{
					margin: 20px auto 10px;
					font-size:12px;
				}
				.attention-first{
					margin-bottom: 10px;
					.content{
						font-size:12px;
					}
					.desc{
						color:#878787;
						font-size:8px;
					}
				}
			}
			.band{
				position: absolute;
				left:50%;
				width:80px;
				transform: translateX(-50%);
				bottom:52px;
				.img{
					width:80px;
					height: 88px;
					.bg("pl2_scan@2x");
				}
				.desc{
					font-size:12px;
					color:#fff;
					width: 80px;
					text-align:center;
					margin-top: 7px;
					text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;

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