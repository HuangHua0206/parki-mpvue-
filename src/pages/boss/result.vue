<template>
	<div class="boss-result-wrap" :class="{
		'success': result === 'success',
		'fail': result === 'fail'
	}">
		<div class="content" v-if="result === 'success'">
			<p>在所有人的努力下</p>
			<p style="margin-bottom: 20px;">怪兽被击退了，家园被守护</p>
			<p>你对怪兽的伤害为99%</p>
			<p>你获得了999积分作为奖励</p>
		</div>
		<div class="close-btn" @click="goCollect"></div>
		<div class="btn" @click="goCollect">确认</div>
	</div>
</template>
<script >
	export default{
		props: {
			result: {
				type: String
			}
		},
		methods: {
			goCollect() {
				
		    	wx.redirectTo({ url: '/pages/collect/main' });
			}
		}
	}
</script>
<style lang="less">
	@import '~less/mixin.less';
	.boss-result-wrap{
		z-index:100;
		position: absolute;
		width:548rpx;
		height:840rpx;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		&.success{
			.bg('pl2_boss_win');
		}
		&.fail{
			.bg('pl2_boss_fail');
		}
		.content{
			margin: 260rpx auto 0;
			p{
				text-align: center;
				font-size:12px;
				line-height:20px;
			}
		}
		.close-btn{
			width:30px;
			height: 30px;
			.bg("pl2_no@2x");
			position: absolute;
			right:-10px;
			top:-10px;
		}
		.btn{
			width: 170rpx;
			height:89rpx;
			.bg('pl2_share_btn');
			left:50%;
			position: absolute;
			bottom:79rpx;
			transform: translateX(-50%);
			font-size:24rpx;
			line-height: 80rpx;
			text-align:center;
		}
	}
</style>