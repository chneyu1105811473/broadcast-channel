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
const coutries = []
files.forEach(item=>{
  // 将解析的m3u8链接写入src的common/data目录下
  const content = {
    title:item.name,
    list:parsePlaylist(item.url).items
  }
  const filename = item.name.replace(/\r/,'')
  coutries.push(filename)
  fs.writeFileSync(path.join(__dirname,`../src/common/data/${filename}.json`),JSON.stringify(content))
})

fs.writeFileSync(path.join(__dirname,`../src/utils/country.json`),JSON.stringify(coutries))







