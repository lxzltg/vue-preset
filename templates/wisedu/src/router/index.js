export routerConfig from './route'
export function beforeEach (to, from, next) {
  document.title = to.name

  next()
}
