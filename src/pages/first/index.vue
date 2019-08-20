<template>
	<div class="first-wrap">
	<!-- 	<span class="yd"></span> -->
		<div class="dragon" v-if="percent <100"></div>
		<button
		  class="get-userinfo"
	      open-type="getUserInfo"
	      lang="zh_CN"
	      @getuserinfo="getUserInfo"
    		v-if="percent >=100"
        ></button>

        <div class="process-loading" v-else></div>
        <div class="process-wrap"><div  :style="{width: percent+'%'}"></div></div>
         <video :src="item" v-for="(item, index) in videoList" style="opacity:0;position: absolute;bottom:-100%;"  @error="testError"  muted :key="index" autoplay @ended="vedioEnd"/>
        <image :src="item" v-for="(item, index) in imgList" v-show="false" @load="preLoadImg" @error="testError" :key="index" />
      
	 
	</div>
</template>
<script>
	import { loginService } from 'services/login';
	import storage from 'utils/storage';
	import { imgList, videoList, audioList } from './config';
	export default{
		data() {
		    return {
		    	loginBgVoice: null,
		      clickVoice: null,
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
		onShow() {
		  	this.playClickMusic()
		  	this.playBgMusic()
		  	
		},
		onUnload() {
			this.prenum = 0
		  	this.clickVoice.destroy()
		  	this.loginBgVoice.destroy()
		},
		methods: {
			
			playClickMusic() {
				wx.setInnerAudioOption({
					obeyMuteSwitch: false
				})
				this.clickVoice = wx.createInnerAudioContext('click') 
				this.clickVoice.src = 'http://parkiland.isxcxbackend1.cn/pl2_click.mp3'
				this.loginBgVoice = wx.createInnerAudioContext('loginBg') 
				this.loginBgVoice.src = 'http://parkiland.isxcxbackend1.cn/pl2_bg_login.mp3'
			},
			playBgMusic() {
				this.loginBgVoice.play()
				this.loginBgVoice.loop=true
			},
			getUserInfo() {
				this.clickVoice.play()
				 wx.login({
			        success: res1 => {
			          wx.getUserInfo({
			            success: res2 => {
			              this.login(res2.userInfo, res1.code)
			            }
			          });
			        },
			        complete: () => {
			          wx.hideLoading();
			        }
			      });
			},
			async login(userInfo, code) {
				//console.log(userInfo, 'userInfo')
				const resultData = await loginService({
					nickname: userInfo.nickName,
					avatarurl: userInfo.avatarUrl,
					gender: userInfo.gender,
					code
				})
				if (resultData && resultData.openid) {
					storage.setStorage('userinfo', {
						openid: resultData.openid,
						...userInfo
					});
				//	console.log(333);
					wx.redirectTo({
						url: '/pages/collect/main'
					});
				}
				
			},
			preLoadImg(e) {
				this.prenum += 1;
			},
			testError(e) {
				//console.log(888, e)
				this.prenum += 1;
			},
			// preLoadVedio(e) {
			// 	console.log('vedio99999')
			// 	console.log('vedio', e.detail)
			// 	if(e.detail === 100) {
			// 		this.prenum += 1;
			// 	}
			// },
			vedioEnd(e) {
				this.prenum += 1
			//	console.log('end', e)
			}
			
		},
		watch: {
			prenum: {
				handler(newValue, oldValue) {

					const imgLen = imgList.length;
					const videoLen = videoList.length;
					const audioLen = audioList.length;
					const tLen = imgLen;
				//	console.log(newValue, 'newValue',imgLen, videoLen)
					this.percent = (newValue / tLen) * 100;
					if(newValue >= tLen) {
			        	this.percent = 100;
			        }
				}
			}
		}
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
		.dragon{
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom:270px;
			width:150rpx;
			height:87rpx;
			 background: url("@{cdn}pl2-loading.gif") center center no-repeat;
    		background-size: 100% 100%;
		}
		.process-wrap {
			width: 80%;
			position: absolute;
			bottom: 230px;
			overflow:hidden;
			left: 50%;
			padding:3px 2px 5px;
			box-sizing: border-box;
			transform: translateX(-50%);
			height: 16px;
			padding-top: 2px;
			padding-left: 2px;
			// border: 1px solid #fff;
			border-radius: 8px;
			.bg("pl2-progress-mask@2x", top);
			div {
				height: 100%;
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