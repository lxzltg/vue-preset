const path = require('path')

const { getCssVar } = require('wec-frame/script/cssVarHelper')
// gzip压缩
// const CompressionPlugin = require('compression-webpack-plugin')
// report代码统计
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
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
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: false,

  //   // 开启 CSS source maps?
  //   sourceMap: false,

  //   // css预设器配置项
  //   loaderOptions: {},

  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false,
  // },

  // productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  // outputDir: 'dist', // 构建输出目录
  // assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)
  publicPath: NODE_ENV === 'production' ? `${VUE_APP_CONTEXT}/static` : '/',
  chainWebpack (config) {
    // report代码统计
    // config.plugin('analyzer').use(BundleAnalyzerPlugin).end()
    const FILE_RE = /\.(vue|js|ts|svg)$/

    config.module.rule('svg').issuer((file) => !FILE_RE.test(file))
    config.module.rules.store.get('js').exclude.store.add(/axios/)
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .issuer((file) => FILE_RE.test(file))
      .use('svg-sprite')
      .loader('svg-sprite-loader')

    config.module
      .rule('wec-frame-js')
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
      .rule('wec-mobile-frame-js')
      .test(/\.js$/)
      .include
      .add(/wec-mobile-frame(\\|\/)src/)
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
      .rule('px2vw-vue')
      .test(/\.(js|css|vue)$/)
      .use('px2vw')
      .loader(path.resolve('loader/px2vw.js'))

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
