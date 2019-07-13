<template>
	<div class="collect-wrap">
		<div class="cloud"></div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		:rightNum="9999"
	  		@openRange="which = 'range'"
	  		>
	  	</CommonTop>
		<div class="button task-button" @click="which = 'task'"></div>
		<div class="button email-button" @click="which = 'email'"></div>
		<div class="button animal-button" ></div>
		<div v-if="!online" class="button online-button">
			<div class="progress-mask" >
				
			</div>
			<div class="progress" :class="{hasBracelet: hasBracelet}"></div>
			<div class="bracelet">+2</div>
		</div>
		<div v-else class="button offline-button"></div>
		<div class="line">
			<div class="mask"> </div>
			<div class="progress"> </div>
		</div>
		<div class="nums-wrap">
			<div class="one-three">
				<div class="num one"></div>
				<div class="num two"></div>
				<div class="num three"></div>
			</div>
			<div class="plus"  @click="energyIn = !energyIn"></div>
		</div>
		<div   class="energy-wrap" :class="{fadeUp: energyIn}">
			<div class="boll ">
				<div class="round yellow"></div>
				<div class="num">99</div>
				<div class="little-round"></div>
			</div>
			<div class="boll ">
				<div class="round blue"></div>
				<div class="num">99</div>
				<div class="little-round"></div>
			</div>
			<div class="boll ">
				<div class="round green"></div>
				<div class="num">99</div>
				<div class="little-round"></div>
			</div>
			<div class="boll ">
				<div class="round orange"></div>
				<div class="num">99</div>
				<div class="little-round"></div>
			</div>
		</div>
		<div   class="my-home" :class="{fadeUp: energyIn}"></div>
		<!-- 弹窗部分 -->
		<div class="pop-up-left" :class="{fadeUp: which === 'email'}"> 
			<Email   @closePop="close"  />
		</div>
		<div class="pop-up-left" :class="{fadeUp: which === 'task'}">
			<Task    @closePop="close"   />
		</div>
		<div class="pop-up-bottom" :class="{fadeUp: which === 'range'}">
			<Range   @closePop="close"   />
		</div>
	</div>
	
</template>
<script>
	import CommonTop from 'components/top'
	import Email from './email'
	import Task from './task'
	import Range from './range'
	export default{
		data () {
		  return {
		  	online: false,
		  	blueStatus: false, // 蓝牙是否开启
		  	which: '',
		  	energyIn: false, // 能量背包是否显示
		  	hasBracelet: true, //是否绑定手环
		  }
		},
		methods: {
			close(which) {
				this.which = ''
				// switch(which) {
				// 	case 'email':
				// 		this.emailIn = false
				// 		this.which = which
				// 		break
				// 	case 'task':
				// 		this.which = which
				// 		this.taskIn = false
				// 		break
				// }
			},
			openBlueTooth() {
				console.log(888);
		      const _this = this;
		      wx.openBluetoothAdapter({
		        success(res) {
		        	console.log(99999);
		          _this.blueStatus = true;
		          _this.searchBlueTooth();
		        },
		        fail(res) {
		          wx.onBluetoothAdapterStateChange(function(res) {
		            if (res.available) {
		              _this.blueStatus = true;
		              _this.searchBlueTooth();
		            }
		          });
		        }
		      });
		    },
		},
		onShow() {
			console.log(44444);
			this.openBlueTooth()
		},
		components: { CommonTop, Email, Task, Range }
	}
</script>
<style lang="less">
@cdn: "http://parkiland.isxcxbackend1.cn/";
.bg(@url, @vertical:center){
 	background: url("@{cdn}@{url}.png") center @vertical no-repeat ;
    background-size: 100% 100%;
}
@keyframes progressBraceletOnline {
  from {width: 10px;}
  to {width: 48px;}
}

