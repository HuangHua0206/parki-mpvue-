<template>
	<div class="animal-pop-wrap">
<!-- 		<div class="mask" @click="$emit('closePop')"></div> -->
		<div class="animal-bg">
			<div class="logo"></div>
			<div class="text" v-if="selectedItem">
				<div>守护宠物</div>
				<div>{{selectedItem.petname}}</div>
				<div>等级：{{ selectedItem.level }}</div>
				<div>战斗力：{{selectedItem.power}}</div>
			</div>
			<CommonCard
				v-if="selectedItem"
				className="show-card"
				:level="selectedItem.level+'级'"
				:eng="'战斗力：' + selectedItem.power"
				:url="'http://parkiland.isxcxbackend1.cn/pl2_'+selectedItem.petname+'.png'"
			/>
			
			<div v-else class="not-select"></div>
			<div class="attention">
	       点击宠物卡片更换跟随的宠物，战斗力越高，狩猎怪物越快呢！
	    </div>
			<div class="list">
				<div class="card-list-wrap">
					<CommonCard
						@selectAnimal="$emit('selectAnimal', item.petid)"
						:progressWidth="(item.experience/Math.pow(2, item.level))*100 + '%'"
						:key="$index"
						:progress="item | progress"
					    v-for="(item, $index) in animalList"
						:text="item | text"
						:level="item.level+'级'"
						:eng="'战斗力：' + item.power"
						className="card-list"
						:selected="item.selected"
						@upgrade="$emit('upgrade',item)"
						:url="'http://parkiland.isxcxbackend1.cn/pl2_'+item.petname+'.png'"
					/>
				</div>
			</div>
			
			<div class="close-btn" @click="$emit('closePop')"> </div>
		</div>
	</div>
</template>
<script>
	import CommonCard from 'components/animalCard'
	import storage from 'utils/storage'
	export default{
		filters: {
			progress(item) {
				const level = Math.pow(2, item.level)
				if (item.level === 8) {
					return 'max'
				} else if (item.experience >= Math.pow(2, item.level)) {
					return 'update'
				} else {
					return 'other'
				}
			},
			text(item) {
				if (item.level === 8) {
					return 'MAX'
				} else if (item.experience >= Math.pow(2, item.level)){
					return '升级'
				} else {
					return item.experience + ' / ' + Math.pow(2, item.level)
				}
			}
		},
		computed: {
			selectedItem() {
				if (this.animalList && this.animalList.length) {
				 	return this.animalList.filter(item => item.selected === 1)[0]
				} else {
					return null
				}
			}
		},
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

		z-index:100;
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
		.attention{
    	position:absolute;
    	top:33vh;
    	box-sizing: border-box;
		width:295px;
		height: 21px;
		background: ;
		border-radius: 6px;
		background: url("@{cdn}pl2_tips@2x.png") no-repeat 35px 3px rgba(0, 0, 0, 0.5);
		background-size:12px 15px;
		color:#fff;
		font-size:8px;
		line-height:21px;
		text-align:center;

		padding-left: 35px;
		left:50%;
		transform:translateX(-50%);
	}
		.animal-bg{
			z-index:10;
			.bg("petcard background");
			width:100%;
	    	height: 100%;
			// overflow-y:auto;
			position: absolute;
			// right:0;
			// bottom:14px;
			// padding: 0 25px;
			.logo{
				position:absolute;
				top:39px;
				right: 74px;
				.bg("pet card@2x");
				width: 55px;
				height:47px;
			}
			.not-select{
				.bg("pl2_noselect");
				// background: url("@{cdn}pl2_noselect.jpg")  center center no-repeat;
    // 			background-size: 100% 100%;
    			width: 115px;
        		height: 155px;
        		margin: 40px 0 0 25px;
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
			.list{
				height:60vh;
				overflow-y:auto;
				-webkit-overflow-scrolling: touch;
				position: absolute;
				left: 14px;
				bottom: 20px;
			}
			.card-list-wrap {

				display: flex;
				flex-wrap: wrap;
				// position: absolute;
				// left: 14px;
				// top: 229px;
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