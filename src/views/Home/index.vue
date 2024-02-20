<template>
  <div class="home">
    <!--使用左侧菜单组件-->
    <SideMenu></SideMenu>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu.vue"; // 引入左侧菜单组件
export default {
  name: "HomeView",
  components: {
    SideMenu, // 注册左侧菜单组件
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
