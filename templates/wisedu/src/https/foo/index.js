import { post } from '@/utils/http'
const { VUE_APP_CONTEXT } = process.env

export * from '@/https/common'

// 注释
export const doSomethingUrl = `${VUE_APP_CONTEXT}/xx/xx/xx/doSomething`
export function doSomething (params) {
  return post(doSomethingUrl, { ...params })
}
