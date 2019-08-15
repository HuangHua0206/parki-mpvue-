<template>
  <div class="beat-boss-wrap">
  	<div class="mask" style="z-index:80" @click="which=''" v-if="!!which"></div> 
  	<CommonTop 
  		ctxt="点击屏幕攻击怪兽，一起保护PRAKINLAND"
  		@openRange="getRangeList"
  		>
  	</CommonTop>
<!--     <div class="main"> -->
     
      <div class="boss" @click="attackBoss">
      	 <div class="ellipse"></div>
      </div>
      <div class="collect-btn" @click="goCollect"></div>
      <div class="blood">
        <div class="blood-avatar"></div>
        <div class="blood-num" :style="{width: bloodWith + '%'}"></div>
        <div class="count-down">
        	倒计时 {{formTime}}
        </div>
      </div>
<!--     </div> -->
    <div class="info">
    	<div class="left-info">
    		<div class="attack">
    			攻击力 ATTACK: {{ animal.power || 5 }}
    			<span v-if="online" class="plus">+5</span>
    		</div >
    		<div class="damage">总伤害 DAMAGE: {{totalKill}}</div>
    	</div>
    	
    	<div class="right-card" v-if="animal.petname">
    		<image class="img" :src="'http://parkiland.isxcxbackend1.cn/pl2_'+animal.petname+'.png'" />
    		<div class="level">{{animal.level}}级</div>
    		<div class="energy">战斗力：{{animal.power}}</div>
    	</div>
    </div>
    <div class="pop-up-bottom" :class="{fadeUp: which === 'range'}">
		<Range   @closePop="close" :rangeList="rangeList"  />
	</div>
	<div class="pop-up-fadein" :class="{fadeUp: which === 'success' || which === 'fail'}">
		<BossResult  
			:result="which"
		/>
	</div>
  </div>
</template>
<script>
import CommonTop from 'components/top'
import { rangeService, animalListService, bandStatusService } from 'services/collect'
import { totalBloodService } from 'services/boss'
import Range from 'pages/collect/range'
import storage from 'utils/storage'
import Result from './result'

export default {
	data() {
		return {
			totalblood: -1,
			leftblood: 20000,
			lefttime: 180,
			totalKill: 0,
			online:false,
			animal: {},
			rangeList: [],
			which: ''
		}
	},
	computed: {
		bloodWith() {
			return (this.leftblood / this.totalblood) * 100
		},
		openid() {
			const userinfo = storage.getStorage('userinfo') || {}
			return userinfo.openid
		},
		formTime() {
			let m = parseInt((this.lefttime / 60)).toString()
			if (m.length < 2) {
				m = '0' + m
			}
			let s = (this.lefttime % 60).toString()
			if (s.length < 2) {
				s = '0' + s
			}
			return m + ' : ' +s
		}
	},
	components: { CommonTop, Range, BossResult: Result },
	methods: {
		async getTotalBlood() {
			const resultData = await totalBloodService()
			if (resultData && resultData.errmsg) return
			this.totalblood = resultData.blood
		},
		playClickMusic() {
			wx.playBackgroundAudio({
			  dataUrl: 'http://parkiland.isxcxbackend1.cn/pl2_click.mp3'
			})
			wx.getBackgroundAudioManager().onEnded(() => this.playBgMusic())
		},
		playBgMusic() {
			const playFunc = ()=> {
		  		wx.playBackgroundAudio({
				  dataUrl: 'http://parkiland.isxcxbackend1.cn/pl2_bg_boss.mp3'
				})
		  	}
		  	playFunc()
			wx.getBackgroundAudioManager().onEnded(() => playFunc())
		},
		close() {
			this.which = ''
		},
		randNum(num) {
			return Math.floor((Math.random() * (1.3 - 0.7) + 0.7) * num)
		},
		goCollect() {
	    	wx.redirectTo({ url: '/pages/collect/main' });
		},
		async getRangeList() {
			const resultData = await rangeService()
			if (resultData && resultData.rank) {
				this.rangeList = resultData.rank
				this.which = 'range'
			}

		},
		attackBoss() {

			let totalAttack = 5
			if (this.animal.power) totalAttack = this.animal.power
			if (this.online) totalAttack += 5

			const sendData = {
				monstertype: 'monster',
				attackpower: this.randNum(totalAttack)
			}


			// this.leftblood -= sendData.attackpower * 20
			// if (this.lefttime <=0 && this.leftblood > 0) {
			// 		this.which = 'fail'
			// 	}
			// 	if (this.leftblood <=0 && this.lefttime > 0) {
			// 		this.which = 'success'
			// 		this.$store.dispatch('getIntergral')
			// 	}
			// 	return



			console.log(sendData, 'sendData')
			this.socketTask.send({
				data: JSON.stringify(sendData),
				fail: err => {
					console.log(err, 'err')
				},
				success: res => {
					console.log(res, 'res')
				},
				complete: result => {
					console.log(result, 'result')
				},
			})
		},
		async getAnimal() {
			const resultData = await animalListService({ openid: this.openid })
			if (resultData && resultData.errmsg) return
			this.animal = resultData.data.filter(item=>item.selected === 1)[0] || {}
		console.log(this.animal)
		},
		async bandStatus() {
			const resultData = await bandStatusService({ openid: this.openid })
 			if (resultData && resultData.errmsg) return
			this.online = resultData.data.bindstatus === 1
 
		},
		 listenSocket() {
	      this.socketTask = getApp().globalData.socketTask;
	      if (!this.socketTask || this.socketTask.readyState !=1){
	        console.info("重新連接")
	        this.socketTask = wx.connectSocket({
	         url: 'wss://www.j4ckma.cn/parki/ws?openid='+this.openid
	        })
	        getApp().globalData.socketTask = this.socketTask;
	      }
	      console.log('this.socketTask', this.socketTask)
	      this.socketTask.onMessage(res => {
	        console.log('oooo', res);
	        const _data = JSON.parse(res.data)
	        this.SOCKET_INFO = _data
	        this.socketDeal(_data)
	      })
	        //连接失败
	        this.socketTask.onError(function() {
	          console.log("websocket连接失败！");
	        });
	    },
		socketDeal(socket) {
			if (socket.eventname === 'noticeattaktotal') {
				this.totalKill = socket.total
			}
			if (socket.eventname === 'noticemonstercountdown') {
				this.lefttime = socket.lefttime
				this.leftblood = socket.leftblood
				if (this.lefttime <=0 && this.leftblood > 0) {
					this.which = 'fail'
				}
				if (this.leftblood <=0 && this.lefttime > 0) {
					this.which = 'success'
					this.$store.dispatch('getIntergral')
				}
			}
		},
		listenColseSocket() {
			this.socketTask.close()
			wx.onSocketClose(function(res){
			  console.log("WebSocket 已关闭！")
			})
	    },
	},
	onHide() {
 		wx.stopBackgroundAudio()
		this.listenColseSocket()
		this.playBgMusic()
	},

	onShow() {
		this.getTotalBlood()
		this.listenSocket()
		this.$store.dispatch('getIntergral')
		this.getAnimal()
		this.bandStatus()
		//this.getData('created')
		// this.fadeIn = true
		//this.listenSocket() // 连接socket
	},
	onUnload() {
		this.which = ''
	},
}
</script>

