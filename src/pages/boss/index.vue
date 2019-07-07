<template>
  <div class="beat-boss-wrap">
  	<CommonTop 
  		:avatar="avatar" 
  		ctxt="点击屏幕攻击怪兽，一起保护PRAKINLAND"
  		:leftNum="9999"
  		:rightNum="9999">
  	</CommonTop>
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
import CommonTop from 'components/top'
export default {
	data () {
	  return {
	    avatar: 'http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg'
	  }
	},
	components: { CommonTop }
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
	.main{
		position: relative;
		height: 321px;
		.ellipse{
			position: absolute;
			width:255px;
			height: 30px;
			background:rgba(135,210,125,0.6);
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
				font-size:9px;
				left:50px;
				width:90px;
				top:23px;
				background: url("@{imgOrigin}pl2_time@2x.png") no-repeat 0 center;
				background-size:10px 12px; 
				height: 13px;
				line-height:18px;
				font-size:9px;
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
				// font-weight: bold;
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
				// font-weight: bold;
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