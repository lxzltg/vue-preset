// const publicPath = '/'
// const api = `${publicPath}api`

module.exports = {
  lintOnSave: true,
  chainWebpack(config) {
    const FILE_RE = /\.(vue|js|ts|svg)$/
    config.module.rule('svg').issuer(file => !FILE_RE.test(file))
    config.module
      .rule('svg-component')
      .test(/\.svg$/)
      .issuer(file => FILE_RE.test(file))
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')
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
    // proxy: {
    //   [api]: {
    //     target: '',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       [`^${api}`]: ''
    //     }
    //   }
    // }
  }
}
