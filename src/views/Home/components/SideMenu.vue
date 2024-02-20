<template>
  <div id="side-menu">
    <el-menu
      class="side-menu"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :default-active="activeIndex"
      :router="true"
      :collapse="isCollapse"
    >
      <div class="fold-wrapper">
        <!-- 添加 click 事件：当点击时切换菜单的收缩状态 -->
        <el-icon v-if="isCollapse" title="展开" @click="isCollapse = false">
          <i-ep-expand />
        </el-icon>
        <el-icon v-else title="收缩" @click="isCollapse = true">
          <i-ep-fold />
        </el-icon>
      </div>
      <el-menu-item index="0" :route="{ name: 'home', query: { fileType: 0 } }">
        <el-icon>
          <i-ep-menu />
        </el-icon>
        <template #title>全部</template>
      </el-menu-item>
      <el-menu-item index="1" :route="{ name: 'home', query: { fileType: 1 } }">
        <el-icon>
          <i-ep-picture />
        </el-icon>
        <template #title>图片</template>
      </el-menu-item>
      <el-menu-item index="2" :route="{ name: 'home', query: { fileType: 2 } }">
        <el-icon>
          <i-ep-document />
        </el-icon>
        <template #title>文档</template>
      </el-menu-item>
      <el-menu-item index="3" :route="{ name: 'home', query: { fileType: 3 } }">
        <el-icon>
          <i-ep-videoCameraFilled />
        </el-icon>
        <template #title>视频</template>
      </el-menu-item>
      <el-menu-item index="4" :route="{ name: 'home', query: { fileType: 4 } }">
        <el-icon>
          <i-ep-headset />
        </el-icon>
        <template #title>音乐</template>
      </el-menu-item>
      <el-menu-item index="5" :route="{ name: 'home', query: { fileType: 5 } }">
        <el-icon>
          <i-ep-takeawayBox />
        </el-icon>
        <template #title>其他</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      isCollapse: false, // 控制菜单收缩和展开（默认展开）
    };
  },
  computed: {
    // 当前激活菜单的 index
    activeIndex() {
      // 返回获取的当前路由参数中包含的文件类型
      return String(this.$route.query.fileType);
    },
  },
  watch: {
    // 监听收缩状态变化，存储在 sessionStorage 中，保证页面刷新时仍然保存设置的状态
    isCollapse(newValue) {
      sessionStorage.setItem("isCollapse", newValue);
    },
  },
  created() {
    this.isCollapse = sessionStorage.getItem("isCollapse") === "true"; // 读取保存的状态
    if (!this.$route.query.fileType) {
      this.$router.replace({ query: { fileType: 0 } });
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/mixins.styl';

.side-menu {
  // 高度设置为屏幕高度减去顶部导航栏的高度
  height: calc(100vh - 61px);
  overflow: auto;
  // 调整滚动条样式
  setScrollbar(6px, #909399, #EBEEF5);

  // 折叠图标调整样式

  .fold-wrapper {
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    text-align: right;
    color: #fff;
    font-size: 24px;

    .el-icon-s-unfold, .el-icon-s-fold {
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}

// 对展开状态下的菜单设置宽度
.side-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
