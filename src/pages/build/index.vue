<template>
	<div class="build-wrap">
		<div class="cloud"></div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		share>
  		</CommonTop>
  		<div @click="goCollect" class="button collect-energy" :class="{'fade-left-in': fadeIn}"  ></div>
		<div class="button hunting-button" :class="{'fade-right-in': fadeIn}" ></div>
		<div class="button friend-button"  :class="{'fade-right-in': fadeIn}" ></div>
		<div class="build-store" @click="showStore"></div>
		<div class="build-my" @click="showMy"></div>
 		
 		<!-- 建造区 -->
		<div class="area" :class="{noBg : !isBuild}" >
			<div class="area-item item1" :class="'item' + ($index+1)"  v-for="(item, $index) in 51" :key="$index" style="text-align: center;line-height: 38px;">
				<div class="build-content" :class="{
					'activeGreen': index === ($index +1) && active === 'ok',
					'activeRed': index === $index +1 && active === 'forbid'
				}" > 
					<div class="build-one" v-if="true">
						<img :src="'http://parkiland.isxcxbackend1.cn/pl2_造山.png'"/>
						<div class="tent">
							<div class="progress"></div>
						</div>
						<div class="confirm"></div>
						<div class="cancel"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 建造--选择区域 -->
		<div class="pop-up-bottom" :class="{fadeUp: which === 'store'}">
<!-- 			<div class="mask" @click="which=''"></div> -->
			<div class="store common">
				<div class="titles">
					<div class="title-item" :class="{active: storeType === 1}" @click="storeType = 1">建筑</div>
					<div class="title-item" :class="{active: storeType === 2}" @click="storeType = 2">Parki建筑</div>
					<div class="title-item" :class="{active: storeType === 3}" @click="storeType = 3">自然</div>
				</div>
				<div class="list">
					<div class="list-item" v-for="(item, $index) in shopList" :key="$index" @click="openBuyPop(item)">
						<img :src="'http://parkiland.isxcxbackend1.cn/pl2_'+item.prdname+'.png'"  />
						<div class="cost">
							<div class="icon"></div>
							<div class="money">{{item.cost}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pop-up-bottom" :class="{fadeUp: which === 'my'}">
		<!-- 	<div class="mask" @click="which=''"></div> -->
			<div class="my common">
				<div class="titles">
					<div class="title-item" :class="{active: myType === 1}" @click="myType = 1">建筑</div>
					<div class="title-item" :class="{active: myType === 2}" @click="myType = 2">Parki建筑</div>
					<div class="title-item" :class="{active: myType === 3}" @click="myType = 3">自然</div>
				</div>
				<div class="list">
					<div class="list-item" 
						v-for="(item, $index) in myList"
						:key="$index"
						@touchstart="e => tStart(e, item)"
			            @touchmove="e => tMove(e, item)"
			            @touchend="e => tMove(e, item)"> 	
						<img :src="'http://parkiland.isxcxbackend1.cn/pl2_'+item.prdname+'.png'"  />
						<div class="num">{{item.amount}}</div>
			        </div>
				</div>
			</div>
		</div>
		<div class="buy-pop" v-if="buyOpen">
			<div class="mask"></div>
			<div class="buy-wrap">
				<div class="close" @click="buyOpen = false"></div>
				<div class="content">
					<img :src="'http://parkiland.isxcxbackend1.cn/pl2_'+buyContent.prdname+'.png'" />
					<div class="name">蘑菇屋</div>
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
	</div>
</template>
<script>
import CommonTop from 'components/top'
import storage from 'utils/storage'
import { shopListService, myListService, buildService, removeService, buildListService, buyService } from 'services/build'
export default {
	data() {
		return {
			positions: [],
			hasBuild: [],
			shopList: [],
			myList: [],
			index: -1,
			active: '',
			isBuild: true,
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
			buildContent: {}
		}
	},
	components: { CommonTop },
	methods: {
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
			}
		},
		showStore() {
			this.getStore(1)
			this.which='store'
		},
		showMy() {
			this.getMy(1)
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
			this.buildContent = item
			this.isBuild = true
			console.log(666, e, item)
		},
		tMove(e, item) {
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
			console.log(10000)
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
			if (resultData && resultData.errmsg) {
				this.$top.toast(resultData.errmsg)
				return
			}
			this.buyOpen = false
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
	onUnload() {
		this.fadeIn = false
	},
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
	}
}
</script>
<style lang="less">
@import '~less/mixin.less';
	.build-wrap{
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
				top:108px;
				.bg("pl2_collection@2x@2x");
			}
			&.hunting-button{
				right:-70px;
				top:108px;
				.bg("pl2_hunting@2x");
			}
			&.friend-button{
				right:-70px;
				top:179px;
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
			.bg("pl2_area@2x");
			background: url("@{cdn}pl2_area@2x.png")  center center no-repeat;
			background-size: cover;
			width:750rpx;
			height:684rpx;
			top:350rpx;
			position:absolute;
			left:0;
			&.noBg{
				background: none;
			}
			.area-item{
				
				width:232rpx;
				height: 76rpx;
				position: absolute;
				
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
					position: absolute;
					left:0;
					top:0;
					width:100%;
					height:100%;
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
							width:60%;
							height:60%;
							transform:translate(-50%,-50%);
						}
					}
				}
			}
		}
		.pop-up-bottom{
			z-index:35;
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
					display: flex;
					flex-wrap: wrap;
					overflow-y: auto;
					height: 516rpx;
					.list-item{
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
							top:40%;
							transform: translate(-50%, -50%);
							height:60%;
							width:60%;
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
			z-index:50;
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
	}
</style>