<template>
	<div class="first-wrap">
		<div class="title"></div>
		<span class="yd"></span>
		<button
		  class="get-userinfo"
	      open-type="getUserInfo"
	      lang="zh_CN"
	      @getuserinfo="getUserInfo"
     	  v-if="true"
        ></button>
        <div class="process-loading" v-if="percent!==100"></div>
        <div class="process-wrap"><div :style="{width: percent+'%'}"></div></div>
        <image :src="item" v-for="(item, index) in imgList" v-show="false" @load="preLoadImg" :key="index" />
       <video :src="item" v-for="(item, index) in videoList" v-show="false" @progress="preLoadImg" muted :key="index" />
		 
	</div>
</template>
<script>
	import { loginService } from 'services/login';
	import storage from 'utils/storage';
	import { imgList, videoList } from './config';
	export default{
		data() {
		    return {
		      openId: null,
		      warning: true,
		      gameId: null,
		      code: null,
		      status: 0,
		      prenum: 0,
		      percent: 0,
		      imgList,
		      videoList,
		      userInfo: null //用户信息
		    };
		  },
		methods: {
			getUserInfo() {
				const _this = this;
			      // if (_this.status == 1) {
			      //   return;
			      // }
			      // _this.status = 1;
				 wx.login({
			        success: res1 => {
			          wx.getUserInfo({
			            success: res2 => {
			              this.login(res2.userInfo, res1.code)
			            }
			          });
			        },
			        fail: () => {
			          // _this.status = 0;
			        },
			        complete: () => {
			          wx.hideLoading();
			        }
			      });
			},
			async login(userInfo, code) {
				const resultData = await loginService({
					nickname: userInfo.nickName,
					avatarurl: userInfo.avatarUrl,
					gender: userInfo.gender,
					code
				})
				storage.setStorage('userinfo', {
					openid: resultData.openid,
					...userInfo
				});
				console.log(333);
				wx.redirectTo({
					url: '/pages/collect/main'
				});
			},
			// callBack() {
			// 	console.log(111);
			// },
			preLoadImg(e) {
				console.log(2222);
				const imgLen = imgList.length;
				const videoLen = videoList.length;
				const tLen = imgLen + videoLen;
				if(e.detail) {
					if(e.detail === 100) {
						this.prenum += 1;
		    			this.percent = (this.prenum / tLen) * 100;
					}
				} else {
					this.prenum += 1;
		    		this.percent = (this.prenum / tLen) * 100;
				}
				
		        if(this.prenum === tLen) {
		        	this.percent = 100;
		        	// this.callBack();
		        }
			}
		},
		mounted() {
			// this.preLoadImg(() => {
			// 	console.log(111);
			// });
		},
	}
</script>
<style lang="less">
@import "~less/mixin.less";
// @imgOrigin: "http://parkiland.isxcxbackend1.cn/";
// .bg(@url, @vertical){
//  	background: url("@{cdn}@{url}.png") center @vertical no-repeat;
//     background-size: 100% 100%;
// }
	.first-wrap{
		position: absolute;
		height: 100%;
		width:100%;
		.bg('pl2_iphone X@2x', top);
		.title{

			background: url("@{cdn}资源1.png") center center no-repeat;
			  text-align: center;
			  padding-top: 250px;
			  font-size: 35px;
			  font-weight: bold;
			  position: absolute;
			  top: 0;
			  left: 0;
			  width: 100%;
			  z-index: 101;
		}
		.yd {
			.bg("%E4%BA%91@3x", top);
  			background-size: 100% auto;
		    position: absolute;
		    background-size: 100% auto;
		    width: 100%;
		    height: 50%;
		    left: 0;
		    top: 0;
		    z-index: 1;
		}
		.get-userinfo{
			border:0;
			position: absolute;
			bottom: 100px;
			width: 158px;
			height: 121px;
			left: 50%;
			transform: translateX(-50%);
		    background: none;
		    background-size: contain;
		    .bg("pl2_presststart@2x", top);
		    background-size: cover;
		    &::after{
		    	border:0 !important;
		    }
		}
		.process-loading {
			position: absolute;
			bottom: 250px;
			left: 50%;
			width: 116px;
			transform: translateX(-50%);
			height: 26px;
			.bg("pl2_Loadingresources@2x", top);
		}
		.process-wrap {
			width: 80%;
			position: absolute;
			bottom: 230px;
			left: 50%;
			transform: translateX(-50%);
			height: 16px;
			padding-top: 2px;
			padding-left: 2px;
			// border: 1px solid #fff;
			// border-radius: 8px;
			.bg("pl2-progress-mask@2x", top);
			div {
				height: 11px;
				border-radius: 4px;
				background: orange;
				// width: 20px;
			}
			
		}
		.common-msg {
		  line-height: 48px;
		  z-index: 1000;
		  border: 2px solid #000;
		  position: absolute;
		  width: 200px;
		  text-align: center;
		  background: #ff4b4b;
		  color: #fff;
		  left: 50%;
		  top: 50%;
		  transform: translate(-50%, -50%);
		  border-radius: 6px;
		}
		.process-image {
			display: none;
		}
	}
</style>