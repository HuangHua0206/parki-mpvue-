<template>
	<div class="success-pop-wrap">
		<div class="mask" ></div>
		<div class="title">恭喜您获得了</div>
		<div class="card"></div>
		<div class="num"></div>
		<div class="btn" @click="$emit('resetData')">确认</div>
	</div>
</template>
<style lang="less">
@import "~less/mixin.less";
	.success-pop-wrap{
		z-index:40;
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
	}
</style>