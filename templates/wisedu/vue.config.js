const context = ''
module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? `${context}/static` : '/',
  chainWebpack(config) {
    const FILE_RE = /\.(vue|js|ts|svg)$/
    config.module.rule('svg').issuer(file => !FILE_RE.test(file))
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .use('svg-sprite')
      .loader('svg-sprite-loader')
    config.module
      .rule('wec-frame')
      .test(/\.js$/)
      .include
      .add(/wec-frame/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env', { modules: false }]
        ]
      })
  },
  devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      [context]: {
        target: process.env.VUE_APP_XXX
      }
    }
  }
}
