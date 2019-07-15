<template>
	<div class="collect-wrap">

		
		<div class="collect-bg"></div>
		<div class="cloud"></div>
		<div class="stars">
			<!-- <img :src="starBg">  -->
		</div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		:rightNum="9999"
	  		@openRange="which = 'range'"
	  		>
	  	</CommonTop>
		<div class="button task-button" :class="{'fade-left-in': fadeIn}" @click="which = 'task'"></div>
		<div class="button email-button" :class="{'fade-left-in': fadeIn}" @click="which = 'email'"></div>
		<div class="button animal-button" :class="{'fade-right-in': fadeIn}" ></div>
		<div v-if="!online" class="button online-button"  :class="{'fade-right-in': fadeIn}">
			<div class="progress-mask" >
				<div class="progress" :class="{hasBracelet: hasBracelet}">
					<div class="sunny"  :class="{hasBracelet: hasBracelet}"></div>
				</div>
			</div>
			
			<div class="bracelet">+2</div>
		</div>
		<div v-else class="button offline-button" :class="{'fade-right-in': fadeIn}"></div>
		<div class="line">
			<div class="mask"> 
				<div 
					class="progress" 
					:class="{
						'green-action': video.energyType === 'green', 
						'blue-action': video.energyType === 'blue',
						'orange-action': video.energyType === 'orange',
						'yellow-action': video.energyType === 'yellow',
						'green-finish': video.energyType === 'green-finish', 
						'blue-finish': video.energyType === 'blue-finish',
						'orange-finish': video.energyType === 'orange-finish',
						'yellow-finish': video.energyType === 'yellow-finish',
					}"> 
					
				</div>
			</div>
			
		</div>
		<div class="nums-wrap">
			<div class="one-three">
				<div class="num one"></div>
				<div class="num two"></div>
				<div class="num three"></div>
			</div>
			<div class="plus"  @click="plus"></div>
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
		<div 
			class="collect-sunny"
	 		v-if="video.play"
		>
			<video 
				 
				:src="videoSrc"
				autoplay
				:show-fullscreen-btn="false"
				:vslide-gesture-in-fullscreen="false"
				:enable-progress-gesture="false"
				:controls="false"
				:show-center-play-btn="false"
				object-fit="fill"
			/>
			
		</div>
		<div class="energy" :class="{
			'blue': video.energyType === 'blue' || video.energyType === 'blue-finish',
			'yellow': video.energyType === 'yellow' || video.energyType === 'yellow-finish',
			'green': video.energyType === 'green' || video.energyType === 'green-finish',
			'orange': video.energyType === 'orange' | video.energyType === 'orange-finish',
			'show': video.energyShow
		}"></div>
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
		  	fadeIn: false, // 界面加载完时四个弹窗按钮动画效果进入
		  	video: { // 收集能量时视频相关参数
		  		play: false, // 检测到能量时播放视频
		  		energyType: '', // 能量类型（4种，blue，orange，yellow，green）
		  		energyShow: false // 视频将播放完时显示生成的能力球
		  	},
		  	collects: [], // 当前收集能量集  	
		  	online: false, // 是否绑定手环
		  	blueStatus: false, // 蓝牙是否开启
		  	which: '', // 界面显示某一个弹窗
		  	energyIn: false, // 能量背包是否显示
		  	hasBracelet: true, //是否绑定手环
		  	ISSAME: false, // 发现重复颜色能量
		  	IS_SENDING: false, // 正在发送能量
		  }
		},
		computed: {
			videoSrc() {
				return `http://parkiland.isxcxbackend1.cn/${this.video.energyType}.mp4`
			}
		},
		methods: {
			plus() {
				this.energyIn = !this.energyIn; 
				// this.play = true;
 
			},
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
		      const _this = this;
		      wx.openBluetoothAdapter({
		        success(res) {
		        	console.log(99999, res);
		          _this.blueStatus = true;
		          _this.searchBlueTooth();
		        },
		        fail(res) {
		        		console.log('fail', res)
		          wx.onBluetoothAdapterStateChange(function(res) {
		          	console.log(res)
		            if (res.available) {
		              _this.blueStatus = true;
		              _this.searchBlueTooth();
		            }
		          });
		        }
		      });
		    },
		    searchBlueTooth() {
		      //搜索设备
 
		      // if (!this.blueStatus) {
		      //   // _this.warning = true;
		      //   // _this.warningText = "! 请打开蓝牙设备";
		      //   setTimeout(() => {
		      //     // _this.warning = false;
		      //   }, 1000);
		      //   return;
		      // }
		      wx.startBeaconDiscovery({
		        uuids: ["FDA50693-A4E2-4FB1-AFCF-C6EB07647825"],
		        success: res => {
		        	console.info(res, 'res');

		          wx.onBeaconUpdate(res => {
		           console.info("beacons", res.beacons);

		           	 if (this.ISSAME) return
		           	 	console.log('magor', res.beacons[0].major)
		             if (this.collects.includes(res.beacons[0].major)) {
		             	this.ISSAME = true
		             	setTimeout(() => {
		             		this.$tip.toast('不能收集重复能量')
		             		this.ISSAME = false
		             	}, 5000);
		             } else {
		             	this.handleFindDevs(res.beacons);
		             }
		             
		          });
		        },
		        fail: function(err) {
		        	console.log(err, 'err')
		        }
		      });
		    },
		    handleFindDevs(beacons) {
		       if (this.ISENDING) return
		       this.ISENDING = true
		       console.log('发送能量请求');
		       this.video.play = true;
		       const major = beacons[0].major
		       switch (major) {
		       	  case 100:
		       	    this.video.energyType = 'orange'
		       	    break
		       	  case 101:
		       	    this.video.energyType = 'yellow'
		       	    break
		       	  case 102:
		       	    this.video.energyType = 'blue'
		       	    break
		       	  case 103:
		       	    this.video.energyType = 'green'
		       	    break
		       }
		       setTimeout(() => {
		       	this.video.play = false
		       	this.video.energyType += '-finish'
		      // 	this.video.energyShow = false
		       }, 3000);
		        setTimeout(() => {
		       	this.video.energyShow = true
		       }, 2300);
		       this.collects.push(major)
		       console.log(this.collects, 'collects')
		       this.ISENDING = false

		    },
		},
		onShow() {
			this.openBlueTooth()
			
		},
		mounted() {
			this.fadeIn = true
		},
		onUnload() {
			this.fadeIn = false
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
  from {width: 2px;}
  to {width: 45px;}
}
@keyframes progressSunny {
  from {width: 0px;}
  to {width: 38px;}
}
// .for(@list){  
//     .loop(@index:1) when ( @index<=length(@list) ){  
//         @item:extract(@list, @index);  
//         .each(@item);//这里的each相当于一个抽象方法，谁调用for谁来实现  
//         .loop( @index + 1 );  
//     }  
//     .loop();  
// }
// .loop(@i) when (@i < length(@bgcardList)+1){    
// 	.backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));    
// 	.loop(@i+1);
// }.loop(1);
// .ml-loop(@max,@i:1) when (length(@max)>=@i){
//     @{i}% { background-image: url("@{cdn}star@{i}.gif")); }
//     .ml-loop(@max,(@i+1));
// }

