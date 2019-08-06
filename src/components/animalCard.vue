<template>
	<div :class="className" class="animalCard-wrap" >
		<image :src="url" class="animalCard-img" @click="$emit('selectAnimal')"/>
        <div :class="progress" v-if="progress === 'other'">
            <div class="progress" :style="{width: progressWidth}"></div>
            <div class="content">{{text}}</div>
        </div>
        <div :class="progress" v-if="progress === 'max' || progress === 'update'" @click="upgrade(progress)">{{text}}</div>
        <div class="animalCard-level">{{level}}</div>
        <div class="animalCard-eng">{{eng}}</div>
        <div class="animalCard-new" v-if="isnew"></div>
        <div class="animalCard-ok" v-if="isok"></div>
        <div class="select-wrap" v-if="selected">
            <div class="select"></div>
        </div>
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
            progressWidth: {
                type: String,
            },
            selected: {
                type: Number
            }
		},
        methods: {
            upgrade(type) {
                if (type==='update') {
                    this.$emit('upgrade')
                }
            }
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
    // display: inline-block;
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
        background: #df7d26;
        border: 2px solid #000;
        box-sizing: border-box;
        border-radius: 6px;
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 10px;
 
         text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
    }
    .update {
        width: 114px;
        height: 22px;
        background: #81eb26;
        border: 2px solid #000;
        box-sizing: border-box;
        border-radius: 6px;
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        
        text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
    }
    .other {
        width: 114px !important;
        height: 22px;
        // .bg("gray bot@2x");
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        overflow: hidden;
        text-shadow:5px 2px 10px #000;
        background: #b5b5b5;
        border: 2px solid #000;
        box-sizing: border-box;
        border-radius: 6px;
        position: relative;
        .progress{
            background: #fff000;
            height: 100%;
            width: 70px;
            box-sizing: border-box;
            border-radius: 6px;
            border-right: 2px solid #000;
        }
        .content {
            position: absolute;
            left:0;
            top:0;
            width:100%;
            // width: 20px;
            height: 22px;
            text-align: center;
            display: inline-block;
            font-size: 10px;
            text-shadow:#000 2px 0 0,#000 0 2px 0,#000 -2px 0 0,#000 0 -2px 0;
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
        text-align:center;
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
    .select-wrap{
         position: absolute;
         left:0;
         top:0;
        height:155px;
        width:115px;
        border-radius:8px;
        background: rgba(0, 0, 0, 0.5);
        .select{
            position: absolute;
            left:50%;
            top:50%;
            width:93rpx;
            height:93rpx;
            .bg('pl2_select@2x');
            transform: translate(-50%, -50%);
        }
    }
    
}
</style>