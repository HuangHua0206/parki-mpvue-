<template>
	<div :class="className" class="animalCard-wrap">
		<image :src="url" class="animalCard-img" />
        <div :class="progress"><div>{{text}}</div></div>
        <div class="animalCard-level">{{level}}</div>
        <div class="animalCard-eng">{{eng}}</div>
        <div class="animalCard-new" v-if="isnew"></div>
        <div class="animalCard-ok" v-if="isok"></div>
    </div>
</template>
<script>
	import storage from 'utils/storage'
	export default{
		props: {
			url: {
				type: String,
				rquired: true
			},
            isnew: {
				type: Boolean,
				rquired: false
			},
            isok: {
				type: Boolean,
				rquired: false
			},
			text: {
				type: String,
				rquired: false
			},
			level: {
				type: String,
				rquired: false
			},
            eng: {
				type: String,
				rquired: false
			},
			className: {
				type: String,
				rquired: false
			},
            progress: {
				type: String,
				rquired: false
			},
		}
	}
</script>
<style lang="less">
@imgOrigin: "http://parkiland.isxcxbackend1.cn/";
.bg(@url){
 	background: url("@{imgOrigin}@{url}.png") center top no-repeat ;
    background-size: 100% 100%;
}
.animalCard-wrap{
	width: 115px;
    display: inline-block;
    margin-right: 2px;
    margin-bottom: 30px;
    position: relative;
    // height: 155px;
    .animalCard-img {
        width: 115px;
        height: 155px;
    }
    .max {
        width: 114px;
        height: 22px;
        .bg("max@2x");
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        text-shadow:5px 2px 10px #000;
    }
    .update {
        width: 114px;
        height: 22px;
        .bg("up3@2x");
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        text-shadow:5px 2px 10px #000;
    }
    .other {
        width: 114px;
        height: 22px;
        .bg("gray bot@2x");
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        text-shadow:5px 2px 10px #000;
        div {
            width: 20px;
            height: 22px;
            text-align: center;
            display: inline-block;
        }
    }
    .animalCard-level {
        position: absolute;
        top: 128px;
        left: 8px;
        color: #fff;
        font-size:15px;
    }
    .animalCard-eng {
        position: absolute;
        top: 130px;
        right: 8px;
        color: #fff;
        font-size:9px;
    }
    .animalCard-new {
        width: 37px;
        height: 18px;
        .bg("new@2x");
        position: absolute;
        top: 31px;
        left: 2px;
    }
    .animalCard-ok {
        width: 47px;
        height: 48px;
        .bg("follow@2x");
        position: absolute;
        top: 53px;
        left: 50%;
        transform: translateX(-50%);
    }
    
}
</style>