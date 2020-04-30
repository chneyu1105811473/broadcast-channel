<template>
  <div class="home">
    <div class="search-container">
      <Search v-model="value" :placeholder="`当前频道所属国家：${currentCountry}`" show-action>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </Search>
    </div>
    <div class="play-container">
      <div class="side-bar">
        <Sidebar v-model="currentBar" @change="changeBar">
          <SidebarItem v-for="(item,index) in channels.list" :key="index" :title="item.name"/>
        </Sidebar>
      </div>

      <div class="player">
        <video-player
        class="video-player"
        :playsinline="true"
        :options="playerOpt"
        @ready="playerReadied" />
      </div>
    </div>
    <div class="footer">
      <Divider>copyright 小鱼酱yummy</Divider>
    </div>  
    

    <!-- 弹出选项 -->
    <Popup v-model="show" closeable class="mypop">
      <div class="country-list">
        <Cell v-for="(item,index) in matchedCty" :key="index" @click="getList(item)">{{item}}</Cell>
        <Divider>{{matchedCty.length?'我是有底线的':'没有匹配的国家'}}</Divider>
      </div>
    </Popup>
  </div>
</template>

<script>
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import {Search,Popup,Cell,SidebarItem,Sidebar,Divider} from 'vant'
const allCountries = require('../utils/country.json')

export default {
  name: 'Home',
  components:{videoPlayer,Search,Popup,Cell,SidebarItem,Sidebar,Divider},
  data(){
    return {
      allCountries,
      playerOpt:{
        autoplay: false, // 是否自动播放
        muted: true, // 是否静音
        controls:true,//显示控制条
        language: 'zh-CN',
        preload: 'auto',
        loop:false,
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://ivi.bupt.edu.cn/hls/cctv14.m3u8'
        }],
        // techOrder: ['html5'], // 文件类型
        html5: {hls: {withCredentials: false}},
        flash: {hls: {withCredentials: false}},
        fluid: true, // 宽高自适应
        poster: '', //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: { // 底部按钮配置
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      value:'',
      matchedCty:[],
      show:false,
      currentBar:0,
      currentCountry:'China'
    }
  },
  created(){
    //默认获取的是中国的频道
    this.getList(this.currentCountry)
  },
  methods:{
    playerReadied(player) {
      // var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        return options
      }
    },
    onCancel(){
      this.value = ''
    },
    onSearch(){
      this.matchedCty = this.allCountries.filter(item=>{
        const reg = new RegExp(`${this.value}`,'i')
        return reg.test(item)
      })
      this.show = true
    },
    getList(countryName='China',index=0){
      this.currentCountry = countryName
      this.channels = require(`../common/data/${countryName}.json`)
      this.playerOpt.sources[0].src = this.channels.list[index].url
      this.playerOpt.poster = this.channels.list[index].tvg.logo
      this.show = false
    },
    changeBar(index){
      this.getList(this.currentCountry,index)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container{
  padding: 20px;
  display: flex;
  justify-content: center;
}
.play-container{
  display: flex;
  .side-bar{
    max-height: 80vh;
    overflow: auto;
  }
  .player{
    flex: 1;
    padding: 0 20px;
    max-width: 1200px;
  }
}
.country-list{
  min-width: 500px;
  max-width: 80%;
  max-height: 80vh;
  overflow: auto;
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 0 20px;
}
</style>