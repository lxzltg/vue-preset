// const publicPath = '/'
// const api = `${publicPath}api`

module.exports = {
  lintOnSave: true,
  chainWebapck(config) {
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