.collect-wrap{
	height:100%;
	width:100%;
	position:absolute;
	.bg("pl2_background@2x");
	background-size: 100% 100%;
	.mask{
		left:0;
		top:0;
		position: absolute;
		.bg("pl2_blackhalf@2x");
		width:100%;
		height: 100%;
	}
	.cloud{
		height:100%;
		width:100%;
		position:absolute;
		.bg("pl2_cloud@2x");
	}
	.button{
		position:absolute;
		width:67px;
		height:57px;
		&.task-button{
			left:0;
			top:108px;
			.bg("pl2_task@2x");
		}
		&.email-button{
			left:0;
			top:179px;
			.bg("pl2_mail@2x");
		}
		&.animal-button{
			right:0;
			top:108px;
			.bg("pl2_PetCard@2x");
		}
		&.online-button{
			right:0;
			top:179px;
			.bg("pl2_on line@2x");
			.bracelet{
				// font-size:13px;
				// background: url("@{cdn}pl2_time@2x.png") no-repeat 0 center;
				// background-size:10px 12px;
				// font-family:'textfont';
				// position:absolute;
				// top:50%;
				// left:-100%;
				// color:rgb(255,173,0);
				// transform:translateY(-50%);

			}
			.progress-mask{
				position: absolute;
				width:48px;
				height: 10px;
				bottom:15px;
				left:14px;
				.bg("pl2_line_schedule_mask@2x");
				
				
			}
			.progress{
					position: absolute;
					width:30px;
					height: 10px;
					bottom:15px;
					border-radius:12px;
					left:14px;
					// .bg("pl2_line_schedule@2x");
					background: url("@{cdn}pl2_line_schedule@2x.png") no-repeat 0 0;
					background-size:100% 100%;
					&.hasBracelet{
						animation: progressBraceletOnline 2s infinite ease-in-out;
					}
				}
		}
		&.offline-button{
			right:0;
			top:180px;
			.bg("pl2_off line@2x");
		}
	}
	.line{
		width: 236px;
		height:19px;
		.bg("pl2_yellow@2x");
		position:absolute;
		left:50%;
		transform:translateX(-50%);
		bottom:229px;
		.mask{
			position: absolute;
			top:0;
			width:100%;
			height: 15px;
			right:0;
			.bg("pl2_mask@2x");
		}
		.progress{
			position: absolute;
			top:0;
			width:60%;
			height: 15px;
			left:0;
			// .bg("pl2_blue@2x");
			background: url("@{cdn}pl2_blue@2x.png") top left no-repeat ;
			background-size: 100% 100%;
		}
	}
	.nums-wrap{
		position:absolute;
		bottom:143px;
		left:0;
		width:100%;
		height:65px;
		.one-three{
			position:absolute;
			bottom:0;
			left:50%;
			width: 236px;
			display:flex;
			justify-content:space-between;
			transform:translateX(-50%);
			.num{
				width: 58px;
				height:67px;
				&.one{
					.bg("pl2_1@2x");
				}
				&.two{
					.bg("pl2_2@2x");
				}
				&.three{
					.bg("pl2_3@2x");
				}
			}

		}
		.plus{
			position:absolute;
			right:15px;
			bottom:5px;
			width:32px;
			height:32px;
			.bg("pl2_+@2x");
		}
	}
	
	.energy-wrap{
		transition-timing-function: ease-in;
		transition: 0.5s;
		z-index:2;
		box-sizing:border-box;
		position:absolute;
		bottom:-200px;
		left:50%;
		transform:translateX(-50%);
		width:356px;
		height:137px;
		.bg("pl2_bag@2x");
		display:flex;
		justify-content:space-between;
		padding:45px 22px 0 20px;
		&.fadeUp{
			bottom:0;
		}
		.boll{
			width:72px;
			height:72px;
			position:relative;
			.bg("pl2_ball_bot@2x");
			.round{
				width:59px;
				height:59px;
				position:absolute;
				left:50%;
				transform:translateX(-50%);
				top:5px;
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
			.num{
				position:absolute;
				bottom:0;
				left:50%;
				font-size:10px;
				transform:translateX(-50%);
				// .bg("pl2_shadow@2x");
			}
			.little-round{
				.bg("pl2_shadow@2x");
				position:absolute;
				width:41px;
				height:10px;
				bottom:2px;
				left:50%;
				transform:translateX(-50%);
			}
		}
	}
	.my-home{
		transition: 0.8s;
		transition-timing-function: ease;
		position:absolute;
		left:50%;
		bottom:15px;
		width:100px;
		height:110px;
		.bg("pl2_Parkiland@2x");
		transform:translateX(-50%);
		&.fadeUp{
			bottom: 0;
		}
	}
	.pop-up-left{
		transition: 0.5s;
		position: absolute;
		top:0;
		left:-100%;
		height: 100%;
		width:100%;
		&.fadeUp{
			left:0;
		}
	}
	.pop-up-bottom{
		transition: 0.5s;
		position: absolute;
		bottom:-100%;
		left:0;
		height: 100%;
		width:100%;
		&.fadeUp{
			bottom:0;
		}
	}
}
</style>
