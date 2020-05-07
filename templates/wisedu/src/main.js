
import App from './App.vue'
import {
  beforeEach,
  routerConfig,
} from './router'
import store from './store'

import * as components from './components'
import WecMobileFrame, { Vue } from 'wec-mobile-frame/src/main'

new WecMobileFrame({
  store,
  router: routerConfig,
  beforeEach,
  App,
})

Object.keys(components).forEach((component) => {
  Vue.component(component, components[component])
})
