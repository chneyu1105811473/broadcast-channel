<template>
  <div class="home">
    <!-- <div class="play-container" v-for="(channel,index) in playlist" :key="index">
      <h5 class="title">{{channel.title}}</h5>
      <div class="play-content">
        <div class="player" v-for="item in channel.list" :key="item.url"> -->
          <video-player
          class="video-player"
          :playsinline="true"
          :options="baseOpt"
          ></video-player>
        <!-- </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
const channels = require('../common/data/channels.json')

export default {
  name: 'Home',
  components:{videoPlayer},
  data(){
    return {
      baseOpt:{
        autoplay: false, // 是否自动播放
        muted: true, // 是否静音
        controls:true,//显示控制条
        language: 'zh-CN',
        preload: 'auto',
        loop:false,
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        sources: [{
          type: 'application/x-mpegURL',
          src: 'http://121.31.30.90:8085/ysten-business/live/cctv-12/yst.m3u8'
        }],
        // techOrder: ['html5'], // 文件类型
        html5: {
          hls: {
            withCredentials: true
          }
        },
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
      pageSize:1,
      pageNum:1
    }
  },
  computed:{
    playlist(){
      const chinalist = channels.filter(item=>item.title.includes('China'))
      return chinalist.slice(this.pageSize*(this.pageNum-1),this.pageSize*this.pageNum)
    }
  },
  methods:{
    setPlayerOpt(item){
      const opt = {
        poster:item.tvg.logo,
        source:[{
          type:'application/x-mpegURL',
          src:item.url
        }]
      }
      const currentOpt = {...this.baseOpt,...opt}
      return currentOpt
    }
  }
}
</script>
