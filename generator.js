module.exports = (api, options, rootOptions) => {
  api.extendPackage((pkg) => {
    pkg.scripts = {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "lintcss": "stylelint src/**/*.{vue,css} --fix",
      "lintAll": "vue-cli-service lint && yarn lintcss",
      "autoBuild": "bash ./node_modules/wec-frame/script/build.sh",
      "readd": "yarn add http://172.16.7.53:9090/wecloud-svs-apps/WecMobileFrame.git",
      "installRule": "yarn add http://172.16.7.53:9090/zhouxiang/eslint-plugin-vue-zx.git -D",
      "installStyleRule": "yarn add http://172.16.7.53:9090/zhouxiang/stylelint-config-vue.git -D",
      "installCommitlint": "yarn add http://172.16.7.53:9090/zhouxiang/commitlint-config-zx.git -D"
    }
    delete pkg.gitHooks
    delete pkg.dependencies.vue
    delete pkg.dependencies['core-js']
    delete pkg.devDependencies['eslint-plugin-vue']
    return pkg 
  })
  api.extendPackage({
    dependencies: {
      "wec-mobile-frame": "http://172.16.7.53:9090/wecloud-svs-apps/WecMobileFrame.git",
    },
    devDependencies: {
      "@babel/plugin-proposal-class-properties": "^7.8.3",
      "@babel/plugin-proposal-do-expressions": "^7.8.3",
      "@babel/plugin-proposal-export-default-from": "^7.8.3",
      "@babel/plugin-proposal-export-namespace-from": "^7.8.3",
      "@babel/plugin-proposal-function-bind": "^7.8.3",
      "@babel/plugin-proposal-nullish-coalescing-operator": "^7.8.3",
      "@babel/plugin-proposal-optional-chaining": "^7.9.0",
      "@babel/plugin-proposal-pipeline-operator": "^7.8.3",
      "@babel/plugin-proposal-throw-expressions": "^7.8.3",
      "babel-eslint": "^10.0.1",
      "babel-plugin-component": "^1.1.1",
      "babel-plugin-import": "^1.11.0",
      "commitlint-config-zx": "http://172.16.7.53:9090/zhouxiang/commitlint-config-zx.git",
      "copy-webpack-plugin": "^5.0.4",
      "eslint": "^5.8.0",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-react": "^7.14.3",
      "eslint-plugin-vue": "http://172.16.7.53:9090/zhouxiang/eslint-plugin-vue-zx.git",
      "fast-glob": "^3.0.4",
      "husky": "^4.2.5",
      "markdown-it": "^10.0.0",
      "markdown-it-anchor": "^5.2.5",
      "markdown-it-chain": "^1.3.0",
      "markdown-it-container": "^2.0.0",
      "postcss-advanced-variables": "^3.0.0",
      "postcss-import": "^12.0.1",
      "postcss-inherit": "^4.1.0",
      "postcss-nested": "^4.1.2",
      "postcss-preset-env": "^6.4.0",
      "postcss-property-lookup": "^2.0.0",
      "stylelint": "^11.0.0",
      "stylelint-config-vue": "http://172.16.7.53:9090/zhouxiang/stylelint-config-vue.git",
      "svg-sprite-loader": "^4.1.6",
      "vue-markdown-loader": "^2.4.1",
      "vue-template-compiler": "^2.5.21",
      "webpack-bundle-analyzer": "^3.3.2",
      "webpack-cli": "^3.3.9",
      "@vue/cli-service": "3.5.0",
      "eslint": "^5.8.0",
    },
    "husky": {
      "hooks": {
        "pre-commit": "type vue-cli-service >/dev/null 2>&1;if [ $? -eq 0 ]; then lint-staged; else exit 0; fi",
        "commit-msg": "type commitlint >/dev/null 2>&1;if [ $? -eq 0 ]; then commitlint -e $HUSKY_GIT_PARAM; else exit 0; fi"
      }
    },
    "lint-staged": {
      "*.{js,vue}": [
        "yarn lint",
        "git add"
      ],
      "*.{vue,css}": [
        "stylelint --fix",
        "git add"
      ]
    }
  });

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
  // 上面的方式不能拷贝隐藏文件
  api.render({
    '.browserslistrc': './templates/wisedu/.browserslistrc',
    '.env': './templates/wisedu/.env',
    '.env.development.local': './templates/wisedu/.env.development',
    '.editorconfig': './templates/wisedu/.editorconfig',
    '.eslintrc.js': './templates/wisedu/.eslintrc.js',
    '.gitignore': './templates/wisedu/.gitignore',
    '.eslintignore': './templates/wisedu/.eslintignore',
  })
  // api.onCreateComplete(() => {
    // let pkg = fs.readFileSync(options.projectName + '/package.json', { encoding: 'utf-8' })
    // pkg = pkg.replace(/"core.js":\s"\^\d{1,2}.\d{1,2}.\d{1,2}",?\n?/, '')
    // pkg = pkg.replace(/"vue":\s"\^\d{1,2}.\d{1,2}.\d{1,2}",?\n?/, '')
    // fs.writeFileSync(options.projectName + '/package.json', pkg)
  // })
  api.postProcessFiles((files) => {
    // console.log(Object.keys(files))
    delete files['src/components/HelloWorld.vue']
    delete files['src/assets/logo.png']
    // delete files['src/App.vue']
    delete files['public/favicon.ico']
  })
}