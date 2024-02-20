<template>
  <div id="home">
    <!-- 左侧菜单 - 区分文件类型 -->
    <SideMenu class="home-left"></SideMenu>
    <!-- 右侧内容区 -->
    <div class="home-right">
      <!-- 面包屑导航栏 - 显示文件路径 -->
      <BreadCrumb></BreadCrumb>
    </div>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu.vue"; // 引入左侧菜单组件
import BreadCrumb from "./components/BreadCrumb.vue"; // 面包屑导航

export default {
  name: "HomeView",
  components: {
    SideMenu, // 注册左侧菜单组件
    BreadCrumb,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
#home {
  // 使用flex布局 菜单居左固定宽度 右侧内容区域自适应宽度
  display: flex;

  .home-left {
    box-sizing: border-box;
  }

  .home-right {
    box-sizing: border-box;
    width: calc(100% - 200px);
    padding: 8px 24px;
    flex: 1;
  }
}
</style>
