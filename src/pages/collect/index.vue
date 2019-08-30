<template>
	<div class="collect-wrap">
		<div class="mask" style="z-index:80" @click="closeMask" v-if="!!which && which !== 'success' && which !== 'animal'"></div> 
		<div class="collect-bg"></div>
		<div class="cloud"></div>
		<div class="stars"  :class="{animation: false}">
			<img style="width:100%;height:100%" :src="starImg" />
		</div>
		<div class="toast"  :class="{show: toast==='repeat'}"></div>
		<div class="toast green"  :class="{show: toast==='forbid-green'}"></div>
		<Success 
			@resetData="resetData" 
			v-if="together" 
			:integral="finish.integral" 
			:pet="finish.pet"
			@clickVoicePlay="clickVoicePlay"
			></Success>
		<CommonTop 
	  		:ctxt="tips[tip]"
	  		:rightNum="9999"
	  		@openRange="getRangeList"
	  		>
	  	</CommonTop>
		<div class="button task-button" :class="{'fade-left-in': fadeIn}" @click="openTask"></div>
		<div class="button email-button" :class="{'fade-left-in': fadeIn}" @click="openEmial"></div>
		<div class="button animal-button" :class="{'fade-right-in': fadeIn}" @click="openAnimal"></div>
		<div class="button online-button"  :class="{
			'fade-right-in': fadeIn,
			'z-index-top': online
		}"  > 
			<div class="progress-mask" >
				<div class="progress hasBracelet"   >
					<div class="sunny hasBracelet"    ></div>
				</div>
			</div>
			
			
		</div>
		<div class="bracelet-plus reward" v-if="fadeIn && online"  >+2</div>
		<div class="button offline-button" :class="{
			'fade-right-in': fadeIn,
			'z-index-top': !online
		}" @click="openBracelet">
			<div class="progress-mask" >
	<!-- 			<div class="progress hasBracelet"   >
					<div class="sunny hasBracelet"    ></div>
				</div> -->
			</div>
		</div>
		<div class="line" :class="{finish: together}">
			<div class="mask"> 
				<div 
					class="progress" 
					:class="{
						'green-action': video.energyType === 'green', 
						'blue-action': video.energyType === 'blue',
						'orange-action': video.energyType === 'orange',
						'yellow-action': video.energyType === 'yellow',
						'super-action': video.energyType === 'super',
						'green-finish': video.energyType === 'green-finish', 
						'blue-finish': video.energyType === 'blue-finish',
						'orange-finish': video.energyType === 'orange-finish',
						'yellow-finish': video.energyType === 'yellow-finish',
						'super-finish': video.energyType === 'super-finish',
					}"> 
					
				</div>
				<div class="sunny"  ></div>
			</div>
			
		</div>
		<div class="nums-wrap">
			<div class="one-three">
				<div class="num one"></div>
				<div class="num two"></div>
				<div  class="num three"></div>
			</div>
			<div class="plus has-bg"  @click="showEnergyBag"></div>
		</div>
		<div class="nums-wrap" style="z-index: 45;">
			<div class="one-three">
				<div class="num  ">
					<div v-if="!video.energyShow1 && !reset">
						<img  @click="deleteEnergy(0)" class="bag-energy address1" :class="{
							'show': bags.bagShow1,
							'initshow': bags.initshow1,
							'together': together
						}" :src="'http://parkiland.isxcxbackend1.cn/pl2_ball_'+(collects[0] || '1')+'.png'"/>
					</div>
					
				</div>
				<div class="num ">
					<div v-if="!video.energyShow2 && !reset">
						<img  @click="deleteEnergy(1)" class="bag-energy address2" :class="{
							'show': bags.bagShow2,
							'initshow': bags.initshow2,
							'together': together
						}" :src="'http://parkiland.isxcxbackend1.cn/pl2_ball_'+(collects[1] || '1')+'.png'"/>

					</div>
				</div>
				<div  class="num  ">
			 		<div v-if="!video.energyShow3 && !reset">
						<img  @click="deleteEnergy(2)" class="bag-energy address3" :class="{
							'show': bags.bagShow3,
							'initshow': bags.initshow3,
							'together': together
						}" :src="'http://parkiland.isxcxbackend1.cn/pl2_ball_'+(collects[2] || '1')+'.png'"/>
					</div>
				</div>
			</div>
			<div class="plus"  @click="showEnergyBag"></div>
		</div>
		<div class="world" >
			<div class="boss" v-if="worldEvent === 'boss'" @click="goBoss"></div>
			<div class="amazing" v-if="worldEvent === 'super'" @click="showSuper"></div>
			<div class="earth" v-if="worldEvent === 'earth'" @click="showEarth"></div>
		</div>
		<!-- 能量背包-->
		<div   class="energy-wrap" :class="{fadeUp: energyIn}">
			<div class="boll " @click="getBagEnergy('2', bags['2'])">
				<div class="round yellow"></div>
				<div class="num">{{bags['2']}}</div>
				<div class="little-round"></div>
			</div>
			<div class="boll " @click="getBagEnergy('3', bags['3'])">
				<div class="round blue"></div>
				<div class="num">{{bags['3']}}</div>
				<div class="little-round"></div>
			</div>
			<div class="boll " @click="getBagEnergy('4', bags['4'])">
				<div class="round green"></div>
				<div class="num">{{bags['4']}}</div>
				<div class="little-round"></div>
			</div>
			<div class="boll " @click="getBagEnergy('1', bags['1'])">
				<div class="round orange"></div>
				<div class="num">{{bags['1']}}</div>
				<div class="little-round"></div>
			</div>
		</div>
		<div   class="my-home" @click="goBulid" :class="{fadeUp: energyIn}"></div>
		<!-- 弹窗部分 -->
		<div class="pop-up-left" :class="{fadeUp: which === 'email'}"> 
			<Email   @closePop="close"  @readEamil="readEamil" :emailList="emailList"/>
		</div>
		<div class="pop-up-left" :class="{fadeUp: which === 'task'}">
			<Task    @closePop="close"  :taskList="taskList" @earnRewards="earnRewards"/>
		</div>
		<div class="pop-up-bottom" :class="{fadeUp: which === 'range'}">
			<Range   @closePop="close" :rangeList="rangeList"  />
		</div>
		<div class="pop-up-right" :class="{fadeUp: which === 'bracelet'}">
			<Bracelet   @closePop="close"  @reward="reward" @clickVoicePlay="clickVoicePlay"/>
		</div>
		<div class="pop-up-right" :class="{fadeUp: which === 'animal'}">
			<Animal   @closePop="close"   :animalList="animalList" @selectAnimal="selectAnimal" @upgrade="upgrade"/>
		</div>
		<div class="pop-up-fadein" :class="{fadeUp: which === 'super'}">
			<Amazing   @closePop="close" :player="player"   />
		</div>
		<div class="pop-up-fadein" :class="{fadeUp: which === 'my-super'}">
			<SuperMe   :total="integral" :remain="remaining"/>
		</div>
		<div class="pop-up-fadein" :class="{fadeUp: which === 'earth'}">
			<Earth   @closePop="close"    />
		</div>
		<div 
			class="collect-sunny"
	 		v-if="video.play"
		>
			<video  
				:src="videoSrc"
				autoplay
				:show-fullscreen-btn="false"
				:vslide-gesture-in-fullscreen="false"
				:enable-progress-gesture="false"
				:controls="false"
				:show-center-play-btn="false"
				object-fit="fill"
			/>
			
		</div>
		
		<!-- 蓝牙获取能量（包含动画效果） -->
		<div class="energy energy-1" :class="{
			'blue': collects[0] === '3' ,
			'yellow': collects[0] === '2',
			'green': collects[0] === '4',
			'orange': collects[0] === '1',
			'initshow1': video.initshow1,
			'show': video.energyShow1,
			'down1': video.energyDown1,
			'together': together
		}"></div>
		<div class="energy energy-2" :class="{
			'blue': collects[1] === '3' ,
			'yellow': collects[1] === '2',
			'green': collects[1] === '4',
			'orange': collects[1] === '1',
			'initshow2': video.initshow2,
			'show': video.energyShow2,
			'down2': video.energyDown2,
			'together': together
		}"></div>
		<div class="energy energy-3" :class="{
			'blue': collects[2] === '3' ,
			'yellow': collects[2] === '2',
			'green': collects[2] === '4',
			'orange': collects[2] === '1',
			'initshow3': video.initshow3,
			'show': video.energyShow3,
			'down3': video.energyDown3,
			'together': together
		}"></div>
		<div class="energy energy-4 super" v-if="video.energyType === 'super' || video.energyType === 'super-finish'" :class="{
			'show': video.energyShow4,
		}">
			<img src="http://parkiland.isxcxbackend1.cn/pl2_ball_super.png" :class="{
				'little': video.superlittle,
				'finish': video.superfinish
			}"/>
			<div class="super-num" v-if="video.superfinish" ></div>
		</div>
	<!-- 	<audio id="collect-bg"loop></audio> -->
