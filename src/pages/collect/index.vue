<template>
	<div class="collect-wrap">
		<div class="cloud"></div>
		<CommonTop 
	  		:avatar="avatar" 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		:rightNum="9999">
	  	</CommonTop>
		<div class="button task-button"></div>
		<div class="button email-button"></div>
		<div class="button animal-button"></div>
		<div v-if="online" class="button online-button">
			<div class="bracelet">+2</div>
		</div>
		<div v-else class="button offline-button"></div>
		<div class="line"></div>
		<div class="nums-wrap">
			<div class="one-three">
				<div class="num one"></div>
				<div class="num two"></div>
				<div class="num three"></div>
			</div>
			<div class="plus"></div>
		</div>
		<div v-if="false" class="energy-wrap">
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
		<div v-else class="my-home"></div>
	</div>
</template>
<script>
	import CommonTop from 'components/top'
	export default{
		data () {
		  return {
		  	online: false,
		    avatar: 'http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg'
		  }
		},
		components: { CommonTop }
	}
</script>
<style lang="less">
@cdn: "http://parkiland.isxcxbackend1.cn/";
.bg(@url, @vertical:center){
 	background: url("@{cdn}@{url}.png") center @vertical no-repeat ;
    background-size: 100% 100%;
}
.collect-wrap{
	height:100%;
	width:100%;
	position:absolute;
	.bg("pl2_background@2x");
	background-size: 100% 100%;
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
			top:180px;
			.bg("pl2_mail@2x");
		}
		&.animal-button{
			right:0;
			top:108px;
			.bg("pl2_PetCard@2x");
		}
		&.online-button{
			right:0;
			top:180px;
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
		bottom:210px;
	}
	.nums-wrap{
		position:absolute;
		bottom:132px;
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
				height:66px;
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
		box-sizing:border-box;
		position:absolute;
		bottom:0;
		left:50%;
		transform:translateX(-50%);
		width:356px;
		height:132px;
		.bg("pl2_bag@2x");
		display:flex;
		justify-content:space-between;
		padding:45px 22px 0 20px;
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
		position:absolute;
		left:50%;
		bottom:15px;
		width:100px;
		height:110px;
		.bg("pl2_Parkiland@2x");
		transform:translateX(-50%);
	}
}
</style>
