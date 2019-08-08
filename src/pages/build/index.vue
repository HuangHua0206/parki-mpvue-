<template>
	<div class="build-wrap">
		<div class="cloud"></div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		share>
  		</CommonTop>
  		<div @click="goCollect" class="button collect-energy" :class="{'fade-left-in': fadeIn}"  ></div>
		<div class="button hunting-button" :class="{'fade-right-in': fadeIn}" @click="openHunting"></div>
		<div class="button friend-button" style="z-index:60"  :class="{'fade-right-in': fadeIn}" @click="openFriend"></div>
		<div class="build-store" @click="showStore"></div>
		<div class="build-my" @click="showMy"></div>
 		
 		<!-- 建造区 -->
		<div class="area" @longpress="longTap">
			<div :class="{noBg : !isBuild}" class="mark"></div>
			<!--  建造action -->
			<div class="action area-item item1" :class="'item' + ($index+1)"  v-for="(item, $index) in 51" :key="$index" @longpress.stop="" >
				<div class="build-content" :class="{
					'activeGreen': index === ($index +1) && active === 'ok' && !imgDown,
					'activeRed': index === $index +1 && active === 'forbid'
				}"  style="text-align: center;line-height:76rpx">   
					<div class="build-one" v-if="index === ($index+1)"  >
						<img v-if="!tentShow" :src="'http://parkiland.isxcxbackend1.cn/pl2_'+buildContent.prdname+'.png'" :class="{down : imgDown, 'build-img': tend }"   />
						<div class="tent" v-show="tentShow">
							<div class="progress">
								<div class="line"></div>
							</div>
						</div>
						<div v-if="!imgDown && index === ($index +1) && active === 'ok'"  class="confirm" @click="confrimBuild"></div>
						<div v-if="!imgDown" class="cancel" @click="cancelBuild"></div>
					</div>
				</div>
			</div>
			<!-- 已建造好 -->
			<div 
				class="area-item item1 finish-list" 
				:class="'item' + (item.location)"  
				v-for="(item, $index) in buildList" 
				:key="$index" 
				>
				<div class="build-content" >
					<div class="build-one"  >
						<img :src="'http://parkiland.isxcxbackend1.cn/pl2_'+item.prdname+'.png'"/>
				<!-- 		<div v-if="!tentShow" class="cancel"></div> -->
					</div>
					<div class="time-remaing" v-if="!!item.remaining">{{ item.remainingShow }}</div>
					<div class="energy" :class="{
						'blue': item.color === '3' ,
						'yellow': item.color === '2',
						'green': item.color === '4',
						'orange': item.color === '1',
						'borth': item.remaining === 0,
						'hasborth': item.remaining !== 0 && !item.remaining,
						'collect': item.collect
					}" @click="collectEnergy(item)"></div>
					<div v-if="deleteIndex === item.location" class="cancel" @click="deleteBuild"></div>
				</div>
			</div>
		</div>

		<!-- 建造--选择区域 -->
		<div class="pop-up-bottom" :class="{fadeUp: which === 'store'}" @click="which=''">
