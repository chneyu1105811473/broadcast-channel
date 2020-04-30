// const ffmpeg = require('fluent-ffmpeg')
const parser = require('iptv-playlist-parser')
const fs = require('fs')
const path = require('path')

function parsePlaylist(filepath){
  const playlist = fs.readFileSync(path.resolve(__dirname,filepath),{encoding:'utf-8'})
  return parser.parse(playlist)
}

const result = parsePlaylist('./index.m3u')
const files = result.items

const output = []
files.forEach(item=>{
  output.push({
    title:item.name,
    list:parsePlaylist(item.url).items
  })
})

// 将目录写入src的common/data目录下
fs.writeFileSync(path.resolve(__dirname,'../src/common/data/channels.json'),JSON.stringify(output))






