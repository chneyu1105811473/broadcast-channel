module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/common/css/index.scss";'
      }
    }
  },
  devServer:{
    proxy:{
      '/api':{
        target:'http://sma.dev.pagoda.com.cn',
        changeOrigin:true,
        pathRewrite: {
          '^/api':''
        },
      }
    }
  }
}