<!-- 			<div class="mask" @click="which=''"></div> -->
			<div class="store common">
				<div class="titles">
					<div class="title-item" :class="{active: storeType === 1}" @click.stop="storeType = 1">建筑</div>
					<div class="title-item" :class="{active: storeType === 2}" @click.stop="storeType = 2">Parki建筑</div>
					<div class="title-item" :class="{active: storeType === 3}" @click.stop="storeType = 3">自然</div>
				</div>
				<div class="list">
					<div class="list-item" v-for="(item, $index) in shopList" :key="$index" @click.stop="openBuyPop(item)">
						<img :src="'http://parkiland.isxcxbackend1.cn/pl2_store_'+item.prdname+'.png'"  />
						<div class="cost">
							<div class="icon"></div>
							<div class="money">{{item.cost}}</div>
						</div>
						<img class="energy-img" :src="'http://parkiland.isxcxbackend1.cn/pl2_ball_'+item.color+'.png'" />
					</div>
				</div>
			</div>
		</div>
		<div class="pop-up-bottom" :class="{fadeUp: which === 'my'}" @click="which=''">
		<!-- 	<div class="mask" @click="which=''"></div> -->
			<div class="my common">
				<div class="titles">
					<div class="title-item" :class="{active: myType === 1}" @click.stop="myType = 1">建筑</div>
					<div class="title-item" :class="{active: myType === 2}" @click.stop="myType = 2">Parki建筑</div>
					<div class="title-item" :class="{active: myType === 3}" @click.stop="myType = 3">自然</div>
				</div>
				<div class="list">
					<div class="list-item" 
						v-for="(item, $index) in myList"
						:key="$index"
						@click.stop=""
						@touchstart.stop="e => tStart(e, item)"
			            @touchmove.stop="e => tMove(e, item)"
			            @touchend.stop="e => tEnd(e, item)"> 	
						<img :src="'http://parkiland.isxcxbackend1.cn/pl2_store_'+item.prdname+'.png'"  />
						<div class="num">{{item.amount}}</div>
						<img class="energy-img" :src="'http://parkiland.isxcxbackend1.cn/pl2_ball_'+item.color+'.png'" />
			        </div>
				</div>
			</div>
		</div>
		<div class="buy-pop" v-if="buyOpen" >
			<div class="mask"></div>
			<div class="buy-wrap">
				<div class="close" @click="buyOpen = false"></div>
				<div class="content">
					<img :src="'http://parkiland.isxcxbackend1.cn/pl2_store_'+buyContent.prdname+'.png'" />
					<div class="name">{{buyContent.prdname}}</div>
					<div class="money">
						<div class="icon"></div>
						<div class="cost">x {{buyContent.cost}}</div>
					</div>
				</div>
				<div class="num-wrap">
					<div class="sub" @click="subNum"></div>
					<div class="num">{{buyNum}}</div>
					<div class="add" @click="addNum"></div>
				</div>
				<div class="total">
					一共花费<div class="icon"></div>
						<div class="cost">{{buyNum * buyContent.cost}}</div>
				</div>
				<div class="buy-btn" @click="buyBuild">购买</div>
			</div>
		</div>
		<!-- 弹窗部分 -->
		<div class="pop-up-right" :class="{fadeUp: which === 'hunting'}"> 
			<Hunting   @closePop="which = ''"  />
		</div>
		<div class="pop-up-right" :class="{fadeUp: which === 'friend'}"> 
			<Friend   @closePop="which = ''"  />
		</div>
		<div style="opacity:0;" class="opacity0-tent"></div>
	</div>
</template>
<script>
import CommonTop from 'components/top'
import storage from 'utils/storage'
import Hunting from './hunting'
import Friend from './friend'
import { 
	shopListService, 
	myListService, 
	buildService, 
	removeService, 
	buildListService, 
	buyService,
	collectBallsService
	 } from 'services/build'
