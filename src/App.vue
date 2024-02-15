<template>
  <div id="app">
    <!-- 3. 使用组件 -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
// 1. 引入组件
import Header from "@/components/HeaderComponent.vue";

export default {
  name: "App",
  // 2. 注册组件
  components: {
    Header,
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
