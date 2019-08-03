<template>
  <div class="energy-pop-wrap" >
  	<div class="mask" ></div>
  	<div class="energy-wrap">
		<CommonDescription 
			ctxtL="注意：您绑定的手环变成了神奇能量"
			className="first-text"
			etxt="Note: THE BRACELET YOU BIND BECOMES MAGICAL ENERGY.">
		</CommonDescription>
		<CommonDescription 
			ctxtL="快让其他玩家搜集你的神奇能量，你们都能获得大量积分奖励！"
			className="second-text"
			etxt="LET OTHER PLAYERS COLLECT YOUR ARTIFACT ENERGY.YOU CAN GET ALOT OF POINTS REWORD!">
		</CommonDescription>
		<div class="content">
			<div class="time ">剩余时间：{{ time }}</div>
			<div class="nums">
				<div class="one">
					<div class="money">
						<div class="icon"></div>
						<div class="cost">+30</div>
					</div>
					<div class="total">
						<div class="total-name">总计获得：</div>
						<div class="icon"></div>
						<div class="cost">{{total}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>
<script>
 
import CommonDescription from 'components/description'
export default {
	components: { CommonDescription },
	computed: {
		time() {
			console.log(this.remain, 'this.remain')
			let m = parseInt((this.remain / 60)).toString()
			if (m.length < 2) {
				m = '0' + m
			}
			let s = (this.remain % 60).toString()
			if (s.length < 2) {
				s = '0' + s
			}
			return m + ' : ' +s
		}
	},
	props: {
		time: {
			type: Number
		},
		total: {
			type: Number
		},
		remain: {
			type : [Number, String]
		}
	}
}
</script>

<style  lang="less">
@import "~less/mixin.less";
	.energy-pop-wrap{
			left:0;
			top:0;
			position: absolute;
			width:100%;
			height: 100%;
			z-index:100;
		.mask{
		
			left:0;
			top:0;
			position: absolute;
			.bg("pl2_blackhalf@2x");
			width:100%;
			height: 100%;
		} 
		  .energy-wrap {
				box-sizing: border-box;
				height: 576px;
				position: absolute;
				width:347px;
				.bg('pl2_magic_energy@2x');
				left: 50%;
				transform:translateX(-50%);
				bottom: 14px;
				z-index: 3;
				  
			.first-text {
				position: absolute;
				top: 109px;
				padding: 0 22px;
			}
			.second-text {
				position: absolute;
				bottom: 229px;
				padding: 0 22px;
			}
			.energy-button {
				.bg('pl2_sure@2x');
				width: 85px;
				height: 45px;
				text-align: center;
				line-height: 45px;
				position: absolute;
				bottom: 37px;
				left: 50%;
				transform: translateX(-50%);
			}
			.content{
				font-size: 14px;
				width:100%;
				box-sizing: border-box;
				padding: 0 44rpx;
				position: absolute;
				bottom:15px;
				display: flex;
				justify-content: space-between;
				.nums{
					margin-right: 33px;
					.money{
						text-align: right;
						display:flex;
						margin-bottom: 10px;
						justify-content:flex-end;
					//	margin-top:15px;
						.icon{
							.bg("pl2_energy");
							width:15px;
							height:20px;
							margin-right: 8px;
						}
						.cost{
							height:20px;
							// line-height: 34rpx;
							color: #ffad01;
							line-height: 20px;
							// font-size:16px;
						}
					}
					.total{
						display: flex;
						justify-content: flex-end;
						.icon{
							.bg("pl2_energy");
							width:15px;
							height:20px;
							margin-right: 8px;
						}
						.cost{
							height:20px;
							// line-height: 34rpx;
							color: #ffad01;
							line-height: 20px;
							// font-size:16px;
						}
					}
				}
			}
		}
}
</style> 