export default {
	data() {
		return {
			positions: [],
			shopList: [],
			buildList: [],
			myList: [],
			imgDown:false,
			tend:false, // 选择完成，送手指，展示建筑掉下来效果
			index: -1, // 构建第index个建筑
			tentShow: false,
			active: '',
			isBuild: false,
			which: '',
			fadeIn: false,
			forbidList: [7,10, 14,17,21,24,28,31,35,38,42,45],
			storeType: 1,//  3 是植物,1是建筑，2是parki
			myType: 1,
			buyContent: {
				url: '',
				cost: 0
			},
			buyOpen:false,
			buyNum: 1,
			buildContent: {},
			deleteIndex: -1
		}
	},
	components: { CommonTop, Hunting, Friend },
	computed: {
		hasBuild() {
			const arr = this.buildList.map(item => item.location)
		//	console.log(arr)
			return arr
		}
		
	},
	onShow() {
		console.log('onShow')
		this.$store.dispatch('getIntergral')
		this.getData('created')
		// this.fadeIn = true
		this.listenSocket() // 连接socket
	},
	methods: {
		openHunting() {
			this.which = 'hunting'
		},
		openFriend() {
			console.log(888)
			this.which = 'friend'
			// this.socketTask.send({
			// 	data: JSON.stringify({
			// 		test: '测试一下发送websocket内容'
			// 	})
			// })
		},
		async collectEnergy(build) {
			console.log('uihuijhkjhk')
			const userinfo = storage.getStorage('userinfo') || {}
			const resultData = await collectBallsService({
				openid: userinfo.openid,
				uniqueid: build.uniqueid
			})
			if (resultData && resultData.errmsg) return
			this.buildList = this.buildList.map(item => {
				if (build.location === item.location) {
					item.remaining = resultData.remaining
					item.remainingShow = this.fromateTime(resultData.remaining)
				}
				return item
			})
		},
		fromateTime(remaining) {
			let h = parseInt((remaining / 60)).toString()
			// if (m.length < 2) {
			// 	m = '0' + m
			// }
			let m = (remaining % 60).toString()
			// if (s.length < 2) {
			// 	s = '0' + s
			// }
			return h + 'h' +m + 'min'
		},
		listenSocket() {
			 const userinfo = storage.getStorage('userinfo') || {}
		      this.socketTask = getApp().globalData.socketTask;
		      if (!this.socketTask || this.socketTask.readyState !=1){
		        console.info("重新連接")
		        this.socketTask = wx.connectSocket({
		        	//url: 'wss://www.isxcxbackend1.cn/websocket'
		         url: 'wss://www.j4ckma.cn/parki/ws?openid='+userinfo.openid
		        })
		        getApp().globalData.socketTask = this.socketTask;
		      }
		      console.log('this.socketTask', this.socketTask)
		      this.socketTask.onMessage(res => {
		   //     console.log('oooo', res);
		        const _data = JSON.parse(res.data)
		        this.SOCKET_INFO = _data
		        this.socketDeal(_data)
		      }),
		        //连接失败
		        this.socketTask.onError(function() {
		          console.log("websocket连接失败！");
		          // _this_this.gsStatus = 1;
		          // _this.isSlow = false;
		        });
		    },
		socketDeal(socket){
			console.log('socket', socket)
			this.buildList = this.buildList.map(item => {
				if (socket.location === item.location) {
					return {
						...item,
						...socket,
						remainingShow: this.fromateTime(socket.remaining)
					}
				} else {
					return item
				}
			})
		},
		longTap(e) {
			console.log('长按')

			let minVal = Infinity;
	        let _index = -1
	        //拿到两点之间最小的距离与菱形索引
	        this.positions.forEach(item => {
		        let result = this.minRange(e.clientX, e.clientY, item.x, item.y);
		        if (result < minVal) {
		            minVal = Number(result);
		            _index = item.index;
		        }
	        });
	        this.deleteIndex = _index
			this.isBuild = true
		},
		cancelBuild() {
			this.index = -1
		 	this.tentShow = false
		 	this.imgDown = false
		 	this.tend = false
		 	 this.isBuild = false
			// this.index = -1
			// this.tent = false
			// this.isBuild = false
		},
		async deleteBuild() {
			const userinfo = storage.getStorage('userinfo') || {}
	        const resultData = await removeService({
	        	openid: userinfo.openid,
	        	uniqueid: this.buildList.filter(item => item.location ===  this.deleteIndex)[0].uniqueid
	        })
	        this.isBuild = false
	        this.buildList = this.buildList.filter(item => item.location !==  this.deleteIndex)
	        this.deleteIndex = -1
	        // this.getData()
		},
		hasbuildurl(_index) {
			if (!this.buildList.length) return ''
			return this.buildList.filter(item => item.location === _index)[0].prdname
		},
		async getStore(type) {
			const resultData = await shopListService({ type })
			if (resultData && resultData.data) {
				this.shopList = resultData.data
			}
		},

		async getMy(type) {
			
			const userinfo = storage.getStorage('userinfo') || {}
			const resultData = await myListService({ type, openid: userinfo.openid })
			if (resultData && resultData.data) {
				this.myList = resultData.data
			} else {
				this.myList = []
			}
		},
		async getData(from) {
			const userinfo = storage.getStorage('userinfo') || {}
			const resultData = await buildListService({openid: userinfo.openid})
			if (resultData && resultData.data) {
				const list = []
				let _buildList = JSON.parse(JSON.stringify(this.buildList))
				this.buildList.forEach(item => {
				 	list.push(item.location)
				})
				console.log(list, 'list')
				resultData.data.forEach(item => {
					// console.log(item.location)
					if(!list.includes(item.location)) {
						_buildList = [..._buildList, {
							...item,
							remainingShow: this.fromateTime(item.remaining)
						}]
					}
				})
				if (from === 'created') {
					console.log('_buildList===.>', _buildList)
					_buildList = _buildList.map(item => {
						if (item.remaining === 0) delete item.remaining
						return item
					})
				}
				
				this.buildList = _buildList
			} else {
				this.buildList = []
			}
		},
		showStore() {
			this.getStore(this.storeType)
			this.which='store'
		},
		showMy() {
			this.getMy(this.myType)
			this.which='my'
		},
		goCollect() {
	    	wx.redirectTo({ url: '/pages/collect/main' });
		},
	    //两点间距离公式
	    minRange(x1, y1, x2, y2) {
	      return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
	    },
		tStart(e, item) {
			console.log(888)
			console.log(this.tend, this.tentShow, this.imgDown)
			if (this.tentShow || this.imgDown) return
console.log(777)
			this.buildContent = item
			this.isBuild = true
			console.log(666, e, item)
		},
		tMove(e, item) {
			if (this.tentShow || this.imgDown) return

			this.which = ''
			let minVal = Infinity;
	        let _index = -1
	        //拿到两点之间最小的距离与菱形索引
	        this.positions.forEach(item => {
		        let result = this.minRange(e.clientX, e.clientY, item.x, item.y);
		        if (result < minVal) {
		            minVal = Number(result);
		            _index = item.index;
		        }
	        });
	        // 找到当前active索引
	        this.index = _index
	        // 当前位置是否为原本禁止区域，或者已经有建筑
	        if (this.forbidList.includes(_index) || this.hasBuild.includes(_index)) {
	            this.active = 'forbid'
	        } else {
	        	this.active = 'ok'
	        }
		},
		tEnd(e) {
			this.tend = true
			// this.isBuild = false
			console.log(10000, this.index)
		},
		openBuyPop(item) {
			this.buyContent = item
			this.buyOpen = true
			this.buyNum = 1
		},
		subNum() {
			if (this.buyNum <=1 ) {
				this.$tip.toast('不能在减少了哦')
				return
			}
			this.buyNum -= 1
		},
		addNum() {
			console.log(777)
			this.buyNum += 1
			console.log(this.buyNum)
		},
		async buyBuild() {
			const userinfo = storage.getStorage('userinfo') || {}
			const resultData = await buyService({
				openid: userinfo.openid,
				prdid: this.buyContent.prdid,
				prdname: this.buyContent.prdname,
				amount: this.buyNum
			})
			console.log('buy', resultData)
			if (resultData && resultData.errmsg) {
				this.$tip.toast(resultData.errmsg)
				return
			}
			this.$tip.toast(`您已成功购买${this.buyContent.prdname}${this.buyNum}个`)
			this.$store.dispatch('getIntergral')
			this.buyOpen = false
		},
		async confrimBuild(item) {
			console.log(item)
			const userinfo = storage.getStorage('userinfo') || {}
			const resultData = await buildService({
				openid: userinfo.openid,
				prdid: this.buildContent.prdid,
				prdname: this.buildContent.prdname,
				location: this.index
			})
			if (resultData && resultData.uniqueid) {
				 this.imgDown = true

				 setTimeout(()=>this.tentShow = true, 1000)
				 setTimeout(() => this.getData('add'), 3500)
				 // setTimeout(() => , 3000)
				 this.isBuild = false
				 setTimeout(() => {
				 	this.index = -1
				 	this.tentShow = false
				 	this.imgDown = false
				 	this.tend = false
				 	}, 4000)
				 
			}
		},
		 listenColseSocket() {
			this.socketTask.close()
			wx.onSocketClose(function(res){
			  console.log("WebSocket 已关闭！")
			})
	    },
	    pageReset() {
	    //	this.fadeIn = false
			this.positions= []
			this.shopList = []
			this.buildList = []
			this.myList = []
			this.imgDown=false
			this.tend =false
			this.index= -1 
			this.tentShow=false
			this.active=''
			this.isBuild = false
			this.which= ''
			// this.fadeIn= false
			this.storeType= 1
			this.myType = 1
			this.buyContent={
				url: '',
				cost: 0
			}
			this.buyOpen=false
			this.buyNum=1
			this.buildContent={}
			this.deleteIndex= -1
	    }
	},
	mounted() {
		this.fadeIn = true
		const query1 = wx.createSelectorQuery();
	      query1
	        .select(".area")
	        .boundingClientRect()
	        .exec(res1 => {
	          //获取菱形DOM
	          const query = wx.createSelectorQuery();
	          query.selectAll(".area-item").boundingClientRect();
	          query.exec(res=>{
	          	res[0].forEach((item, $index) => {
	          		this.positions.push({
	          			index: $index + 1,
	          			x: item.left + (item.width / 2),
	          			y: item.top + (item.height / 2)
	          		})
	          	})
	          });
	        });
	},
	// onUnload() {

	// },
	watch: {
		storeType: {
			handler(newVal, oldVal) {
				this.getStore(newVal)
			}
		},
		myType: {
			handler(newVal, oldVal) {
				this.getMy(newVal)
			}
		}
	},
	onHide() {
		console.log('onHideonHideonHide')
		this.listenColseSocket()
		// this.pageReset()
	},
	onUnload() {
		this.pageReset()
		this.fadeIn = false
	}
}
</script>
<style lang="less">
@import '~less/mixin.less';
@keyframes tentAnimation{
	0%{background-image: url("@{cdn}pl2_tent_00.png");}
	1%{background-image: url("@{cdn}pl2_tent_01.png");}
	2%{background-image: url("@{cdn}pl2_tent_02.png");}
	3%{background-image: url("@{cdn}pl2_tent_03.png");}
	4%{background-image: url("@{cdn}pl2_tent_04.png");}
	5%{background-image: url("@{cdn}pl2_tent_05.png");}
	6%{background-image: url("@{cdn}pl2_tent_06.png");}
	7%{background-image: url("@{cdn}pl2_tent_07.png");}
	8%{background-image: url("@{cdn}pl2_tent_08.png");}
	9%{background-image: url("@{cdn}pl2_tent_09.png");}
	10%{background-image: url("@{cdn}pl2_tent_10.png");}
	11%{background-image: url("@{cdn}pl2_tent_11.png");}
	12%{background-image: url("@{cdn}pl2_tent_12.png");}
	13%{background-image: url("@{cdn}pl2_tent_13.png");}
	14%{background-image: url("@{cdn}pl2_tent_14.png");}
	15%{background-image: url("@{cdn}pl2_tent_15.png");}
	16%{background-image: url("@{cdn}pl2_tent_16.png");}
	17%{background-image: url("@{cdn}pl2_tent_17.png");}
	18%{background-image: url("@{cdn}pl2_tent_18.png");}
	19%{background-image: url("@{cdn}pl2_tent_19.png");}
	20%{background-image: url("@{cdn}pl2_tent_20.png");}
	21%{background-image: url("@{cdn}pl2_tent_21.png");}
	22%{background-image: url("@{cdn}pl2_tent_22.png");}
	23%{background-image: url("@{cdn}pl2_tent_23.png");}
	24%{background-image: url("@{cdn}pl2_tent_24.png");}
	25%{background-image: url("@{cdn}pl2_tent_25.png");}
	26%{background-image: url("@{cdn}pl2_tent_26.png");}
	27%{background-image: url("@{cdn}pl2_tent_27.png");}
	28%{background-image: url("@{cdn}pl2_tent_28.png");}
	29%{background-image: url("@{cdn}pl2_tent_29.png");}
	30%{background-image: url("@{cdn}pl2_tent_30.png");}
	
	31%{background-image: url("@{cdn}pl2_tent_00.png");}
	32%{background-image: url("@{cdn}pl2_tent_01.png");}
	33%{background-image: url("@{cdn}pl2_tent_02.png");}
	34%{background-image: url("@{cdn}pl2_tent_03.png");}
	35%{background-image: url("@{cdn}pl2_tent_04.png");}
	36%{background-image: url("@{cdn}pl2_tent_05.png");}
	37%{background-image: url("@{cdn}pl2_tent_06.png");}
	38%{background-image: url("@{cdn}pl2_tent_07.png");}
	39%{background-image: url("@{cdn}pl2_tent_08.png");}
	40%{background-image: url("@{cdn}pl2_tent_09.png");}
	41%{background-image: url("@{cdn}pl2_tent_10.png");}
	42%{background-image: url("@{cdn}pl2_tent_11.png");}
	43%{background-image: url("@{cdn}pl2_tent_12.png");}
	44%{background-image: url("@{cdn}pl2_tent_13.png");}
	45%{background-image: url("@{cdn}pl2_tent_14.png");}
	46%{background-image: url("@{cdn}pl2_tent_15.png");}
	47%{background-image: url("@{cdn}pl2_tent_16.png");}
	48%{background-image: url("@{cdn}pl2_tent_17.png");}
	49%{background-image: url("@{cdn}pl2_tent_18.png");}
	50%{background-image: url("@{cdn}pl2_tent_19.png");}
	51%{background-image: url("@{cdn}pl2_tent_20.png");}
	52%{background-image: url("@{cdn}pl2_tent_21.png");}
	53%{background-image: url("@{cdn}pl2_tent_22.png");}
	54%{background-image: url("@{cdn}pl2_tent_23.png");}
	55%{background-image: url("@{cdn}pl2_tent_24.png");}
	56%{background-image: url("@{cdn}pl2_tent_25.png");}
	57%{background-image: url("@{cdn}pl2_tent_26.png");}
	58%{background-image: url("@{cdn}pl2_tent_27.png");}
	59%{background-image: url("@{cdn}pl2_tent_28.png");}
	60%{background-image: url("@{cdn}pl2_tent_29.png");}
	61%{background-image: url("@{cdn}pl2_tent_30.png");}
	62%{background-image: url("@{cdn}pl2_tent_00.png");}
	63%{background-image: url("@{cdn}pl2_tent_01.png");}
	64%{background-image: url("@{cdn}pl2_tent_02.png");}
	65%{background-image: url("@{cdn}pl2_tent_03.png");}
	66%{background-image: url("@{cdn}pl2_tent_04.png");}
	67%{background-image: url("@{cdn}pl2_tent_05.png");}
	68%{background-image: url("@{cdn}pl2_tent_06.png");}
	69%{background-image: url("@{cdn}pl2_tent_07.png");}
	70%{background-image: url("@{cdn}pl2_tent_08.png");}
	71%{background-image: url("@{cdn}pl2_tent_09.png");}
	72%{background-image: url("@{cdn}pl2_tent_10.png");}
	73%{background-image: url("@{cdn}pl2_tent_11.png");}
	74%{background-image: url("@{cdn}pl2_tent_12.png");}
	75%{background-image: url("@{cdn}pl2_tent_13.png");}
	76%{background-image: url("@{cdn}pl2_tent_14.png");}
	77%{background-image: url("@{cdn}pl2_tent_15.png");}
	78%{background-image: url("@{cdn}pl2_tent_16.png");}
	79%{background-image: url("@{cdn}pl2_tent_17.png");}
	80%{background-image: url("@{cdn}pl2_tent_18.png");}
	81%{background-image: url("@{cdn}pl2_tent_19.png");}
	82%{background-image: url("@{cdn}pl2_tent_20.png");}
	83%{background-image: url("@{cdn}pl2_tent_21.png");}
	84%{background-image: url("@{cdn}pl2_tent_22.png");}
	85%{background-image: url("@{cdn}pl2_tent_23.png");}
	86%{background-image: url("@{cdn}pl2_tent_24.png");}
	87%{background-image: url("@{cdn}pl2_tent_25.png");}
	88%{background-image: url("@{cdn}pl2_tent_26.png");}
	89%{background-image: url("@{cdn}pl2_tent_27.png");}
	90%{background-image: url("@{cdn}pl2_tent_28.png");}
	91%{background-image: url("@{cdn}pl2_tent_29.png");}
	92%{background-image: url("@{cdn}pl2_tent_30.png");}
	93%{background-image: url("@{cdn}pl2_tent_00.png");}
	94%{background-image: url("@{cdn}pl2_tent_01.png");}
	95%{background-image: url("@{cdn}pl2_tent_02.png");}
	96%{background-image: url("@{cdn}pl2_tent_03.png");}
	97%{background-image: url("@{cdn}pl2_tent_04.png");}
	98%{background-image: url("@{cdn}pl2_tent_05.png");}
	99%{background-image: url("@{cdn}pl2_tent_06.png");}
	100%{background-image: url("@{cdn}pl2_tent_07.png");}
}
@keyframes tentLine{
	from{width:0;}
	to{width:100%;}
}
	.build-wrap{
		.opacity0-tent{
			animation: tentAnimation 3s infinite;
		}
		overflow:hidden;
		background: url("@{cdn}pl2_build-bg.jpg")  0 0 repeat;
    	background-size: 100% auto;
		position:absolute;
		height:100%;
		width:100%;
		left:0;
		top:0;
		.cloud{
			height:100%;
			width:100%;
			position:absolute;
			.bg("pl2_cloud");
		}
		.button{
			transition: 1s;
			position:absolute;
			width:67px;
			height:57px;
			
			&.collect-energy{
				left:-70px;
				top:98px;
				.bg("pl2_collection@2x@2x");
			}
			&.hunting-button{
				right:-70px;
				top:98px;
				.bg("pl2_hunting@2x");
			}
			&.friend-button{
				right:-70px;
				top:159px;
				.bg("pl2_friend@2x");				
			}
			&.fade-left-in{
				left:0;
			}
			&.fade-right-in{
				right:0;
			}
		}
		.build-store{
			position:absolute;
			width:103px;
			height:73px;
			bottom:13px;
			left:80px;
			.bg("pl2_Building_shop@2x");
		}
		.build-my{
			position:absolute;
			width:99px;
			height:73px;
			bottom:13px;
			right:83px;
			.bg("pl2_Warehouse@2x");
		}
		.area{
			
			width:750rpx;
			height:684rpx;
			top:360rpx;
			position:absolute;
			left:0;
			.mark{
				position:absolute;
				left:0;
				top:0;
				height:100%;
				width:100%;
				.bg("pl2_area@2x");
				background: url("@{cdn}pl2_area@2x.png")  center center no-repeat;
				background-size: cover;
				&.noBg{
					background: none;
				}
			}
			
			.area-item{
				
				width:232rpx;
				height: 76rpx;
				position: absolute;
				// &.action{
				// 	z-index:2;
				// }
				&.item1{
					left:259rpx;
					top:0;
				}
				&.item2, &.item3{
					top:38rpx;
				}
				&.item4, &.item5, &.item6{
					top:76rpx;
				}
				&.item7, &.item8, &.item9, &.item10{
					top:114rpx;
				}
				&.item11, &.item12, &.item13{
					top:152rpx;
				}
				&.item14, &.item15, &.item16, &.item17{
					top:190rpx;
				}
				&.item18, &.item19, &.item20 {
					top:228rpx;
				}
				&.item21, &.item22, &.item23, &.item24{
					top:266rpx;
				}
				&.item25, &.item26, &.item27{
					top:304rpx;
				}
				&.item28, &.item29, &.item30, &.item31{
					top:342rpx;
				}
				&.item32, &.item33, &.item34{
					top:380rpx;
				}
				&.item35, &.item36, &.item37, &.item38{
					top:418rpx;
				}
				&.item39, &.item40, &.item41{
					top:456rpx;
				}
				&.item42, &.item43, &.item44, &.item45{
					top:494rpx;
				}
				&.item46, &.item47, &.item48{
					top:532rpx;
				}
				&.item49, &.item50{
					top:570rpx;
				}
				&.item51{
					top:608rpx;
				}
				&.item2, &.item8, &.item15, &.item22, &.item29, &.item36, &.item43, &.item49{
					left:143rpx;
				}
				&.item3, &.item9, &.item16, &.item23, &.item30, &.item37, &.item44, &.item50{
					left:375rpx;
				}
				&.item4, &.item11, &.item18, &.item25, &.item32, &.item39, &.item46{
					left:27rpx;
				}
				&.item6, &.item13, &.item20, &.item27, &.item34, &.item41, &.item48{
					left:491rpx;
				}
				&.item7, &.item14, &.item21, &.item28, &.item35, &.item42{
					left:-89rpx;
				}
				&.item10, &.item17, &.item24, &.item31, &.item38, &.item45{
					left:607rpx;
				}
				.build-content{
			//		z-index:60;
					position: absolute;
					left:0;
					top:0;
					width:100%;
					height:100%;
					.confirm{
							z-index:10;
							.bg("pl2_do@2x");
							width:33rpx;
							height:33rpx;
							position:absolute;
							right:10rpx;
							top:0;
						}
						.cancel{
							z-index:10;
							.bg("pl2_don't@2x");
							width:33rpx;
							height:33rpx;
							position:absolute;
							right:10rpx;
							bottom:0;
						}
					&.activeGreen{
						.bg("pl2_build_green");
					}
					&.activeRed{
						.bg("pl2_build_red");
					}
					.build-one{
						width:100%;
						height:100%;
						position:absolute;
						left:0;
						top:0;
						img{
							position:absolute;
							left:50%;
							top:50%;
							width:127rpx;
							height:80rpx;
							transform:translate(-50%,-50%);
							&.build-img{
								top:-1500rpx;
							}
							&.down{
								transition: 1s;
								top:50%;
							}
						}
						
					}
					.tent{
						z-index:60;
						// display:none;
						position:absolute;
						background-size:cover;
						background-origin:center center;
						background-repeat: no-repeat;
						background-color:transparent;
						animation: tentAnimation 3s ease infinite;
						// background-image: url("@{cdn}pl2_tent_00.png");
						top:0;
						left:50%;
						height:300rpx;
						width:300rpx;
						transform:translate(-50%,-50%);
						.progress{
							// display:none;
							position:absolute;
							width:70rpx;
							height:14rpx;
							border: 4rpx solid #000;
							border-radius:12rpx;
							background:#fff;
							overflow:hidden;
							left:50%;
							top:60%;
							transform:translateX(-50%);
							.line{
								background:#fff000;
								height:100%;
								animation: tentLine 3s ease normal;
							}
						}
					}
				}
			}
			.finish-list{
				.time-remaing{
					position:absolute;
					left:50%;
					bottom:5px;
					color: #fff;
					transform: translateX(-50%);
					//border: 3rpx solid #000;
					border-radius:6px;
					width:45px;
					height:20rpx;
					text-align:center;
					font-size:12rpx;
					line-height:20rpx;
				//	z-index:100;
					background:rgba(0, 0, 0, 0.5);
				}
				.energy{
					z-index:10;
					width:20px;
					height:20px;
					position:absolute;
					left:50%;
					transform:translateX(-50%);
					opacity:0;
					bottom:-10%;
					// .bg("pl2_ball_yellow@2x");
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
					&.borth{
						transition: 0.5s;
						opacity:1;
						bottom: 60%;
					}
					&.hasborth{
						opacity:1;
						bottom: 60%;
					}
					// &.collect{
					// 	transition:0.5s;
					// 	position: fixed;
					// 	left:67rpx;
					// 	top: 256rpx;
					// }
				}
				
			}
		}
		.pop-up-bottom{
			z-index:65;
			transition: 0.5s;
			position: absolute;
			bottom:-100%;
			left:0;
			height:711rpx;
			width:100%;
 
			&.fadeUp{
				bottom:0;
			}
			.common{
				.bg("pl2_buildingshop");
				padding: 128rpx 0 0 40rpx;
				// overflow-y: auto;
				position: absolute;
				bottom:0;
				left:50%;
				transform:translateX(-50%);
				width:712rpx;
				height:711rpx;
				box-sizing: border-box;
				.titles{
					display: flex;
					padding-right:40rpx;
					justify-content: space-between;

					.title-item{
						width:163rpx;
						height:44rpx;
						font-size:24rpx;
						text-align:center;
						line-height:44rpx;
						background:rgba(0,0,0,1);
						border-radius:9rpx;
						opacity:0.36;
						color:#fff;
						&.active{
							background:rgba(255,247,121,1);
							opacity:1;
							color:#000;
						}
					}
				}
				.list{
					// display: flex;
					// flex-wrap: wrap;
					// align-items:flex-start;
					// justify-content:space-between;
					overflow-y: auto;
					height: 516rpx;
					.list-item{
						float:left;
						margin-right:18rpx;
						width:144rpx;
						height:144rpx;
						background:rgba(191,191,191,0.36);
						border-radius:33rpx;
						margin-top:26rpx;
						position: relative;
						
						&div:nth-child(4n+0){
							margin-right:0;
						}
						img{
							position: absolute;
							left:50%;
							top:50%;
							transform: translate(-50%, -50%);
							height:50%;
							width:50%;
						}
						.energy-img{
							position: absolute;
							width:33rpx;
							height:33rpx;
							border-radius: 50%;
							left:30rpx;
							top:30rpx;
						}
						.num{
							font-size:21rpx;
							color:rgba(108,108,108,1);
							position:absolute;
							bottom:5rpx;
							left:50%;
							transform:translateX(-50%);
						}
						.cost{
							position: absolute;
							bottom:5rpx;
							left:50%;
							transform: translateX(-50%);
							display: flex;
							align-items: flex-end;
							.icon{
								.bg("pl2_energy");
								width:15rpx;
								height:20rpx;
								margin-right: 8rpx;
							}
							.money{
								// line-height: 34rpx;
								color: #ffad01;
								font-size:16rpx;
							}

						}
					}
				}
				&.my{
					.bg("pl2_warehouse");
				}
			}
		}
		.buy-pop{
			z-index:80;
			position:absolute;
			left:0;
			height:0;
			height:100%;
			width:100%;
			.buy-wrap{
				.bg("pl2_buy_bg");
				width: 566rpx;
				height:856rpx;
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%, -50%);
				.close{
					.bg("pl2_buy_close");
					width:58rpx;
					height:58rpx;
					position:absolute;
					right:-20rpx;
					top:-20rpx;
				}
				.content{
					width:190rpx;
					margin:89rpx auto 84rpx;
					img{
						border:8rpx solid #eee;
						border-radius:50%;
						height:190rpx;
						width:190rpx;
					}
					.name{
						font-size:24rpx;
						margin-top:30rpx;
						text-align:center;
					}
					.money{
						display:flex;
						justify-content:center;
						margin-top:15rpx;
						.icon{
							.bg("pl2_energy");
							width:15rpx;
							height:20rpx;
							margin-right: 8rpx;
						}
						.cost{
							// line-height: 34rpx;
							color: #ffad01;
							font-size:16rpx;
						}
					}
				}
				.num-wrap{
					padding: 0 139rpx;
					display:flex;
					justify-content:space-between;
					.sub{
						.bg("pl2_buy_sub");
						width:42rpx;
						height:42rpx;
					}
					.num{
						font-size:38rpx;
						// line-height:42rpx;
					}
					.add{
						.bg("pl2_buy_add");
						width:42rpx;
						height:42rpx;
					}
				}
				.total{
					margin:128rpx 0 50rpx;
					display:flex;
					justify-content:center;
					font-size:24rpx;
					.icon{
						.bg("pl2_energy");
						width:17rpx;
						height:25rpx;
						margin-left:10rpx;
						margin-right: 8rpx;
					}
					.cost{
						// line-height: 34rpx;
						color: #ffad01;
						font-size:24rpx;
					}
				}
				.buy-btn{
					.bg("pl2_buy_confirm");
					width:170rpx;
					height:89rpx;
					margin: 50rpx auto 0;
					font-size:30rpx;
					line-height:80rpx;
					text-align:center;
				}
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
	}
</style>