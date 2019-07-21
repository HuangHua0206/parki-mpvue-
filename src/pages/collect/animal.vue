<template>
	<div class="animal-pop-wrap">
		<div class="mask" @click="$emit('closePop')"></div>
		<div class="animal-bg">
			<div class="logo"></div>
			<div class="text">
				<div>守护宠物</div>
				<div>小熊</div>
				<div>等级：6</div>
				<div>战斗力：56</div>
			</div>
			<CommonCard
				className="show-card"
				level="2级"
				eng="战斗力：22"
				url="http://parkiland.isxcxbackend1.cn/3%E6%98%9F-%E5%B0%8F%E7%86%8A-no.6.png"
			/>
			<div class="card-list-wrap">
				<CommonCard
					:key="$index"
					progress="other"
				    v-for="(item, $index) in animalList"
					:text="item.experience + ' / ' + Math.pow(2, item.level)"
					:level="item.level+'级'"
					:eng="'战斗力：' + item.power"
					className="card-list"
					:url="'http://parkiland.isxcxbackend1.cn/pl2_'+item.petname+'.png'"
				/>
				<CommonCard
					text="2/4"
					isnew
					level="2级"
					eng="战斗力：22"
					className="card-list"
					progress="other"
					url="http://parkiland.isxcxbackend1.cn/3%E6%98%9F-%E5%B0%8F%E7%86%8A-no.6.png"
				/>
			</div>
			<div class="animal-button">更换</div>  
			<div class="close-btn" @click="$emit('closePop')"> </div>
		</div>
	</div>
</template>
<script>
	import { animalListService } from 'services/collect'
	import CommonCard from 'components/animalCard'
	import storage from 'utils/storage'
	export default{
		props: {
			animalList: {
				type: Array
			}
		},
		components: { CommonCard },
	}
</script>
<style lang="less">
@import "~less/mixin.less";
	.animal-pop-wrap{

		z-index:55;
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
		
		.animal-bg{
			z-index:10;
			.bg("petcard background");
			width:365px;
			height: 586px;
			overflow-y:auto;
			position: absolute;
			right:0;
			bottom:14px;
			// padding: 0 25px;
			.logo{
				position:absolute;
				top:39px;
				right: 74px;
				.bg("pet card@2x");
				width: 55px;
				height:47px;
			}
			.animal-button {
				.bg('pl2_sure@2x');
				width: 85px;
				height: 45px;
				text-align: center;
				line-height: 45px;
				position: absolute;
				top: 149px;
				right: 17px;
			}
			.show-card {
				position: absolute;
				left: 14px;
				top: 38px;
			}
			.card-list-wrap {
				position: absolute;
				left: 14px;
				top: 229px;
			}
			.text {
				font-size: 14px;
				color: #fff;
				font-weight: bold;
				line-height: 20px;
				position: absolute;
				top: 113px;
				left: 151px;
				// text-shadow:5px 2px 10px #000;
				-webkit-text-stroke: 0.1px #000000;
			}
			.close-btn{
				position: absolute;
				top:39px;
				// transform:translateY(-50%);
				height: 42px;
				width:42px;
				.bg("pl2_right_back@2x");
				right:17px;
			}
		}

	}
</style>