<style  lang="less">
@import "~less/mixin.less";
// @imgOrigin: @cdn;
// .bg(@url){
//  	background: url("@{imgOrigin}@{url}.png") center center no-repeat ;
//     background-size: 100% 100%;
// }
  .beat-boss-wrap{
  	box-sizing: border-box;
    height: 100%;
    position: absolute;
    width:100%;
    .bg('pl2_boss-background@2x');
    padding:15px 20px 0 0;   
	// .main{
	// 	top:127px;
	// 	position: absolute;
	// 	height: 321px;
		
		.boss{
			.bg('pl2_boss');
			width:533rpx;
			height:448rpx;
			position:absolute;
			bottom:30vh;
			left:50%;
			transform:translateX(-50%);
			.ellipse{
				position: absolute;
				width:255px;
				height: 20px;
				bottom:-10px;
				left:50%;

				// background:rgba(135,210,125,0.6);
				// border-radius:50%;
				// left:70px;
				transform:translateX(-50%);

				// top:70vh;
				.bg('pl2_shadow@2x');
			}
		}
		.collect-btn{
			position: absolute;
			top:127px;
			left:0;
			width:67px;
			height: 62px;
			.bg('pl2_collection@2x');
		}
		.blood{
			position: absolute;
			top:20vh;
			left:125px;
			width:132px;
			// transform: translateX(-50%);
			.blood-avatar{
				position: absolute;
				top:0;
				left:0;
				width:20px;
				height: 20px;
				.bg('pl2_head@2x');
				z-index:1
			}
			.blood-num{
				border-right: 2px solid #000;
				border-radius: 8px;
				position: absolute;
				top:4px;
				left:16px;
				height: 12px;
				// width:150px;
				.bg('pl2_blood@2x');
				background-size: cover;
			}
			.count-down{
				position: absolute;
				font-size:9px;
				left:50px;
				width:90px;
				top:23px;
				background: url("@{cdn}pl2_time@2x.png") no-repeat 0 center;
				background-size:10px 12px; 
				height: 13px;
				line-height:18px;
				font-size:9px;
				padding-left:16px;
			}
		}
	// }
	.info{
		box-sizing: border-box;
		position: absolute;
		bottom: 23px;
		left:50px;
		width:276px;
		height: 113px;
		.bg('pl2_excel@2x');
		padding:0 12px 10px 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left-info{
			.attack{
				box-sizing:border-box;
				background: url("@{cdn}pl2_attack@2x.png") no-repeat 0 center;
				background-size: 17px 16px;
				padding-left: 26px;
				font-size:10px;
				// font-weight: bold;
				height: 20px;
				line-height:20px;
				.plus{
					display: inline-block;
					margin-top: 2px;
					margin-left: 8px;
					height: 15px;
					background: url("@{cdn}pl2_kid@2x.png") no-repeat 0 center;
					background-size: 15px 15px;
					color:rgb(255, 186, 0);
					padding-left: 18px;
					line-height: 18px;
				}

			}
			.damage{
				box-sizing:border-box;
				background: url("@{cdn}pl2_damage@2x.png") no-repeat 0 center;
				background-size: 14px 20px;
				padding-left: 26px;
				margin-top: 15px;
				font-size:10px;
				// font-weight: bold;
				height: 20px;
				line-height:20px;
			}
		}
		.right-card{
 
			width:63px;
			height: 85px;
 
			border-radius: 6px;
			padding:1px;
			position: relative;
			.img{
				width:100%;
				height:100%;

			}
			.level{
				position:absolute;
				left:10rpx;
				bottom:13rpx;
				color:#fff;
				font-size:8px;
			}
			.energy{
				position:absolute;
				right:10rpx;
				bottom:15rpx;
				color:#fff;
				font-size:5px;
			}
		}
	}
	.pop-up-bottom{
		transition: 0.5s;
		position: absolute;
		bottom:-100%;
		left:0;
		height: 100%;
		width:100%;
		&.fadeUp{
			bottom:0;
		}
	}
	.pop-up-fadein{
		display:none;
		position: absolute;
		top:0;
		left:0;
		height: 100%;
		width:100%;
		&.fadeUp{
			display:block;
		}
	}
}
</style>