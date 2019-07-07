<template>
  <div class="beat-boss-wrap">
    <div class="top">
      <div class="avatar">
        <img :src="avatar" />
      </div>
      <div class="nums">
        <div class="left-num">
        	9999
        </div>
        <div class="right-num">
        	9999
        </div>
      </div>
    </div>
    <div class="attention">
      <p>点击屏幕攻击怪兽，一起保护PRAKINLAND.</p>
    </div>
    <div class="main">
      <div class="ellipse"></div>
      <div class="collect-btn"></div>
      <div class="blood">
        <div class="blood-avatar"></div>
        <div class="blood-num"></div>
        <div class="count-down">
        	倒计时 04:22
        </div>
      </div>
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
    		<img :src="avatar" />
    		<div class="top">
    			<div class="left">
    				<div class="rand green"></div>
    				<div class="rand orange"></div>
    				<div class="rand blue"></div>
    			</div>
    			<div class="content">小鸡</div>
    		</div>
    		<div class="bottom">
    			<div class="left">LV1</div>
    			<div class="content">攻击力15</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
// Use Vuex
const imgOrigin = 'http://parkiland.isxcxbackend1.cn/'
const DEFAULT_AVATER = imgOrigin + 'pl2_head@2x.png'
export default {
	data () {
	  return {
	    avatar: 'http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg'
	  }
	}
}
</script>

<style  lang="less">
@imgOrigin: "http://parkiland.isxcxbackend1.cn/";
.bg(@url){
 	background: url("@{imgOrigin}@{url}.png") center center no-repeat ;
    background-size: 100% 100%;
}
  .beat-boss-wrap{
  	box-sizing: border-box;
    height: 100%;
    position: absolute;
    width:100%;
    .bg('pl2_boss-background@2x');
    padding:15px 20px 0 0;   
    .top{
    	display: flex;
        .avatar{
        	margin-left: 15px;
        	margin-right: 17px;
        	height: 50px;
        	width: 50px;
        	img{
	          height: 100%;
	          width: 100%;
	          border-radius: 50%;
	          border: 3px solid #000;
	        }
        }
        .nums{
			flex:1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left-num{
				box-sizing: border-box;
				padding-right: 4px;
				margin-left: 5px;
				.bg('pl2_energy@2x');
				width:67px;
				height: 22px;
				text-align:right;
				color:rgb(255, 173, 1);
				font-weight: bold;
				line-height: 17px;
				padding-bottom:5px; 
			}
			.right-num{
				box-sizing: border-box;
				padding-right: 4px;
				margin-right: 42px;
				.bg('pl2_Ranking@2x');
				width:67px;
				height: 22px;
				text-align:right;
				color:#fff;
				font-weight: bold;
				line-height: 22px;
				line-height: 17px;
				padding-bottom:5px;
			}		
        }
    }
    .attention{
    	box-sizing: border-box;
		width:295px;
		height: 21px;
		background: ;
		border-radius: 6px;
		background: url("@{imgOrigin}pl2_tips@2x.png") no-repeat 36px center rgba(0, 0, 0, 0.1);
		background-size:10px 12px;
		color:#fff;
		// text-align:center;
		font-size:7px;
		line-height:21px;
		margin:10px auto 22px;
		font-weight: bold;
		padding-left: 87px;
	}
	.main{
		position: relative;
		height: 321px;
		.ellipse{
			position: absolute;
			width:255px;
			height: 40px;
			background:rgba(0, 0, 0, 0.1);
			border-radius:50%;
			left:70px;
			bottom:0;
		}
		.collect-btn{
			width:67px;
			height: 62px;
			.bg('pl2_collection@2x');
		}
		.blood{
			position: absolute;
			top:12px;
			left:125px;
			// transform: translateX(-50%);
			.blood-avatar{
				position: absolute;
				top:0;
				left:0;
				width:20px;
				height: 20px;
				.bg('pl2_head@2x');
				z-index:1
			}
			.blood-num{
				position: absolute;
				top:4px;
				left:16px;
				height: 12px;
				width:150px;
				.bg('pl2_blood@2x');
			}
			.count-down{
				position: absolute;
				left:50px;
				width:90px;
				top:23px;
				background: url("@{imgOrigin}pl2_time@2x.png") no-repeat 0 center;
				background-size:10px 12px; 
				height: 13px;
				font-size:9px;
				font-weight: bold;
				padding-left:16px;
			}
		}
	}
	.info{
		box-sizing: border-box;
		position: absolute;
		bottom: 30px;
		left:50px;
		width:275px;
		height: 112px;
		.bg('pl2_excel@2x');
		padding:0 12px 10px 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left-info{
			.attack{
				box-sizing:border-box;
				background: url("@{imgOrigin}pl2_attack@2x.png") no-repeat 0 center;
				background-size: 17px 16px;
				padding-left: 26px;
				font-size:10px;
				font-weight: bold;
				height: 20px;
				line-height:20px;
				.plus{
					display: inline-block;
					margin-top: 2px;
					margin-left: 8px;
					height: 15px;
					background: url("@{imgOrigin}pl2_kid@2x.png") no-repeat 0 center;
					background-size: 15px 15px;
					color:rgb(255, 186, 0);
					padding-left: 18px;
					line-height: 15px;
				}

			}
			.damage{
				box-sizing:border-box;
				background: url("@{imgOrigin}pl2_damage@2x.png") no-repeat 0 center;
				background-size: 14px 20px;
				padding-left: 26px;
				margin-top: 15px;
				font-size:10px;
				font-weight: bold;
				height: 20px;
				line-height:20px;
			}
		}
		.right-card{
			box-sizing: border-box;
			width:63px;
			height: 85px;
			border:1px solid #000;
			border-radius: 6px;
			padding:1px;
			position: relative;
			img{
				width:100%;
				height: 100%;
			}
			.top, .bottom{
				position: absolute;
				width: 59px;
				background: rgb(8, 132, 192);
				height: 12px;
				display: flex;
				padding: 0 3px;
				box-sizing: border-box;
				justify-content: space-between;
			}
			.top{
				top:1px;
				border-top-left-radius: 6px;
				border-top-right-radius: 6px;
				.content{
					font-size:8px;
					color:#fff;
					line-height:12px;
				}
				.left{
					display: flex;
					align-items: center;
					.rand{
						width:6px;
						height: 6px;
						border-radius:50%;
						border: 1px solid #000;
						&.green{
							.bg('pl2_ball_green@2x');
						}
						&.orange{
							.bg('pl2_ball_orange@2x');
						}
						&.blue{
							.bg('pl2_ball_blue@2x');
						}
					}
				}
			}
			.bottom{ 
				padding: 0 3px;
				bottom:1px;
				.left{
					line-height:12px;
					font-size: 10px;
					color:#fff;
				}
				.content{
					font-size:6px;
					color:#fff;
					background: url("@{imgOrigin}pl2_attack@2x.png") no-repeat 0 center;
					background-size: 6px 6px;
					padding-left: 7px;
					line-height:12px;
				}
			}
		}
	}
}
</style>