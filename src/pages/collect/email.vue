<template>
	<div class="email-pop-wrap">
		<div class="mask" @click="$emit('closePop')"></div>
		<div class="email-bg">
			<div class="logo"></div>
			<ul class="email-list">
				<li class="item">
					<i class="red-icon"></i>
					<div class="content">恭喜你获得了手机排行第3名，奖励<span class="integral-icon"></span>300。</div>
					<div class="desc">
						<div class="time">时间： 2019/10/01</div>
						<div class="send">发送人： PARKI系统</div>
					</div>
					<div class="get-btn">领取</div>
				</li>
			</ul>
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
	.email-pop-wrap{
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
		
		.email-bg{
			z-index:10;
			.bg("pl2_mailbot@2x");
			width:306px;
			height: 547px;
			position: absolute;
			left:0;
			bottom:14px;
			// padding: 0 25px;
			.logo{
 
				width:56px;
				height: 44px;
				.bg("pl2_mail_2@2x");
				margin:26px auto 0;
			}
			.email-list{
				margin: 0 auto;
				width:258px;
				margin-top: 15px;
		 		.item{

		 			width:100%;
					height: 96px;
		 			.bg("pl2_frame@2x");
		 			position: relative;
		 			.red-icon{
		 				position: absolute;
		 				left:-8px;
		 				top:-8px;
		 				height: 21px;
		 				width:21px;
		 				.bg("pl2_redspot@2x");
		 			}
		 			box-sizing: border-box;
		 			padding: 17px 20px 6px 16px;

		 			.content{
		 				font-family: 'textfont';
		 				font-size: 15px;
		 				width:222px;
		 			//	line-height: 1.5;
		 				color:#fff;
		 				.integral-icon{
		 					vertical-align: center;
		 					width:9px;
		 					height: 15px;
		 					// .bg("pl2_energy_2@2x");
		 					background: url("@{cdn}pl2_energy_2@2x.png")  center 2px no-repeat;
    						background-size: 100% 100%;
		 					display: inline-block;
		 					// background-origin: 0 0;
		 				}
		 			}
		 			.desc{
		 				display: flex;
		 				position: absolute;
		 				left:16px;
		 				bottom: 6px;
		 				color:#fff;
		 				font-family: 'textfont';
		 				font-size: 8px;
		 				.send{
		 					margin-left: 10px;
		 				}
		 			}
		 			.get-btn{
		 				width:83px;
		 				height: 30px;
		 				.bg("pl2_ok@2x");
		 				position:absolute;
		 				 right:12px;
		 				 bottom: 3px;
		 				 text-align: center;
		 				 font-family: 'textfont';
		 				 line-height:27px;
		 				font-size: 10px;
		 			}
		 		}
			}
			.close-btn{
				position: absolute;
				top:50%;
				transform:translateY(-50%);
				height: 42px;
				width:42px;
				.bg("pl2_leftback@2x");
				right:-20px;
			}
		}

	}
</style>