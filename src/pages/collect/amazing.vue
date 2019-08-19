<template>
  <div class="energy-pop-wrap" @click="$emit('closePop')">
<!--   	<div class="mask" ></div> -->
  	<div class="energy-wrap">
		<CommonDescription 
			:ctxtL="'注意：玩家'+player+'的'"
			ctxtR="变成了神奇能量。"
			rtxt="手环"
			className="first-text"
			etxt="Note: A player's Bracelet becomes magical energy.">
		</CommonDescription>
		<CommonDescription 
			:ctxtL="'快找到'+player+'！搜集神奇能量能获得大量积分！'"
			className="second-text"
			etxt="Find it quickly! Gathering magic energy can get a lot of points!">
		</CommonDescription>
		<div class="energy-button">确认</div>  
	</div>
  </div>
</template>
<script>
 
import CommonDescription from 'components/description'
export default {
	components: { CommonDescription },
	props: {
		player: {
			type: String
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
		transform:translate(-50%, -50%);
		top:50%;
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
	}
}
</style> 