module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/common/css/index.scss";'
      }
    }
  }
}