<!-- 	<audio  id="click" src="http://parkiland.isxcxbackend1.cn/pl2_click.mp3"  ></audio> -->
<!-- 	<audio  id="collectBg" src="http://parkiland.isxcxbackend1.cn/pl2_bg_collect.mp3"   loop></audio> -->

	</div>
	
</template>
<script>
	import CommonTop from 'components/top'
	import Email from './email'
	import Task from './task'
	import Range from './range'
	import Bracelet from './bracelet'
	import Animal from './animal'
	import Amazing from './amazing'
	import Earth from './earth'
	import Success from './success'
	import storage from 'utils/storage'
	import SuperMe from './superMe'
	import { 
		collectService, 
		getCollectService, 
		animalListService, 
		bagsListService, 
		superCollectService, 
		bandStatusService, 
		changeAnimalService,
		reward2Service,
		rangeService,
		taskService,
		earnRewardService,
		upgradeAnimalService,
		emailListService,
		emailRewardService
	} from 'services/collect'
	import ENERGY_CONFIG from './energy.js'
	import tips from './tip'
	export default{
		data () {
		  return {
		  	starid: 0,
		  	starTimer: null,
		  	tips,
			tip: 0,
			tipTimer: null,
		  	collectBg: null,
		  	getAnimalVoice: null,
		  	clickVoice: null,
		  	plusMoneyVoice: null,
		  	emailList: [],
		  	animalList: [],
		  	rangeList: [],
		  	taskList: [],
		  	timer: null,
		  	bandid: '',
		  	FIRST_EARTH: true,
		  	SOCKET_INFO: {
		  		status: -1,
		  		eventname: '',
		  		openid: ''
		  	},
		  	player: '',
		  	remaining:0,
		  	integral: 0,
		  	worldEvent: '',
		  	reset:false,
		  	toast: '',
		  	together: false,
		  	index: 0, // 第index个位置发生能量变化
		  	fadeIn: false, // 界面加载完时四个弹窗按钮动画效果进入
		  	video: { // 收集能量时视频相关参数
		  		play: false, // 检测到能量时播放视频
		  		address: 0, // 能量当前放置位置
		  		initshow1: false,
		  		initshow2: false,
		  		initshow3: false,
		  		energyType: '', // 能量类型（4种，blue，orange，yellow，green）
		  		energyShow1: false, // 视频将播放完时显示生成的能力球
		  		energyDown1: false,
		  		energyShow2: false, // 视频将播放完时显示生成的能力球
		  		energyDown2: false,
		  		energyShow3: false, // 视频将播放完时显示生成的能力球
		  		energyDown3: false,
		  		energyShow4:false,
		  		superlittle: false,
		  		superfinish: false
		  	},
		  	bags: {
		  		initshow1: false,
		  		initshow2: false,
		  		initshow3: false,
		  		'2': 0,
		  		'3':0,
		  		'4':0,
		  		'1':0,
		  		bagShow1: false,
		  		bagShow2: false,
		  		bagShow3: false
		  	},
		  	finish: {
		  		integral: 0,
		  		pet:null
		  	},
		  	collects: ['', '', ''], // 当前收集能量集  	
		  	online: false, // 是否绑定手环
		  	blueStatus: false, // 蓝牙是否开启
		  	which: '', // 界面显示某一个弹窗
		  	energyIn: false, // 能量背包是否显示
		  	hasBracelet: true, //是否绑定手环
		  	ISSAME: false, // 发现重复颜色能量
		  	IS_SENDING: false, // 正在发送能量
		  	GREEN_ISSAME: false, // 发现绿色能量
		  }
		},
		computed: {
			videoSrc() {
				return `http://parkiland.isxcxbackend1.cn/${this.video.energyType}.mp4`
			},
			openid() {
				const userinfo = storage.getStorage('userinfo') || {}
				return userinfo.openid
			},
			starImg() {
				// console.log(this.starid);
				if(this.starid < 10) {
					return 'http://parkiland.isxcxbackend1.cn/star0'+ this.starid +'.png'
				} else {
					return 'http://parkiland.isxcxbackend1.cn/star'+ this.starid +'.png'
				}
			}
		},
		methods: {
			tipNum() {
				if (this.tip >= tips.length -1 ) {
					this.tip = 0
				} else {
					this.tip +=1
				}
			},
			starNum() {
				if (this.starid >= 48 ) {
					this.starid = 0
				} else {
					this.starid +=1
				}
			},
			closeMask() {
				this.clickVoicePlay()
				this.which=''
			},
			async readEamil(item) {
				this.clickVoicePlay()
				const resultData = await emailRewardService({
					openid:this.openid,
					id: item.id,
					integral: item.integral
				})
				if (resultData && resultData.errmsg) return
				this.plusMoneyVoicePlay()
				this.$tip.toast('领取成功')
				this.$store.dispatch('getIntergral')
				this.getEmailList()
			},
			playClickMusic() {
				wx.setInnerAudioOption({
					obeyMuteSwitch: false
				})
				this.clickVoice = wx.createInnerAudioContext('click') 
			    this.clickVoice.src = 'http://parkiland.isxcxbackend1.cn/pl2_click.mp3'
				this.plusMoneyVoice = wx.createInnerAudioContext('plusMoney')
				this.plusMoneyVoice.src='http://parkiland.isxcxbackend1.cn/pl2_integral_add.mp3'
				this.getAnimalVoice = wx.createInnerAudioContext('getAnimal')
				this.getAnimalVoice.src='http://parkiland.isxcxbackend1.cn/pl2_hunting_success_getanimal.mp3'
				this.collectBg = wx.createInnerAudioContext('collectBg') 
				
			},
			clickVoicePlay() {
				this.clickVoice.play()
			},
			plusMoneyVoicePlay() {
				this.plusMoneyVoice.play()
			},
			getAnimalVoicePlay() {
				this.getAnimalVoice.play()
			},
			playBgMusic() {
				this.collectBg.src = 'http://parkiland.isxcxbackend1.cn/pl2_bg_collect.mp3'
				this.collectBg.play()
				this.collectBg.loop = true
			},
 
			playEarthBgMusic() {
				this.collectBg.src = 'http://parkiland.isxcxbackend1.cn/pl2_bg_earth.mp3'
				this.collectBg.loop = true
				this.collectBg.play()
			},
			playSuperBgMusic() {
				this.collectBg.src = 'http://parkiland.isxcxbackend1.cn/pl2_bg_super.mp3'
				this.collectBg.play()
				this.collectBg.loop = true
				// const playFunc = ()=> {
			 //  		wx.playBackgroundAudio({
			 //  		  title: '超级能量背景乐',
				// 	  dataUrl: 'http://parkiland.isxcxbackend1.cn/pl2_bg_super.mp3'
				// 	})
			 //  	}
			 //  	playFunc()
				// wx.getBackgroundAudioManager().onEnded(() => playFunc())
			},
			async earnRewards(taskid) {
				this.clickVoicePlay()
				const resultData = await earnRewardService({
					taskid,
					openid: this.openid
				})
				if (resultData && resultData.errmsg) return
					this.plusMoneyVoicePlay()
				this.$tip.toast('领取成功，奖励200积分')
				this.getTaskList()
				this.$store.dispatch('getIntergral')
			},
			showEnergyBag() {
				this.clickVoicePlay()
				this.energyIn = !this.energyIn 
			},
			openTask() {
				this.clickVoicePlay()
				this.getTaskList()
			},
			openAnimal() {
				this.clickVoicePlay()
				this.getAnimaList()
			},
			openEmial() {
				this.clickVoicePlay()
				this.getEmailList()
			},
			formTime(time, cFormat) {
					console.log(time);
				if (arguments.length === 0) {
				    return null
				  }

				  if ((time + '').length === 10) {
				    time = +time * 1000
				  }

				  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
				  let date
				  if (typeof time === 'object') {
				    date = time
				  } else {
				    date = new Date(parseInt(time))
				  }
				  const formatObj = {
				    y: date.getFullYear(),
				    m: date.getMonth() + 1,
				    d: date.getDate(),
				    h: date.getHours(),
				    i: date.getMinutes(),
				    s: date.getSeconds(),
				    a: date.getDay()
				  }
				  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
				    let value = formatObj[key]
				    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
				    if (result.length > 0 && value < 10) {
				      value = '0' + value
				    }
				    return value || 0
				  })
				  console.log(time_str);
				  return time_str
			},
			async getEmailList() {
				const resultData = await emailListService({ openid: this.openid })
				if(resultData && resultData.errmsg) {
					this.$tip.toast(resultData.errmsg)
					return 
				}
				this.emailList = !!resultData.emails ? resultData.emails.map(item => {
					return {
						...item,
						ctime: this.formTime(item.ctime, '{y}-{m}-{d}')
					}
				}) : []
			    this.which = 'email'
			},
			openBracelet() {
				this.clickVoicePlay()
				this.which = 'bracelet'
			},
			async getTaskList() {
				const resultData = await taskService({openid: this.openid})
				if (resultData && resultData.tasks) {
					this.taskList = resultData.tasks
					this.which = 'task'
				}
			},
			async reward() {
				this.rewardRequest()
				// setTimeout(() => {
				// 	this.$store.commit('changeIntegral', this.$store.state.integral + 2)
				// }, 4000)
				this.timer = setInterval(
					 () => {
					 	this.rewardRequest()
					 	this.$store.commit('changeIntegral', this.$store.state.integral + 2)
					 	this.plusMoneyVoicePlay()
					 }
					, 5000)
			},
			async getRangeList() {
				console.log(888)
				this.clickVoicePlay()
				const resultData = await rangeService({ test: 'test'})
				if (resultData && resultData.rank) {
					this.rangeList = resultData.rank
					this.which = 'range'
				}

			}, 
			async upgrade(item) {
				this.clickVoicePlay()
				const resultData = await upgradeAnimalService({
					petid: item.petid,
					openid: this.openid
				})
				if (resultData && resultData.errmsg) return
				this.getAnimaList()
			},

			rewardRequest() {
				reward2Service({openid: this.openid})
			},
			async selectAnimal(petid){
				this.clickVoicePlay()
				const resultData = await changeAnimalService({
					petid,
					openid: this.openid,
					Prdname: '44'
				})
				this.getAnimaList()
			},
			 listenSocket() {
		      this.socketTask = getApp().globalData.socketTask;
		      if (!this.socketTask || this.socketTask.readyState !=1){
		      //  console.info("重新連接")
		        this.socketTask = wx.connectSocket({
		        	//url: 'wss://www.isxcxbackend1.cn/websocket'
		         url: 'wss://www.j4ckma.cn/parki/ws?openid='+this.openid
		        })
		        getApp().globalData.socketTask = this.socketTask;
		      }
		     // console.log('this.socketTask', this.socketTask)
		      this.socketTask.onMessage(res => {
		     //   console.log('oooo', res);
		        const _data = JSON.parse(res.data)
		        this.SOCKET_INFO = _data
		        this.socketDeal(_data)
		      })
		        //连接失败
		        this.socketTask.onError(function() {
		        //  console.log("websocket连接失败！");
		          // _this_this.gsStatus = 1;
		          // _this.isSlow = false;
		        });
		    },
		    socketDeal(now) {
		 
		    	    if (now.eventname === 'prohibitedcollectgreen') {
		           	 	this.worldEvent = 'earth'
		           	 	if (this.FIRST_EARTH) { // 第一次接收到服务端推送时自动弹出地震告知弹窗，以后需要用户自行点击按钮
		           	 		this.which = 'earth'
		           	 	}
		           	 	this.FIRST_EARTH = false
		           	 }
		           	 if (now.eventname === 'startsuperenergy') {
		           	 		this.FIRST_EARTH = true
		           	 		this.worldEvent = 'super'
		           	 	// 触发了神奇能量（当自己被触发神奇能量，其他人被触发神奇能量）
		           	 	if (this.openid != now.openid) {
		           	 	//	console.log('其他玩家被触发超级能量')
		           	 		this.player = now.player
		           	 		// // 其他玩家被触发超级能量
		           	 	} else {
		           	 	//	console.log('自己手环被触发超级能量')
		           	 		this.which= 'my-super' // 弹窗遮罩界面
		           	 	}
		           	 }
		           	 if (now.eventname === 'noticecountdown') {
		           	 	this.remaining = now.remaining
		           	 }
		           	 if (now.eventname === 'getsuperintegral') {
		           	 	this.plusMoneyVoicePlay()
		           	 	this.integral = now.integral
		           	 }
		           	 if (now.status === 1 && now.eventname === 'allowcollectgreen') {
		           	 	this.worldEvent= ''
		           	 	this.which = ''
		           	 	this.FIRST_EARTH = true
		           	 }
		           	 // 超级能量结束
		           	 if ((now.status === 1 && now.eventname === 'stopsuperenergy') ||
		           	 	(now.status === 4 && now.eventname === 'stopsuperenergy')) {
		           	 	this.$store.dispatch('getIntergral')
		           	 	this.worldEvent= ''
		           	 	this.which = ''
		           	 }
		           	 // 开始打怪兽
		           	 if (now.status === 3 && now.eventname === 'startattackmonster') {
		           	 	console.log('打怪兽', now)
		           	 	this.worldEvent= 'boss'
		           	 }
		           	 // 打怪兽结束
		           	 if (now.status === 4 && now.eventname === 'stopattackmonster') {
		           	 	this.worldEvent= ''
		           	 }
		    },
			goBoss() {
				this.clickVoicePlay()
				wx.redirectTo({
					url: '/pages/boss/main'
				});
			},
			showSuper() {
				this.clickVoicePlay()
				this.which='super'
			},
			showEarth() {
				this.clickVoicePlay()
				this.which='earth'
			},
			async bandStatus() {
				const resultData = await bandStatusService({ openid: this.openid })
			//	console.log('band', resultData)
				if (resultData && resultData.data) {
					this.bandid = resultData.data.bandid
				//	console.log(this.bandid, 'this.bandid')
					this.reward()
					this.online = resultData.data.bindstatus === 1
				}
			},
			// 关闭界面弹窗
			close(param) {
				this.clickVoicePlay()
				if (param === 'bind') this.online = true
				this.which = ''
			},
			async getAnimaList() {
				const resultData = await animalListService({
					openid: this.openid
				})
				if (resultData && resultData.data) {
					this.animalList = resultData.data
					this.which = 'animal'
					// this.$forceUpdate()
				} else {
					this.which = 'animal'
					this.animalList = []
				}

			},
			async deleteEnergy(index) {

				if (!this.collects[index]) return
				this.clickVoicePlay()
				this.IS_SENDING = true
				this.bags['initshow'+(index+1)] = false
				const ok = await this.requestCollect(this.collects[index], 1, 2, index + 1)
				if (!ok) {
			       	this.ISENDING = false
			       	return
		       }
				setTimeout(() => { 
					this.collects[index] = ''
					this.IS_SENDING = false
				},200);
			
				this.bags[`bagShow${index+1}`] = false
				this.getBagsData()
			},
			openBlueTooth() {
		      const _this = this;
		      wx.openBluetoothAdapter({
		        success(res) {
		          _this.blueStatus = true;
		          _this.searchBlueTooth();
		        },
		        fail(res) {
		          wx.onBluetoothAdapterStateChange(function(res) {
		            if (res.available) {
		              _this.blueStatus = true;
		              _this.searchBlueTooth();
		            }
		          });
		        }
		      });
		    },
		    searchBlueTooth() {
		      wx.startBeaconDiscovery({
		        uuids: ["FDA50693-A4E2-4FB1-AFCF-C6EB07647825"],
		        success: res => {

		          wx.onBeaconUpdate(res => {
		          	// 正在发送请求时，完成一轮收集延迟2s时，界面有弹窗出现时，禁止收集能量
		           	 if (this.ISENDING || this.reset || !!this.which) return
		          // 	 console.log(res.beacons, 'res.beacons')
		           	 let beaconNearby = res.beacons.filter(item => item.accuracy > 0 && item.accuracy < 0.5)
		           	 let amazingEnergy = null

		           	 // socket处理（世界事件）
		           	 if (this.SOCKET_INFO.eventname === 'startsuperenergy') {
		           	 	// 触发了神奇能量（当自己被触发神奇能量，其他人被触发神奇能量）
		           	 	if (this.openid != this.SOCKET_INFO.openid) {
		           	 		amazingEnergy = beaconNearby.filter(item => item.major === 200)[0]
		           	 	}
		           	 }
		         
		           	 if (amazingEnergy) { // 神奇能量触发(神奇能量触发时，检测到神奇能量优先收集神奇能量)
		           	 	this.superEnergyCollect(amazingEnergy)
		           	 	return
		           	 }

		           	 // 以下为普通能量收集
		           	const isNearbyBracelet = !!(beaconNearby.filter(item => {
		           	//	console.log(item.minor, item.major, this.bandid, 'this.bandidthis.bandidthis.bandid')
		           		return item.major === 200 && item.minor.toString() === this.bandid
		           	})[0]) // 自己的手环是否在附近
		            
		           	 const beacon = beaconNearby.filter(item => item.major !==200)[0] // 此时为普通能量收集，过滤掉手环
		           	 if (!beacon) return

		           	 if (this.SOCKET_INFO.eventname === 'prohibitedcollectgreen' && beacon.major === 103) { // 地震时不可收集绿色能量，此时提示用户，且不再往下走
		           	 	// beaconNearby = beaconNearby.filter(item => item.major !== 103)
		           	 	
	           	 		if (!this.GREEN_ISSAME) {
	           	 		//	this.toast = 'forbid-green'
		             		setTimeout(() => {
			             		this.toast = 'forbid-green'
			             		this.GREEN_ISSAME = false

			             	}, 5000);
			             	setTimeout(() => { this.toast = '' }, 6000)
		             	}
		             	this.GREEN_ISSAME = true
		             	return 
		           	 }

		           	
		           	 const item = ENERGY_CONFIG.filter(item => item.major === beacon.major)[0]
		             if (this.collects.includes(item.key)) {
		             	if (!this.ISSAME) {
		             		setTimeout(() => {
			             		this.toast = 'repeat'
			             		this.ISSAME = false

			             	}, 5000);
			             	setTimeout(() => { this.toast = '' }, 6000)
		             	}
		             	this.ISSAME = true
		             } else {
		             	this.handleFindDevs(beacon, isNearbyBracelet);
		             }
		             
		          });
		        },
		        fail: function(err) {
		        	// console.log(err, 'err')
		        }
		      });
		    },
		    // 超级能量收集
		    async superEnergyCollect(energy) {
		    //	console.log(energy);
		    	if (this.ISENDING) return
		    	this.ISENDING = true
		    	const resultData = await superCollectService({ openid: this.openid })
		    	// console.log(resultData, resultData.errmsg, 'err')
		    	if (resultData && resultData.errmsg) return
		    	this.video.play = true;
		        this.video.energyType = 'super'
		        setTimeout(() => {
		        	this.video[`energyShow4`] = true
		       }, 2000);
		        setTimeout(() => {
			       	this.video.play = false
			       	this.video.superlittle=true
			       	this.video.energyType += '-finish'
		       }, 3000);
		        setTimeout(() => {
			       	this.video.superfinish=true
		       }, 3200);
		         setTimeout(() => {
			       	// 重置超级能量收集变量
			       	this.video.energyType = ''
			       	this.video.superlittle=false
			       	this.video.superfinish=false
			       	this.video[`energyShow4`] = false
			       	this.ISENDING = false
		       }, 5000);

		        this.$store.dispatch('getIntergral')
		    },
		    // 普通能量收集
		    async handleFindDevs(beacon, isNearbyBracelet) {
		       if (this.ISENDING) return
		       this.ISENDING = true
		       const major = beacon.major
		       const minor = beacon.minor
		       const item = ENERGY_CONFIG.filter(item => item.major === major)[0]
	           const key = item.key
		       // 发送请求
		       let _position = -1
		       if (!this.collects[0]) {	
		       		_position = 1 
		       } else if (!!this.collects[0] && !this.collects[1]) {
		       	    _position = 2
		       } else {
		       		_position = 3
		       }
		      const ok = await this.requestCollect(key, 0, 1, _position, major.toString(), minor.toString(), isNearbyBracelet)
		      if (!ok) {
			       	this.ISENDING = false
			       	return
		       }
		       // 请求完成之后 播放视频动画
		       this.video.play = true;
		       this.video.energyType = item.color
		       if (!this.collects[0]) {		      
		      		this.collects[0] = key
		      		this.index = 0
		      		setTimeout(() => this.ISENDING = false, 4000)
		      	} else if (!!this.collects[0] && !this.collects[1]) {
		      		this.collects[1] = key
		      		this.index = 1
		      		setTimeout(() => this.ISENDING = false, 4000)
		      	} else {
		      		this.collects[2] = key
		      		this.index = 2
		      		// this.ISENDING = true
		      		setTimeout(()=>{ 
		      			this.together = true
		      			this.plusMoneyVoicePlay()
		      		}, 3500)
		      	}
		       setTimeout(() => {
		       	this.video.play = false
		       	this.video.energyType += '-finish'
		       	this.video[`energyDown${this.index + 1}`] = true
		       }, 3000);
		        setTimeout(() => {
		        	this.video[`energyShow${this.index + 1}`] = true
		       }, 2000);
		       // this.ISENDING = false

		    },
		    async getBagsData() {
		    	const resultData = await bagsListService({ openid: this.openid})
		    	if (resultData && resultData.data) {
		    		resultData.data.forEach(item => {
		    			this.bags[item.color] = item.yield
		    		})
		    	}
		    },
		   
		    async requestCollect(key, type, operation, position, major, minor, isNearbyBracelet) {
		        const o = {
		    		openid: this.openid,
		    		color: key,
		    		operation,
		    		type,
		    		position,
		    		major, 
		    		minor
		    	}
		    	if (isNearbyBracelet && this.online) o.bandid = this.bandid
		        const resultData = await collectService(o)
		    	if (type === 1) {
			       	this.getBagsData()
			       }
	 
			    if (resultData && resultData.code) {
			    	switch (resultData.code) {
			        	case 100:
			        		return true 
			       		case 101:
			       			this.finish.integral = resultData.data.integral
			       			 this.$store.dispatch('getIntergral')
			       			  // this.plusMoneyVoicePlay()
			       			return true 
			       		case 102:
			       			this.finish.integral = resultData.data.integral
			       			this.finish.pet = resultData.data.pet
			       			 this.$store.dispatch('getIntergral')
			       			  // this.plusMoneyVoicePlay()
			       			return true 
			       }
			   } else {
			   		return false
			   }
		    },
		    async getBagEnergy(color, num) {
		    	this.clickVoicePlay()
		    	if (!num || this.reset) return // 数量为0时点击无效
		    	if (this.ISENDING) return
		    	this.ISENDING = true
		       if (this.collects.includes(color)) {
			       //	this.$tip.toast('不能选择重复颜色')
			       	this.toast = 'repeat'
			       	setTimeout(() => { this.toast = ''}, 1000)
			       	this.ISENDING = false
			       	return
		       }
		       // 发送请求
		       let _position = -1
		       if (!this.collects[0]) {	
		       		_position = 1 
		       } else if (!!this.collects[0] && !this.collects[1]) {
		       	    _position = 2
		       } else {
		       		_position = 3
		       }
		       const ok = await this.requestCollect(color, 1, 1, _position)
		       if (!ok) {
			       	this.ISENDING = false
			       	return
		       }
		    	if (!this.collects[0]) {
		    		this.collects[0] = color
		      		this.bags.bagShow1 = true
		      		this.ISENDING = false
		      	} else if (!!this.collects[0] && !this.collects[1]) {
		      		this.collects[1] = color
		      		this.bags.bagShow2 = true
		      		this.ISENDING = false
		      	} else {
		      		this.collects[2] = color
		      		this.bags.bagShow3 = true
		      		// this.ISENDING = true
		      		setTimeout(()=>{ 
		      			this.plusMoneyVoicePlay()
		      			this.together = true
		      			if (!!this.finish.pet) {
		      				this.getAnimalVoicePlay()
		      			}
		      		}, 1000)
		      	}

		    },
		    goBulid() {
		    	this.clickVoicePlay()
		    	wx.redirectTo({
					url: '/pages/build/main'
				});
		    },
		    pageReset() {
				
				
				// this.resetData()
				this.FIRST_EARTH = true
				this.tip=0
				// this.resetData()
				// this.fadeIn = false
				this.animalList= []
			  	this.rangeList = []
			  	this.taskList = []
			  	// timer: null,
			  	this.bandid = ''
			  	this.SOCKET_INFO =  {
			  		status: -1,
			  		eventname: '',
			  		openid: ''
			  	}
			  	this.player = '' // 超级能量玩家
			  	this.remaining = 0 // 超级能量剩余时间
			  	this.integral= 0 // 超级能量触发者获得积分
			  	this.worldEvent='' // 世界事件名称
				this.reset = false
				this.toast = ''
			  	this.video = { // 收集能量时视频相关参数
			  		play: false, // 检测到能量时播放视频
			  		address: 0, // 能量当前放置位置
			  		initshow1: false,
			  		initshow2: false,
			  		initshow3: false,
			  		energyType: '', // 能量类型（4种，blue，orange，yellow，green）
			  		energyShow1: false, // 视频将播放完时显示生成的能力球
			  		energyDown1: false,
			  		energyShow2: false, // 视频将播放完时显示生成的能力球
			  		energyDown2: false,
			  		energyShow3: false, // 视频将播放完时显示生成的能力球
			  		energyDown3: false
			  	}
			  	this.bags = {
			  		initshow1: false,
			  		initshow2: false,
			  		initshow3: false,
			  		'2': 0,
			  		'3':0,
			  		'4':0,
			  		'1':0,
			  		bagShow1: false,
			  		bagShow2: false,
			  		bagShow3: false
			  	}
			  	this.finish = {
			  		integral: 0,
			  		pet:null
			  	}
			  	this.collects= ['', '', '']   	
			  	this.online = false 
			  	this.blueStatus = false 
			  	this.which = '' 
			  	this.energyIn = false 
			  	this.hasBracelet= true 
			  	this.ISSAME = false 
			  	this.IS_SENDING=false
			  	this.GREEN_ISSAME = false
			},
		    async getCollect() {
		    	this.ISENDING = true
		    	const resultData = await getCollectService({ openid: this.openid })
		    	if (resultData && resultData.data) {
		    		resultData.data.forEach(item => {
			    		this.collects[item.position - 1] = item.color
			    		// const type = 
			    		this[item.ctype === 0 ? 'video' : 'bags'][`initshow${item.position}`] = true
			    	})
		    	}
		    	this.ISENDING = false
		    },
		    listenColseSocket() {
		    	this.socketTask.close()
				wx.onSocketClose(function(res){
			//	  console.log("WebSocket 已关闭！")
				})
		    },
		     resetData() {
		     	this.clickVoicePlay()
		    	this.reset = true // 重置时不再出现背包消失的效果
		    	this.together = false
			  	this.index = 0 // 第index个位置发生能量变化
			  	this.video = Object.assign(this.video, {
			  		play: false, // 检测到能量时播放视频
			  		address: 0, // 能量当前放置位置
			  		energyType: '', // 能量类型（4种，blue，orange，yellow，green）
			  		energyShow1: false, // 视频将播放完时显示生成的能力球
			  		energyDown1: false,
			  		energyShow2: false, // 视频将播放完时显示生成的能力球
			  		energyDown2: false,
			  		energyShow3: false, // 视频将播放完时显示生成的能力球
			  		energyDown3: false,
			  		initshow1: false,
		  			initshow2: false,
		  			initshow3: false,
			  	})
			  	this.finish = {
			  		integral: 0,
		  			pet:null
			  	}
			  	this.bags = Object.assign(this.bags, {
			  		initshow1: false,
		  			initshow2: false,
		  			initshow3: false,
			  		bagShow1: false,
			  		bagShow2: false,
			  		bagShow3: false
			  	})
			  	this.ISENDING = false
			  	this.collects = ['', '', ''] // 当前收集能量集  	
			  	setTimeout(() => this.reset=false, 2000);
		    }
		},
		async onShow() {
			//console.log('onShow')
			this.tipTimer = setInterval(this.tipNum, 10000)
			this.starTimer = setInterval(this.starNum, 40)
			this.playClickMusic()
		 	// this.playBgMusic()
		 	// 考虑从后台进入时可能存在 正在进行世界事件
		 	if (this.which === 'earth' && this.worldEvent === 'earth') {
				this.playEarthBgMusic()
			} else if ((this.which === 'my-super' || this.which === 'super') && this.worldEvent === 'super') {
				this.playSuperBgMusic()
			} else {
				this.playBgMusic()
			}
			this.$store.dispatch('getIntergral')
			this.which = ''
			this.worldEvent = ''
			this.listenSocket() // 连接socket
			this.bandStatus() // 查询当前手环绑定状态
			await this.getCollect() // 查询收集状态
			await this.getBagsData() // 查询背包数量
			this.openBlueTooth() // 连接蓝牙
			//this.playBgMusic()
		},
		mounted() {
			this.fadeIn = true
			
		},
		onHide() {
			this.listenColseSocket()
			clearInterval(this.timer)
		    wx.stopBeaconDiscovery();
		    // this.pageReset()
		    // wx.stopBackgroundAudio()
		    clearInterval(this.starTimer)
		    clearInterval(this.tipTimer)
		  },
		
		onUnload() {
			clearInterval(this.tipTimer)
			clearInterval(this.starTimer)
			this.clickVoice.destroy()
			this.plusMoneyVoice.destroy()
			this.getAnimalVoice.destroy()
			this.collectBg.destroy() 
			 clearInterval(this.timer)
		},
		watch: {
			which: {
				handler(newValue, oldValue) {
				//	console.log('newValue', newValue)
					if (newValue === 'earth' && this.worldEvent === 'earth') {
					
					//	console.log('ea')
						this.playEarthBgMusic()
					} else if ((newValue === 'my-super' || newValue === 'super') && this.worldEvent === 'super') {
						this.playSuperBgMusic()
					} else {
						this.playBgMusic()
					}
				}
			}
		},
		components: { CommonTop, Email, Task, Range, Bracelet, Animal, Success, Amazing, Earth, SuperMe },
	}
