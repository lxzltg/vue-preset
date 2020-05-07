import globalLoading from 'wec-mobile-frame/src/utils/globalLoading'
import { danger } from 'wec-mobile-frame/src/utils/notify.js'
import { interceptors } from 'wec-mobile-frame/src/utils/httpConfig'
import axios from 'wec-mobile-frame/src/utils/axios'

// const axios = require('axios')

const http = axios.create({
  baseURL: window.location.origin, // 默认是所属服务器域名
  // timeout: TIMEOUT,
})

// const open () => {
// }
// const close () => {
// }

http.interceptors.response.use(interceptors.response.returnResponseData, interceptors.response.returnExceptionData)
http.interceptors.response.use(interceptors.response.handleResponseData.bind(undefined, ({ err }) => danger(err)))
http.interceptors.response.use(interceptors.response.handleClearRequest)
http.interceptors.response.use(interceptors.response.handleCloseGlobalLoading.bind(undefined, globalLoading.close.bind(globalLoading), 300))

http.interceptors.request.use(interceptors.request.handleOpenGlobalLoading.bind(undefined, globalLoading.open.bind(globalLoading), 2000))
http.interceptors.request.use(interceptors.request.handleEncrypt)
http.interceptors.request.use(interceptors.request.transformTimeField)
http.interceptors.request.use(interceptors.request.handleCacheRequest)
http.interceptors.request.use(interceptors.request.handleDefaultConfig)

const { post, get, put } = http

export {
  post,
  get,
  put,
}

export default http
