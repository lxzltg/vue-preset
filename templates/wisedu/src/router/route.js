export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('../pages/foo'),
    },
  ],
}
