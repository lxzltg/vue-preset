const publicPath = '/'
const api = `${publicPath}api`

module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      [api]: {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          [`^${api}`]: ''
        }
      }
    }
  }
}