@keyframes starsAnimation {
	// .ml-loop(60);
  0% {background-image: url("@{cdn}star00.png")}
  1% {background-image: url("@{cdn}star01.png")}
  2% {background-image: url("@{cdn}star02.png")}
  3% {background-image: url("@{cdn}star03.png")}
  4% {background-image: url("@{cdn}star04.png")}
  5% {background-image: url("@{cdn}star05.png")}
  6% {background-image: url("@{cdn}star06.png")}
  7% {background-image: url("@{cdn}star07.png")}
  8% {background-image: url("@{cdn}star08.png")}
  9% {background-image: url("@{cdn}star09.png")}
  10% {background-image: url("@{cdn}star10.png")}
  11% {background-image: url("@{cdn}star11.png")}
  12% {background-image: url("@{cdn}star12.png")}
  13% {background-image: url("@{cdn}star13.png")}
  14% {background-image: url("@{cdn}star14.png")}
  15% {background-image: url("@{cdn}star15.png")}
  16% {background-image: url("@{cdn}star16.png")}
  17% {background-image: url("@{cdn}star17.png")}
  18% {background-image: url("@{cdn}star18.png")}
  19% {background-image: url("@{cdn}star19.png")}
  20% {background-image: url("@{cdn}star20.png")}
  21% {background-image: url("@{cdn}star21.png")}
  22% {background-image: url("@{cdn}star22.png")}
  23% {background-image: url("@{cdn}star23.png")}
  24% {background-image: url("@{cdn}star24.png")}
  25% {background-image: url("@{cdn}star25.png")}
  26% {background-image: url("@{cdn}star26.png")}
  27% {background-image: url("@{cdn}star27.png")}
  28% {background-image: url("@{cdn}star28.png")}
  29% {background-image: url("@{cdn}star29.png")}
  30% {background-image: url("@{cdn}star30.png")}
  31% {background-image: url("@{cdn}star31.png")}
  32% {background-image: url("@{cdn}star32.png")}
  33% {background-image: url("@{cdn}star33.png")}
  34% {background-image: url("@{cdn}star34.png")}
  35% {background-image: url("@{cdn}star35.png")}
  36% {background-image: url("@{cdn}star36.png")}
  37% {background-image: url("@{cdn}star37.png")}
  38% {background-image: url("@{cdn}star38.png")}
  39% {background-image: url("@{cdn}star39.png")}
  40% {background-image: url("@{cdn}star40.png")}
  41% {background-image: url("@{cdn}star41.png")}
  42% {background-image: url("@{cdn}star42.png")}
  43% {background-image: url("@{cdn}star43.png")}
  44% {background-image: url("@{cdn}star44.png")}
  45% {background-image: url("@{cdn}star45.png")}
  46% {background-image: url("@{cdn}star46.png")}
  47% {background-image: url("@{cdn}star47.png")}
  48% {background-image: url("@{cdn}star48.png")}
}
.collect-wrap{
	overflow:hidden;
	height:100%;
	width:100%;
	position:absolute;
 
	.collect-bg{
		height:100%;
		width:100%;
		position:absolute;
		.bg("pl2_background@2x");
		background-size: 100% 100%;
	}
	.cloud{
		height:100%;
		width:100%;
		position:absolute;
		.bg("pl2_cloud@2x");
	}
	.stars{
		animation: starsAnimation 2s infinite;
		// height:100%;
		// width:100%;
		width:150px;
		height: 150px;
		position:absolute;
		left:50%;
		transform: translateX(-45%);
		top:110px;
		// background: url("http://parkiland.isxcxbackend1.cn/star39.gif")  center center no-repeat;
    	background-size: 100% 100%;
 
	}
	.button{
		transition: 1s;
		position:absolute;
		width:67px;
		height:57px;
		
		&.task-button{
			left:-70px;
			top:108px;
			.bg("pl2_task@2x");
		}
		&.email-button{
			left:-70px;
			top:179px;
			.bg("pl2_mail@2x");
		}
		&.animal-button{
			right:-70px;
			top:108px;
			.bg("pl2_PetCard@2x");
		}
		&.online-button{
			right:-70px;
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
				border-radius:12px;
				position: absolute;
				width:48px;
				height: 10px;
				bottom:15px;
				left:14px;
				overflow:hidden;
				box-sizing: border-box;
				padding:2px;
				.bg("pl2_line_schedule_mask@2x");
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
						animation: progressBraceletOnline 2s infinite ease;
					}
					.sunny{
						position: absolute;
						top:3px;
						left:3px;
						width: 0px;
						height: 1px; 
						background: #fff;
					 	&.hasBracelet{
							animation: progressSunny 2s infinite ease;
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
	.line{
		z-index:30;
		width: 236px;
		height:19px;
		.bg("pl2_green@2x");
		position:absolute;
		left:50%;
		transform:translateX(-50%);
		bottom:229px;
		.mask{
	 		// .bg("pl2_mask@2x");
			position: absolute;
			border-radius:12px;
			border:2px solid #000;
			box-sizing: border-box;
			background: #fff;
			top:0;
			width:100%;
			height: 15px;
			right:0;
			overflow:hidden;
		 
			.progress{
				// border-radius:12px;
				transition:width 3s ease;
				height: 100%;
				width:0;
				background: #23ff03;
			 
				&.green-action{
					width:100%;
					background: #23ff03;
				}
				&.yellow-action{
					width:100%;
					background: #ffe504 ;
				}
				&.blue-action{
					width:100%;
					background: #04b8ff;
				}
				&.orange-action{
					width:100%;
					background: #ff7603 ;
				}
				&.green-finish{
					transition:width 0.5s;
					background: #23ff03;;
				}
				&.yellow-finish{
					transition:width 0.5s;
					background: #ffe504 ;
				}
				&.blue-finish{
					transition:width 0.5s;
					background: #04b8ff;
				}
				&.orange-finish{
					transition:width 0.5s;
					background:#ff7603 ;
				}

			}
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
	.collect-sunny{
		position: absolute;
		left:0;
		top:0;
		height: 100%;
		width:100%;
		z-index:20;
		video{
			height: 100%;
			width:100%;
		}
		
	}
	.energy{
		z-index:88;
		position: absolute;
		top: 100px;
		left: 50%;
		height: 118px;
		width:118px;

		display: none;
		transform: translateX(-50%);
		&.blue{

			.bg("pl2_ball_blue@2x");
		}
		&.green{
			.bg("pl2_ball_green@2x");
		}
		&.yellow{
			.bg("pl2_ball_yellow@2x");
		}
		&.orange{
			.bg("pl2_ball_orange@2x");
		}
		&.show{
			display: block;
		}

	} 
}
</style>
