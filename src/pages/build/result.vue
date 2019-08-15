<template>
	<div class="hunting-result" :class="{
		'success': dragonResult === 'success',
		'fail': dragonResult === 'fail'
	}">
		<div class="money" v-if="dragonResult==='success'">
			<div class="icon"></div>
			<div class="cost">+{{huntingIntegral}}</div>
		</div>
		<div class="close-btn" @click="$emit('closePop')"></div>
		<div class="btn" @click="$emit('closePop')">确认</div>
	</div>
</template>
<script>
	export default{
		created() {
			console.log(this.dragonResult, this.huntingIntegral, 'iii')
		},
		props: {
			dragonResult: {
				type: String
			},
			huntingIntegral: {
				type: Number
			}
		}
	}
</script>
<style lang="less">
@import '~less/mixin.less';
	.hunting-result{
		z-index:102;
		position: absolute;
		width: 548rpx;
		height: 838rpx;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		
		&.success{
			.bg('pl2_Success@2x');	
		}
		&.fail{
			.bg('pl2_Failure@2x');
		}
		.money{
			position:absolute;
			top:347rpx;
			left:50%;
			transform:translateX(-50%);
			text-align: right;
			display:flex;
			margin-bottom: 10px;
			justify-content:flex-end;
		//	margin-top:15px;
			.icon{
				.bg("pl2_energy");
				width:22rpx;
				height:44rpx;
				margin-right: 8px;
			}
			.cost{
				height:20px;
				// line-height: 34rpx;
				color: #ffad01;
				line-height: 56rpx;
				font-size:48rpx;
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
			position:absolute;
			bottom:70rpx;
			left:50%;
			transform:translateX(-50%);
			font-size:24rpx;
			text-align:center;
			line-height:80rpx;
			width:170rpx;
			height:89rpx;
			.bg('pl2_set-sure@2x');
		}
	}
</style>