<template>
	<div class="success-pop-wrap">
		<div class="mask" >
			<div class="title">恭喜您获得了</div>
			
			<div class="animal" v-if="!!pet">
				<div class="bg1">
					<div class="bg2"></div>
			 		<div class="card">
			 			<CommonCard
						text="2/4"
						:level="pet.level+'级'"
						:eng="'战斗力：' + pet.power"
						className="card-list"
						:url="'http://parkiland.isxcxbackend1.cn/pl2_'+pet.petname+'.png'"
					/>
			 		</div>
					
				</div>
				<div class="num">{{integral}}</div>
			</div>
			<div class="no-animal" v-else>
				<div class="num">{{integral}}</div>
			 
				<div class="card"></div>
			</div>
			<div class="btn" @click="$emit('resetData')">确认</div>
		</div>
		
	</div>
</template>
<script>
	import CommonCard from 'components/animalCard'
	export default{
		components: { CommonCard }, 
		props: {
			integral: {
				type: Number
			},
			pet: {
				type: Object
			}
		},
		data() {
			return {
				animal: true
			}
		}
	}
</script>
<style lang="less">
@import "~less/mixin.less";
@keyframes getAnimalBg{
	0%{transform:rotate(0deg);}
	50%{transform:rotate(360deg);}
	100%{transform:rotate(0deg);}
}
	.success-pop-wrap{
		z-index:40;
		position: absolute;
		width:100%;
	    height: 100%;
		.mask{
			left:0;
			top:0;
			position: absolute;
			background:rgba(0, 0, 0, 0.8);
		//	.bg("pl2_blackhalf@2x");
			width:100%;
			height: 100%;
			.num{
				font-size:30px;
				width:70px;
				margin:0 auto;
				line-height:36px;
				height:30px;
				text-align:center;
				color:#f9bf2b;
				padding-left:20px;
				background: url("@{cdn}pl2_energy_2@2x.png") no-repeat 0 top;
				background-size:15px 100%;
			}
			.title{
				font-size:30px;
				color:#f9bf2b;
				margin:40px auto 20px;
				text-align:center;
			}
			.no-animal{
				
				.card{
					width: 227px;
					height:238px;
					.bg("pl2_no_animal");
					margin: 20px auto 0;
				}
			}
			.animal{
				.bg1{
					width: 179px;
					height:219px;
					margin: 20px auto 10px;
					position:relative;
					.bg("pl2_congratulation stay@2x");
					.bg2{
						animation:getAnimalBg 2s infinite ease;
						.bg("pl2_congratulation pl2_spin@2x");
						position:absolute;
						width:205px;
						height:205px;
						left:-7px;
						top:7px;
					}
					.card{
						position:absolute;
						left:50%;
						top:50%;
						transform:translate(-50%, -50%);
						// .bg("pl2-1星-松鼠-no.2");
						width: 115px;
						height:155px;
					}
				}
			}
			.btn{
				width:85px;
				height:45px;
				position:absolute;
				left:50%;
				transform:translateX(-50%);
				bottom:60px;
				.bg("pl2_sure_animal@2x");
				font-size:20px;
				text-align:center;
				line-height:43px;
			}
		}
		
	}
</style>