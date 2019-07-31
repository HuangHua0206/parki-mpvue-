<template>
  <div class="earth-wrap" @click="$emit('closePop')">
  	<div class="mask" ></div>
  	<div class="earth-wrap">
		<div class="earth-button">确认</div>  
	</div>
  </div>
</template>
<script>
// Use Vuex
const imgOrigin = 'http://parkiland.isxcxbackend1.cn/'
const DEFAULT_AVATER = imgOrigin + 'magic_energy@2x.png'
export default {
}
</script>

<style  lang="less">
@import "~less/mixin.less";
	.earth-wrap{
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:100;
		.mask{
		left:0;
		top:0;
		position: absolute;
		.bg("pl2_blackhalf@2x");
		width:100%;
		height: 100%;
	} 
  .earth-wrap {
		box-sizing: border-box;
		height: 576px;
		position: absolute;
		width:347px;
		.bg('pl2_earthquake@2x');
		left: 14px;
		bottom: 14px;
		z-index: 3;
	.earth-button {
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