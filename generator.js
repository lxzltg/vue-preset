module.exports = (api, options, rootOptions) => {
  // api.extendPackage({
  //   dependencies: {
  //     "axios": "^0.18.0",
  //     "vue": "^2.6.6",
  //     "vue-router": "^3.0.1",
  //     "vuex": "^3.0.1",
  //   },
  //   devDependencies: {
  //     "@babel/plugin-proposal-export-default-from": "^7.2.0",
  //     "@babel/plugin-proposal-function-bind": "^7.2.0",
  //     "@babel/plugin-proposal-optional-chaining": "^7.2.0",
  //     "@vue/cli-plugin-babel": "^3.5.0",
  //     "@vue/cli-plugin-eslint": "^3.5.0",
  //     "@vue/cli-service": "^3.5.0",
  //     "@vue/eslint-config-standard": "^4.0.0",
  //     "babel-eslint": "^10.0.1",
  //     "babel-plugin-component": "^1.1.1",
  //     "babel-plugin-import": "^1.11.0",
  //     "eslint": "^5.8.0",
  //     "eslint-plugin-vue": "^5.0.0",
  //     "postcss-advanced-variables": "^3.0.0",
  //     "postcss-import": "^12.0.1",
  //     "postcss-inherit": "^4.1.0",
  //     "postcss-nested": "^4.1.2",
  //     "postcss-preset-env": "^6.4.0",
  //     "postcss-property-lookup": "^2.0.0",
  //     "vue-template-compiler": "^2.5.21"
  //   }
  // });

  // options.pug = true
  // if (options.pug) {
  //   api.extendPackage({
  //     devDependencies: {
  //       "pug": "^2.0.3",
  //       "pug-filters": "^3.1.0",
  //       "pug-loader": "^2.4.0",
  //       "pug-plain-loader": "^1.0.0",
  //     }
  //   })
  // }

  api.render('./templates/wisedu')
  api.render({
    './src/babel.config.js': './templates/wisedu/babel.config.js',
    './src/postcss.config.js': './templates/wisedu/postcss.config.js',
    './src/vue.config.js': './templates/wisedu/vue.config.js',
    './src/.browserslistrc': './templates/wisedu/.browserslistrc',
    './src/.editorconfig': './templates/wisedu/.editorconfig',
    './src/.eslintrc.js': './templates/wisedu/.eslintrc.js',
    './src/.gitignore': './templates/wisedu/.gitignore',
  })
  api.onCreateComplete(() => {
  })
  api.postProcessFiles((files) => {
    delete files['src/components/HelloWorld.vue']
    delete files['src/assets/logo.png']
    delete files['public/favicon.ico']
  })
}