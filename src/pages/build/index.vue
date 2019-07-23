<template>
	<div class="build-wrap">
		<div class="cloud"></div>
		<CommonTop 
	  		ctxt="搜集三个不同颜色的能量即可获得积分，记住是三个不同颜色哦！"
	  		:leftNum="9999"
	  		share>
  		</CommonTop>
  		<div @click="goCollect" class="button collect-energy" :class="{'fade-left-in': fadeIn}"  ></div>
		<div class="button hunting-button" :class="{'fade-right-in': fadeIn}" @touchstart="tStart"
            @touchmove="tMove"
            @touchend="tEnd"></div>
		<div class="button friend-button"  :class="{'fade-right-in': fadeIn}" ></div>
		<div class="build-store" @click="which='store'"></div>
		<div class="build-my" @click="which='my'"></div>
 		
 		<!-- 建造区 -->
		<div class="area" :class="{noBg : !isBuild}" >
			<div class="area-item item1" :class="'item' + ($index+1)"  v-for="(item, $index) in 51" style="text-align: center;line-height: 38px;">
				<div class="build-content" :class="{
					'activeGreen': index === ($index +1) && active === 'ok',
					'activeRed': index === $index +1 && active === 'forbid'
				}" >{{$index+1}}</div>
			</div>
		</div>

		<!-- 建造--选择区域 -->
		<div class="pop-up-bottom" :class="{fadeUp: which === 'store'}">
<!-- 			<div class="mask" @click="which=''"></div> -->
			<div class="store common">
				<div class="titles">
					<div class="title-item" :class="{active: store.type === 'build'}" @click="store.type = 'build'">建筑</div>
					<div class="title-item" :class="{active: store.type === 'parki-build'}" @click="store.type = 'parki-build'">Parki建筑</div>
					<div class="title-item" :class="{active: store.type === 'nature'}" @click="store.type = 'nature'">自然</div>
				</div>
				<div class="list">
					<div class="list-item"></div>
					<div class="list-item"></div>
					<div class="list-item"></div>
					<div class="list-item"></div>
					<div class="list-item"></div>
				</div>
			</div>
		</div>
		<div class="pop-up-bottom" :class="{fadeUp: which === 'my'}">
		<!-- 	<div class="mask" @click="which=''"></div> -->
			<div class="my common">
				<div class="titles">
					<div class="title-item" :class="{active: store.type === 'build'}" @click="store.type = 'build'">建筑</div>
					<div class="title-item" :class="{active: store.type === 'parki-build'}" @click="store.type = 'parki-build'">Parki建筑</div>
					<div class="title-item" :class="{active: store.type === 'nature'}" @click="store.type = 'nature'">自然</div>
				</div>
				<div class="list">
					<div class="list-item"></div>
					<div class="list-item"></div>
					<div class="list-item"></div>
					<div class="list-item"></div>
					<div class="list-item"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import CommonTop from 'components/top'
export default {
	data() {
		return {
			positions: [],
			index: 34,
			active: 'ok',
			isBuild: false,
			which: '',
			fadeIn: false,
			store: {
				type: 'build'
			}
		}
	},
	components: { CommonTop },
	methods: {
		goCollect() {
	    	wx.redirectTo({
				url: '/pages/collect/main'
			});
		},
		// 找到最近的那一个区块
		getMinOne(left, top) {
	      let minVal = Infinity;
	      let currentActive = -1;
	      let itemCache = {};
	      //拿到两点之间最小的距离与菱形索引
	      this.positions.forEach(item => {
	        let result = this.minRange(left, top, item.x, item.y);
	        if (result < minVal) {
	          minVal = Number(result);
	          this.index = item.index;
	          this.active = 'ok'
	        }
	      });
	      return { currentActive, itemCache };
	    },
	    //两点间距离公式
	    minRange(x1, y1, x2, y2) {
	      return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
	    },
		tStart() {
			console.log(666)
		},
		tMove(e) {
			console.log(e)
			console.log(888)
			this.getMinOne(e.clientX, e.clientY)
			// this.X = e.clientX
			// this.Y = e.clientY
		},
		tEnd() {
			console.log(10000)
		},
	},
	mounted() {
		console.log(999)
		this.fadeIn = true
		const query1 = wx.createSelectorQuery();
	      query1
	        .select(".area")
	        .boundingClientRect()
	        .exec(res1 => {
	          console.log(res1[0], 'res1[0]')
	          //获取菱形DOM
	          const query = wx.createSelectorQuery();
	          query.selectAll(".area-item").boundingClientRect();
	          query.exec(res=>{
	          	console.log(res, 'ppp')
	          	res[0].forEach((item, $index) => {
	          		console.log(item, $index, 'ooo')
	          		this.positions.push({
	          			index: $index + 1,
	          			x: item.left + (item.width / 2),
	          			y: item.top + (item.height / 2)
	          		})
	          	})
	          	 console.log(this.positions)
	          });
	        });
	      console.log(this.positions, ' console.log(this.positions)')  
	},
	onUnload() {
		this.fadeIn = false
	},
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
				padding: 128rpx 40rpx;
				overflow-y: auto;
				position: absolute;
				bottom:0;
				left:50%;
				transform:translateX(-50%);
				width:712rpx;
				height:711rpx;
				box-sizing: border-box;
				.titles{
					display: flex;
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
					justify-content: space-between;
					flex-wrap: wrap;
					.list-item{
						width:144rpx;
						height:144rpx;
						background: #BFBFBF;
						border-radius:33rpx;
						opacity:0.36;
						margin-top:26rpx;
					}
				}
				&.my{
					.bg("pl2_warehouse");
				}
			}
		}
	}
</style>