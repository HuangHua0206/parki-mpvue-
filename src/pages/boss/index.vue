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
      <div class="collect-btn"></div>
      <div class="blood">
        <div class="blood-avatar"></div>
        <div class="blood-num"></div>
        <div class="count-down">
        	倒计时 04:22
        </div>
      </div>
    </div>
    <div class="info"></div>
  </div>
</template>
<script>
// Use Vuex
const imgOrigin = 'http://parkiland.isxcxbackend1.cn/'
const DEFAULT_AVATER = imgOrigin + 'pl2_head@2x.png'
export default {
	data () {
	  return {
	    avatar: DEFAULT_AVATER
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
	          border: 1px solid #000;
	        }
        }
        .nums{
			flex:1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left-num{
				margin-left: 5px;
				.bg('pl2_energy@2x');
				width:67px;
				height: 22px;
				text-align:right;
				color:yellow;
				font-weight: bold;
				line-height: 22px;
			}
			.right-num{
				margin-right: 42px;
				.bg('pl2_Ranking@2x');
				width:67px;
				height: 22px;
				text-align:right;
				color:#fff;
				font-weight: bold;
				line-height: 22px;
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
		position: absolute;
		bottom: 41px;
		left:50px;
		width:275px;
		height: 110px;
		.bg('pl2_excel@2x');
	}
}
</style>