<template>
	<div class="description-wrap" :class="className" >
		<div class="chinese-text">
			{{ctxtL}}<span class="red-text">{{rtxt}}</span>{{ctxtR}}
	    </div>
	    <div class="english-text">
	       {{etxt}}
	    </div>
	</div>
</template>
<script>
	import storage from 'utils/storage'
	export default{
		props: {
			ctxtL: {
				type: String,
				rquired: true
			},
			rtxt: {
				type: String,
				rquired: false
			},
			ctxtR: {
				type: String,
				rquired: false
			},
			etxt: {
				type: String,
				rquired: true
			},
			className: {
				type: String,
				rquired: false
			},
		}
	}
</script>
<style lang="less">
.description-wrap{
	text-align: left;
	.chinese-text {
		font-size: 15px;
		color: #000;
		line-height: 18px;
		.red-text {
			color: #F82222;
		}
	}
    .english-text {
		font-size: 12px;
		color: #878787;
		line-height: 18px;
	}
}
</style>