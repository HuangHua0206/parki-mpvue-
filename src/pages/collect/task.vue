<template>
	<div class="task-pop-wrap">
	<div class="mask" @click="$emit('closePop')"></div>
		<div class="email-bg">
			<div class="logo"></div>
			<div class="task-desc">
				<div class="desc">完成任务可获得大量奖励.</div>
				<div class="desc">任务每日00:00点更新。</div>
			</div>
			<ul class="email-list">
				<li class="item" v-for="(item, $index) in taskList" :key="$index">
					<div class="task-name">{{item.taskname}}</div>
					<div class="desc">{{item.taskcontent}}。</div>
					<div class="reward">
						<div class="get">奖励:<span class="integral-icon"></span> <span class="num">80</span> </div>
						<div class="finish">已完成: {{ item.sequence}} / {{ item.schedule}}</div>
					</div>
				</li>
			<!-- 	<li class="item">
					<div class="task-name">宠物任务</div>
					<div class="desc">获得一个4级宠物。</div>
					<div class="reward">
						<div class="get">奖励:<span class="integral-icon"> </span><span class="num">80</span> </div>
						<div class="finish">已完成: 2/10</div>
					</div>
				</li> -->
				<li class="item">
					<div class="task-name">建造任务</div>
					<div class="desc">任意种植一棵树。</div>
					<div class="reward">
						<div class="get">奖励:<span class="integral-icon"></span><span class="num">80 </span> </div>
	 
					</div>
					<div class="get-btn">领取奖励</div>
				</li>
			</ul>
			<div class="close-btn" @click="$emit('closePop')"> </div>
		</div>
		
	</div>
</template>
<script>
	export default{
		props: {
			taskList: {
				type: Array
			}
		},
		methods: {
		}
	}
</script>
<style lang="less">
@import "~less/mixin.less";
	.task-pop-wrap{
		z-index:100;
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
 				position: absolute;
 				top:22px;
 				right:18px;
				width:40px;
				height: 46px;
				.bg("pl2_task_pop@2x");
			}
			.task-desc{
				margin-top: 40px;
				margin-left: 42px;
				.desc{
					font-size: 10px;
					font-family: 'textfont';
					color:#fff;
					text-shadow:#000 2px 0 0,#000 0 2px 0,#000 -2px 0 0,#000 0 -2px 0;
					margin-bottom: 7px;
				}
			}
			.email-list{
				margin: 0 auto;
				width:267px;
				margin-top: 15px;
		 		.item{
		 			box-sizing: border-box;
		 			padding: 12px 22px 0 26px;
		 			width:100%;
					height: 94px;
		 			.bg("pl2_task_list@2x");
		 			position: relative;
		 			margin-bottom: 34px;
		 			.task-name{
		 			 	font-size: 10px;
						font-family: 'textfont';
		 			 	color:#56D865;
		 			 	margin-bottom: 10px;
		 			 }
		 			 .desc{
		 			 	font-size: 16px;
						font-family: 'textfont';
		 			 	color:#010101;
		 			 }
		 			 .reward{
		 			 	margin-top: 21px;
		 			 	padding-bottom:5px;
		 			 	display: flex;
		 			 	justify-content: space-between;
		 			 	.get, .finish{
		 			 		font-size: 16px;
							font-family: 'textfont';
			 			 	color:#010101;

		 			 	}
		 			 	.get{
		 			 		position: relative;
		 			 		.integral-icon{
			 					// vertical-align: center;
			 					width:9px;
			 					height: 17px;
			 					position: absolute;
								left:42px;
								top:-2px;
			 					// .bg("pl2_energy_2@2x");
			 					background: url("@{cdn}pl2_energy_2@2x.png")  center 2px no-repeat;
	    						background-size: 100% 100%;
			 					// display: inline-block;
			 					// background-origin: 0 0;
			 				}
			 				.num{
			 					margin-left: 25px;
			 				}
		 			 	}
		 			 }
		 			.get-btn{
		 				width:83px;
		 				height: 30px;
		 				.bg("pl2_ok@2x");
		 				position:absolute;
		 				 right:12px;
		 				 bottom: 9px;
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