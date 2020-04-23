import { post } from 'wec-frame/src/utils/http'
import { CURRENT_FULL_PREFIX } from 'wec-frame/src/https'

export * from '@/https/common'

// 注释
export const doSomethingUrl = `${CURRENT_FULL_PREFIX}/xx/xx/xx/doSomething`
export function doSomething (params) {
  return post(doSomethingUrl, { ...params })
}
