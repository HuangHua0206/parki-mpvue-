<template>
	<div class="common-top">
		<div class="top">
	      <div class="avatar">
	        <img :src="userAvatar" />
	      </div>
	      <div class="nums">
	        <div class="left-num">
	        	{{ leftNum }}
	        </div>
	        <div v-if="share" class="right-num share" ></div>
	        <div v-else class="right-num" @click="$emit('openRange')">
	        	{{ rightNum }}
	        </div>
	      </div>
	    </div>
	    <div class="attention">
	       {{ctxt}}
	    </div>
	</div>
</template>
<script>
	import storage from 'utils/storage'
	export default{
		computed: {
			userAvatar() {
				return storage.getStorage('userinfo') ? storage.getStorage('userinfo').avatarUrl : ''
			}
		},
		props: {
			ctxt: {
				type: String,
				rquired: true
			},
			leftNum: {
				type: Number,
				rquired: true
			},
			rightNum: {
				type: Number
			},
			share: {
				type: Boolean
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
.common-top{
	position:absolute;
	z-index:5;
	width:100%;
	top:0;
	left:0;
	.top{
		position:absolute;
		top:16px;
		width:100%;
		display: flex;
	    .avatar{
	    	margin-left: 15px;
	    	margin-right: 17px;
	    	height: 49px;
	    	width: 49px;
	    	img{
	          height: 100%;
	          width: 100%;
	          border-radius: 50%;
	          border: 3px solid #000;
	        }
	    }
        .nums{
			flex:1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:10px;

			.left-num{
				box-sizing: border-box;
				padding-right: 4px;
				margin-left: 5px;
				.bg('pl2_energy@2x');
				width:67px;
				height: 23px;
				text-align:right;
				color:rgb(255, 173, 1);
				line-height: 20px;
				padding-bottom:5px; 

			}
			.right-num{
				line-height: 20px;
				box-sizing: border-box;
				padding-right: 4px;
				margin-right: 42px;
				.bg('pl2_Ranking@2x');
				width:72px;
				height: 22px;
				text-align:right;
				color:#fff;
				padding-bottom:5px;
				&.share{
					transform:translateY(-9rpx);
					color:rgb(255, 173, 1);
					.bg("pl2_share@2x");
					width:81px;
					height: 31px;
				}
			}		
        }
    }
    .attention{
    	position:absolute;
    	top:77px;
    	box-sizing: border-box;
		width:295px;
		height: 21px;
		background: ;
		border-radius: 6px;
		background: url("@{imgOrigin}pl2_tips@2x.png") no-repeat 35px 3px rgba(0, 0, 0, 0.1);
		background-size:12px 15px;
		color:#fff;
		font-size:7px;
		line-height:21px;
		text-align:center;

		padding-left: 35px;
		left:50%;
		transform:translateX(-50%);
	}
}
</style>