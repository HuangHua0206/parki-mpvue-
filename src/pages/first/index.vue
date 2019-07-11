<template>
	<div class="first-wrap">
		<div class="title"></div>
		<span class="yd"></span>
		<button
		  class="get-userinfo"
	      open-type="getUserInfo"
	      lang="zh_CN"
	      @getuserinfo="getUserInfo"
     
        ></button>
        <van-transition :show="warning"  custom-style="position:absolute;z-index:10001;height:100%;top:0;width:100%;animation-delay: 1s;" name="fade" duration="200" >
    <span class="common-msg" v-if="warning" @click="warning=false">！游戏尚未开始</span>
    </van-transition>
		 
	</div>
</template>
<script>
	import { loginService } from 'services/login'
	export default{
		data() {
		    return {
		      openId: null,
		      warning: true,
		      gameId: null,
		      code: null,
		      status: 0,
		      userInfo: null //用户信息
		    };
		  },
		methods: {
			getUserInfo() {
				this.$tip.toast('888')
				const _this = this;
			      // if (_this.status == 1) {
			      //   return;
			      // }
			      // _this.status = 1;
				 wx.login({
			        success: res1 => {
			        	console.log(res1, 'res1')
			          wx.getUserInfo({
			            success: res2 => {
			            	console.log(res2, 'res2')
			              wx.setStorageSync("userinfo", res2.userInfo)
			              console.log(999)
			              this.login(res2.userInfo, res1.code)
			              // http.post("/game/manager/access", {
			              //     nickName: res.userInfo.nickName,
			              //     imgUrl: res.userInfo.avatarUrl,
			              //     wxCode: _this.code
			              //   }).then(
			              //     res => {
			              //       wx.setStorageSync("openId", res.data.openId);
			              //       wx.setStorageSync("gameId", res.data.gameId);
			              //       const listOptions = {};
			              //       res.data.list.forEach(element => {
			              //         listOptions[element.deviceId] = element.color;
			              //       });
			              //       _this.changeState({
			              //         devOptions: listOptions
			              //       });
			              //       const url = "../index/main";
			              //       // switchTab navigateTo
			              //       wx.redirectTo({ url });
			              //       setTimeout(() => {
			              //         _this.status = 0;
			              //       }, 1200);
			              //     },
			              //     res => {
			              //       _this.warning = true;
			              //       setTimeout(() => {
			              //         _this.warning = false;
			              //         _this.status = 0;
			              //       }, 1500);
			              //     }
			              //   );
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
				console.log(userInfo, 'userInfo')
				this.$tip.toast('userInfo')
				const resultData = await loginService({
					nickname: userInfo.nickName,
					avatarurl: userInfo.avatarUrl,
					gender: userInfo.gender,
					code
				})
				this.$tip.toast(JSON.stringify(resultData.data));
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
		.bg('图层2', top);
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
			width: 100%;
		    background: none;
		    background-size: contain;
		    height: 67px;
		    line-height: 62px;
		    opacity: 1;
		    background: url("@{cdn}/start-gif2.gif") center center
		      no-repeat;
		    background-size: cover;
		    &::after{
		    	border:0 !important;
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
	}
</style>