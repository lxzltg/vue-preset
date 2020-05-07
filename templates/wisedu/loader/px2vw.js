// const loaderUtils = require('loader-utils')
// 默认参数
// let defaultsProp = {
//   viewportWidth: 375,
//   unitPrecision: 5,
//   viewportUnit: 'vw',
//   minPixelValue: 1
// }

// const template = /<template>([\s\S]+)<\/template>/gi
// const styleRE = /<style>([\s\S]+)<\/style>/gi
// const ZPXRegExp = /(\d+)px/
const pxRegex = /url\([^)]+\)|(\d*\.?\d+)px((;?)(\s*)(\/\*(.+?)\*\/))?/ig
module.exports = function (source, a, b) {
  // console.log(this)
  // const opts = loaderUtils.getOptions(this)
  // const defaults = Object.assign({}, defaultsProp, opts)
  // let _source = source.replace(styleRE, '')
  // let _source = source
  // if (template.test(source)) {
  //   _source = source.match(template)[0]
  // }

  // let pxGlobalRegExp = new RegExp(pxRegex.source, 'ig')
  if (source.match(pxRegex)) {
    source = source.replace(pxRegex, (m, $1, $2, $3, $4, $5, $6, $7) => {
      if (!$1 || ($6 && ($6.indexOf('not convert') >= 0))) return m
      const px = parseFloat($1)
      if (px <= 1) return m
      return (px / 375 * 100).toFixed(5) + 'vw'
    })
    // source.replace(template, _source)
  }

  // console.log(_source)
  return source
}

// function px2vw (px, UIWidth) {
//   return
// }

// function createPxReplace (opts) {
//   const { viewportWidth, minPixelValue, unitPrecision, viewportUnit, unitToConvert } = opts
//   return function ($0, $1) {
//     if (!$1) return
//     var pixels = parseFloat($1)
//     if (pixels <= minPixelValue) return pixels + unitToConvert
//     // console.log(viewportWidth, pixels)
//     return toFixed((pixels / viewportWidth * 100), unitPrecision) + viewportUnit
//   }
// }
// function toFixed (number, precision) {
//   // console.log(number)
//   var multiplier = Math.pow(10, precision + 1)
//   var wholeNumber = Math.floor(number * multiplier)
//   return Math.round(wholeNumber / 10) * 10 / multiplier
// }
