<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="keepAlive"></router-view>
    </keep-alive>

    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    keepAlive () {
      return this.$route.meta?.cache?.keepAlive
    },
  },
}
</script>
<style>
html,
body,
#app {
  height: 100%;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background: #f3f6f8;
}
</style>