</script>
<style lang="less">
@cdn: "http://parkiland.isxcxbackend1.cn/";
.bg(@url, @vertical:center){
 	background: url("@{cdn}@{url}.png") center @vertical no-repeat ;
    background-size: 100% 100%;
}
@keyframes progressBraceletOnline {
  from {width: 0px;}
  to {width: 45px;}
}
@keyframes progressSunny {
  from {width: 0px;}
  to {width: 38px;}
}
@keyframes energyIn{
	from {display: none;}
    to {display: block;}
}
@keyframes onlineAnimation{
	0% { right:25px; opacity:0;}
    80% { right:25px; opacity:0}
    90% { right:75px; opacity:1}
    100% {right:75px; opacity:0;}
}
@keyframes superNumNone{
	from{opacity: 1;top:50%;}
	to{opacity: 0;top:-30%;}
}

@keyframes starsAnimation {
	// .ml-loop(60);
  0% {background-image: url("@{cdn}star00.png")}
  2% {background-image: url("@{cdn}star01.png")}
  4% {background-image: url("@{cdn}star02.png")}
  6% {background-image: url("@{cdn}star03.png")}
  8% {background-image: url("@{cdn}star04.png")}
  10% {background-image: url("@{cdn}star05.png")}
  12% {background-image: url("@{cdn}star06.png")}
  14% {background-image: url("@{cdn}star07.png")}
  16% {background-image: url("@{cdn}star08.png")}
  18% {background-image: url("@{cdn}star09.png")}
  20% {background-image: url("@{cdn}star10.png")}
  22% {background-image: url("@{cdn}star11.png")}
  24% {background-image: url("@{cdn}star12.png")}
  26% {background-image: url("@{cdn}star13.png")}
  28% {background-image: url("@{cdn}star14.png")}
  30% {background-image: url("@{cdn}star15.png")}
  32% {background-image: url("@{cdn}star16.png")}
  34% {background-image: url("@{cdn}star17.png")}
  36% {background-image: url("@{cdn}star18.png")}
  38% {background-image: url("@{cdn}star19.png")}
  40% {background-image: url("@{cdn}star20.png")}
  42% {background-image: url("@{cdn}star21.png")}
  44% {background-image: url("@{cdn}star22.png")}
  46% {background-image: url("@{cdn}star23.png")}
  48% {background-image: url("@{cdn}star24.png")}
  50% {background-image: url("@{cdn}star25.png")}
  52% {background-image: url("@{cdn}star26.png")}
  54% {background-image: url("@{cdn}star27.png")}
  56% {background-image: url("@{cdn}star28.png")}
  58% {background-image: url("@{cdn}star29.png")}
  60% {background-image: url("@{cdn}star30.png")}
  62% {background-image: url("@{cdn}star31.png")}
  64% {background-image: url("@{cdn}star32.png")}
  66% {background-image: url("@{cdn}star33.png")}
  68% {background-image: url("@{cdn}star34.png")}
  70% {background-image: url("@{cdn}star35.png")}
  72% {background-image: url("@{cdn}star36.png")}
  74% {background-image: url("@{cdn}star37.png")}
  76% {background-image: url("@{cdn}star38.png")}
  78% {background-image: url("@{cdn}star39.png")}
  80% {background-image: url("@{cdn}star40.png")}
  82% {background-image: url("@{cdn}star41.png")}
  84% {background-image: url("@{cdn}star42.png")}
  86% {background-image: url("@{cdn}star43.png")}
  88% {background-image: url("@{cdn}star44.png")}
  90% {background-image: url("@{cdn}star45.png")}
  92% {background-image: url("@{cdn}star46.png")}
  94% {background-image: url("@{cdn}star47.png")}
  96% {background-image: url("@{cdn}star48.png")}
}
@keyframes toast{
	from{ opacity: 1}
	to{ opacity: 0;}
}
.collect-wrap{
	overflow:hidden;
	height:100%;
	width:100%;
	position:absolute;
    .toast{
    	opacity:0;
    	position:fixed;
    	width:375rpx;
    	height:102rpx;
    	left:50%;
    	top:30%;
    	transform:translateX(-50%);
    	.bg("tip-not-pl2-same-energy");
    	&.green{
    		.bg("pl2_forbid-green");
    	}
    	&.show{
    		animation: toast 1s;
    	}
    }
	.collect-bg{
		height:100%;
		width:100%;
		position:absolute;
		.bg("pl2_background@2x");
		background-size: 100% 100%;
	}
	.cloud{
		height:100%;
		width:100%;
		position:absolute;
		.bg("pl2_cloud@2x");
	}
	.stars{
		
		height:100%;
		width:100%;
		width:150px;
		height: 150px;
		position:absolute;
		left:50%;
		transform: translateX(-45%);
		top:110px;
		// background: url("http://parkiland.isxcxbackend1.cn/star39.gif")  center center no-repeat;
    	background-size: 100% 100%;
 		&.animation{
 			animation: starsAnimation 2s infinite;
			animation-fill-mode:forwards;
 		}
	}
	.button{
		transition: 1s;
		position:absolute;
		width:67px;
		height:57px;
		&.z-index-top{
			z-index: 3;
		}
		&.task-button{
			left:-70px;
			top:108px;
			.bg("pl2_task@2x");
		}
		&.email-button{
			left:-70px;
			top:179px;
			.bg("pl2_mail@2x");
		}
		&.animal-button{
			right:-70px;
			top:108px;
			.bg("pl2_PetCard@2x");
		}
		&.online-button{
			right:-70px;
			top:179px;
			.bg("pl2_on line@2x");
			
			.progress-mask{
				border-radius:12px;
				position: absolute;
				width:48px;
				height: 10px;
				bottom:15px;
				border:2px solid #000;
				box-sizing:border-box;
				background: #fff;
				left:14px;
				overflow:hidden;
			
				// .bg("pl2_line_schedule_mask@2x");
				.progress{
					box-sizing: border-box;
					border-radius:12px;
					width:0px;
					height: 6px;
					background:#fffb7d;
					// bottom:15px;
					border-radius:12px;
					// left:14px;
					// .bg("pl2_line_schedule@2x");
					// background: url("@{cdn}pl2_line_schedule@2x.png") no-repeat 0 0;
					// background-size:100% 100%;
					&.hasBracelet{
						animation: progressBraceletOnline 5s infinite ease;
					}
					.sunny{
						position: absolute;
						top:1px;
						left:3px;
						width: 0px;
						height: 1px; 
						background: #fff;
					 	&.hasBracelet{
							animation: progressSunny 5s infinite ease;
						}
					}
				}
				
			}
			
		}
		
		&.offline-button{
			right:-70px;
			top:180px;
			.bg("pl2_unbind");
			// .progress-mask{
			// 	border-radius:12px;
			// 	position: absolute;
			// 	width:48px;
			// 	height: 10px;
			// 	bottom:15px;
			// 	border:2px solid #000;
			// 	box-sizing:border-box;
			// 	background: #fff;
			// 	left:14px;
			// 	overflow:hidden;
			// }
		}
		&.fade-left-in{
			left:0;
		}
		&.fade-right-in{
			right:0;
		}
	}
	.bracelet-plus{
		position:absolute;
		top:189px;
		padding-left:15px;
	 
		box-sizing:border-box;
		font-size:13px;
		background: url("@{cdn}pl2_energy_2@2x.png") no-repeat 0 0;
		background-size:10px 100%;
		height:15px;
		// top:10px;
		opacity:0;
		color:rgb(255,173,0);
		&.reward{
			animation:onlineAnimation 5s infinite ease;
		}
	}
	.line{
		z-index:55;
		width: 236px;
		height:19px;
		.bg("pl2_green@2x");
		position:absolute;
		left:50%;
		transform:translateX(-50%);
		bottom:37%;
		&.finish{
			z-index:7;
		}
		.mask{
	 		// .bg("pl2_mask@2x");
			position: absolute;
			border-radius:12px;
			border:2px solid #000;
			box-sizing: border-box;
			background: #fff;
			top:0;
			width:100%;
			height: 15px;
			right:0;
			overflow:hidden;
		 	position: relative;
			.progress{
				// border-radius:12px;
				transition:width 3s ease;
				height: 100%;
				width:0;
				background: #23ff03;
			 
				&.green-action{
					width:100%;
					background: #23ff03;
				}
				&.yellow-action{
					width:100%;
					background: #ffe504 ;
				}
				&.blue-action{
					width:100%;
					background: #04b8ff;
				}
				&.orange-action{
					width:100%;
					background: #ff7603 ;
				}
				&.super-action{
					width:100%;
					background:#e84dff;
				}
				&.green-finish{
					transition:width 0.5s;
					background: #23ff03;
				}
				&.yellow-finish{
					transition:width 0.5s;
					background: #ffe504 ;
				}
				&.blue-finish{
					transition:width 0.5s;
					background: #04b8ff;
				}
				&.orange-finish{
					transition:width 0.5s;
					background:#ff7603 ;
				}
				&.super-finish{
					transition:width 0.5s;
					background:#e84dff ;
				}


			}
			.sunny{
					width:90%;
					height: 2px;
					background: #fff;
					position: absolute;
					top:2px;
					left:50%;
					transform: translateX(-50%);
				}
		}
		
	}
	.nums-wrap{
		position:absolute;
		bottom:143px;
		left:0;
		width:100%;
		height:65px;

		.one-three{
			position:absolute;
			bottom:0;
			left:50%;
			width: 236px;
			display:flex;
			justify-content:space-between;
			transform:translateX(-50%);
			.num{
				width: 58px;
				height:67px;
				position:relative;
				&.one{
					.bg("pl2_1@2x");
				}
				&.two{
					.bg("pl2_2@2x");
				}
				&.three{
					.bg("pl2_3@2x");
				}
				.bag-energy{
					transition: 0.5s;
					opacity:0;
					position: absolute;
					height: 90px;
					border-radius:50%;
					width:90px;
					z-index:45;
					left:50%;
					bottom:-14px;
					// bottom: 20%;
					transform:translateX(-50%);
					// top:50%;
					&.blue{
						.bg("pl2_ball_blue@2x");
					}
					&.green{
						.bg("pl2_ball_green@2x");
					}
					&.yellow{
						.bg("pl2_ball_yellow@2x");
					}
					&.orange{
						.bg("pl2_ball_orange@2x");
					}
					&.show{
						opacity: 1;
						height:45px;
						width:45px;
						bottom:16px;
					}
					&.initshow{
						transition: 0;
						opacity: 1;
						height:45px;
						width:45px;
						bottom:16px;
					}
					&.address1.together{
						transition: 0.5;
						left: 110%;
					}
					&.address3.together{
						transition: 0.5;
						left:-20%;
					}
				}
			}
		}
		.plus{
			position:absolute;
			right:15px;
			bottom:5px;
			width:32px;
			height:32px;
			&.has-bg{
				.bg("pl2_+@2x");
			}

		}
	}
	
	.energy-wrap{
		transition-timing-function: ease-in;
		transition: 0.5s;
		z-index:2;
		box-sizing:border-box;
		position:absolute;
		bottom:-200px;
		left:50%;
		transform:translateX(-50%);
		width:356px;
		height:137px;
		.bg("pl2_bag@2x");
		display:flex;
		justify-content:space-between;
		padding:45px 22px 0 20px;
		&.fadeUp{
			bottom:0;
		}
		.boll{
			width:72px;
			height:72px;
			position:relative;
			.bg("pl2_ball_bot@2x");
			.round{
				width:59px;
				height:59px;
				position:absolute;
				left:50%;
				transform:translateX(-50%);
				top:5px;
				&.yellow{
					.bg("pl2_ball_yellow@2x");
				}
				&.blue{
					.bg("pl2_ball_blue@2x");
				}
				&.green{
					.bg("pl2_ball_green@2x");
				}
				&.orange{
					.bg("pl2_ball_orange@2x");
				}
			}
			.num{
				position:absolute;
				bottom:0;
				left:50%;
				font-size:10px;
				transform:translateX(-50%);
				// .bg("pl2_shadow@2x");
			}
			.little-round{
				.bg("pl2_shadow@2x");
				position:absolute;
				width:41px;
				height:10px;
				bottom:2px;
				left:50%;
				transform:translateX(-50%);
			}
		}
	}
	.my-home{
		transition: 0.8s;
		transition-timing-function: ease;
		position:absolute;
		left:50%;
		bottom:15px;
		width:100px;
		height:110px;
		.bg("pl2_Parkiland@2x");
		transform:translateX(-50%);
		&.fadeUp{
			bottom: 0;
		}
	}
	.pop-up-left{
		transition: 0.5s;
		position: absolute;
		top:0;
		left:-100%;
		height: 100%;
		width:100%;
		&.fadeUp{
			left:0;
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
	.pop-up-right{
		transition: 0.5s;
		position: absolute;
		top:0;
		right:-100%;
		height: 100%;
		width:100%;
		&.fadeUp{
			right:0;
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
	.collect-sunny{
		position: absolute;
		left:0;
		top:0;
		height: 100%;
		width:100%;
		z-index:50;
		video{
			height: 100%;
			width:100%;
		}
		
	}
	.energy{
		z-index:55;
		position: absolute;
		bottom: 64%;
		left: 50%;
		height: 118px;
		width:118px;
		transition: 0.5s;
		opacity: 0;
	
		// display: none;
		transform: translateX(-50%);
		&.blue{
			
			.bg("pl2_ball_blue@2x");
		}
		&.green{
			.bg("pl2_ball_green@2x");
		}
		&.yellow{
			.bg("pl2_ball_yellow@2x");
		}
		&.orange{
			.bg("pl2_ball_orange@2x");
		}
		&.show{
			opacity: 1;
			// display: block;
		}
		&.initshow1{
			transition: 0;
			opacity: 1;
			bottom: 159px;
			width:45px;
			height:45px;
			left:26%;
			z-index:7;
		}
		&.initshow2{
			transition: 0;
			opacity: 1;
			height:45px;
			width:45px;
			bottom: 159px;
			z-index:7;
		}
		&.initshow3{
			transition: 0;
			opacity: 1;
			bottom: 159px;
			width:45px;
			height:45px;
			left:74%;
			z-index:7;
		}
		&.down1{
			bottom: 159px;
			width:45px;
			height:45px;
			left:26%;
			z-index:7;
		}
		&.down2{
			bottom: 159px;
			width:45px;
			height:45px;
			z-index:7;
		}
		&.down3{
			bottom: 159px;
			width:45px;
			height:45px;
			left:74%;
			z-index:7;
		}
		&.energy-1.together{
			transition: 0.5s;
			z-index:88;
			left: 37%;
			// .bg("pl2_ball_green@2x");
		}
		&.energy-2.together{
			transition: 0.5s;
			z-index:88;
			// left: 38%;
			// .bg("pl2_ball_green@2x");
		}
		&.energy-3.together{
			transition: 0.5s;
			z-index:88;
			left: 62%;
			// .bg("pl2_ball_green@2x");
		}
		&.super{
			transition: 0.5s;
			&.show{
				opacity: 1;
			}
			img{
				position: absolute;
				width:100%;
				height:100%;
				opacity: 1;
				border-radius: 50%;
				transition: 0.5s;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
				&.little{
					transition: 0.1s;
					width:80%;
					height:80%;
				}
				&.finish{
					transition: 0.3s;
					width:130%;
					opacity: 0;
					height:130%;
				}
			}
			.super-num{
				position: absolute;
				width:191rpx;
				height:68rpx;
				.bg("pl2_num_super");
				left:50%;
				top:50%;
				opacity: 0;
				transform:translate(-50%,-50%);
				animation: superNumNone 1s normal ease;
			}
		}

	} 
	.world{

		width:95rpx;
		height:123rpx;
		position:absolute;
		right:35rpx;
		bottom:32rpx;
		.boss{
			.bg("pl2_event_monster@2x");
			width:100%;
			height:100%;
		}
		.earth{
			.bg("pl2_event_earthquake@2x");
			width:100%;
			height:100%;
		}
		.amazing{
			.bg("pl2_eventmagicenergy@2x");
			width:100%;
			height:100%;
		}
	}
}
</style>
