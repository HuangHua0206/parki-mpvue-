<template>
  <div class="beat-boss-wrap">
    <div class="top">
      <div class="avatar">
        <img :src="avatar" />
      </div>
      <div class="nums">
        <div class="left-num"></div>
        <div class="right-num"></div>
      </div>
    </div>
    <div class="attention">
      <p>点击屏幕攻击怪兽，一起保护PRAKINLAND.</p>
    </div>
    <div class="main">
      <div class="collect-btn"></div>
      <div class="blood">
        <div class="blood-view"></div>
        <div class="countdown"></div>
      </div>
    </div>
    <div class="info"></div>
  </div>
</template>
<script>
// Use Vuex
const imgOrigin = 'http://parkiland.isxcxbackend1.cn/'
const DEFAULT_AVATER = imgOrigin + 'pl2_head@2x.png'
export default {
	data () {
	  return {
	    avatar: DEFAULT_AVATER
	  }
	}
}
</script>

<style  lang="less">
 @imgOrigin: "http://parkiland.isxcxbackend1.cn/";
  .beat-boss-wrap{
    height: 100%;
    position: absolute;
    width:100%;
    background: url("@{imgOrigin}pl2_boss-background@2x.png") center center #ffffff no-repeat;
    background-size: cover;
    padding:5px 20px 0 10px;   
    .top{
        .avatar{
        	height: 50px;
        	width: 50px;
        	img{
	          height: 100%;
	          width: 100%;
	          border-radius: 50%;
	        }
        }
    }
  }
</style>