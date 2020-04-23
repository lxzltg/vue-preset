const path = require('path')

const { getCssVar } = require('wec-frame/script/cssVarHelper')

const { VUE_APP_CONTEXT, VUE_APP_DEV_SERVER, NODE_ENV } = process.env

if (!VUE_APP_CONTEXT) {
  console.log('\033[41;30m ERROR \033[40;31m 请在.env文件设置VUE_APP_CONTEXT环境变量\033[0m')
  process.exit()
}

if (NODE_ENV === 'development' && !VUE_APP_DEV_SERVER) {
  console.log('\033[41;30m ERROR \033[40;31m 请在.env.development.local文件设置VUE_APP_DEV_SERVER环境变量\033[0m')
  process.exit()
}

module.exports = {
  publicPath: NODE_ENV === 'production' ? `${VUE_APP_CONTEXT}/static` : '/',
  chainWebpack (config) {
    const FILE_RE = /\.(vue|js|ts|svg)$/

    config.module.rule('svg').issuer((file) => !FILE_RE.test(file))
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .issuer((file) => FILE_RE.test(file))
      .use('svg-sprite')
      .loader('svg-sprite-loader')

    config.module
      .rule('wec-frame')
      .test(/\.js$/)
      .include
      .add(/wec-frame(\\|\/)src/)
      .end()
      .exclude
      .add(/wec-frame(\\|\/)src(\\|\/)utils(\\|\/)axios/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          [
            '@babel/preset-env',
            { modules: false },
          ],
        ],
      })

    config.module
      .rule('css-var')
      .test(/\.(vue|js|css)$/)
      .use('cssVar')
      .loader(path.resolve('node_modules/wec-frame/loader/css/cssVar.js'))
      .options({ cssVar: getCssVar() })

    config.module
      .rule('iview')
      .test(/\.js$/)
      .include
      .add(/iview(\\|\/)src/)
      .end()
      .exclude
      .add(/iview(\\|\/)src(\\|\/)utils(\\|\/)date/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          [
            '@babel/preset-env',
            { modules: false },
          ],
        ],
      })

    // config.plugin('vue-vendor')
    //   .use(webpack.DllReferencePlugin, [{ manifest: require(path.resolve('manifest/vue.json')) }])
    // config.plugin('common-vendor')
    //   .use(webpack.DllReferencePlugin, [{ manifest: require(path.resolve('manifest/common.json')) }])
  },
  devServer: {
    sockHost: 'http://localhost:8091',
    port: 8091,
    disableHostCheck: true,
    proxy: { [VUE_APP_CONTEXT]: { target: VUE_APP_DEV_SERVER } },
  },
}
