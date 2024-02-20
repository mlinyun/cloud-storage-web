<template>
  <div id="header">
    <el-menu
      class="header-menu"
      :default-active="activeIndex"
      :router="true"
      :ellipsis="false"
      mode="horizontal"
    >
      <el-menu-item index="Home" :route="{ name: 'home' }">
        <img class="logo" src="@/assets/logo.png" />
        <h1 class="logo-text">凌云网盘系统</h1>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="Login" :route="{ name: 'login' }" v-show="!isLogin">
        登录
      </el-menu-item>
      <el-menu-item
        index="Register"
        :route="{ name: 'register' }"
        v-show="!isLogin"
      >
        注册
      </el-menu-item>
      <el-menu-item v-show="isLogin">
        <el-icon>
          <i-ep-userFilled />
        </el-icon>
        {{ username }}
      </el-menu-item>
      <el-menu-item v-show="isLogin" @click="exitButton">退出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
  computed: {
    // 当前激活菜单的 index
    activeIndex() {
      return this.$route.name; // 获取当前路由名称
    },
    // 登录状态
    isLogin() {
      return this.$store.getters.isLogin;
    },
    // 用户名
    username() {
      return this.$store.getters.username;
    },
  },
  methods: {
    // 退出登录
    exitButton() {
      Cookies.set("token", "");
      this.$router.push({ path: "/login" }); // 退出登录后跳转到登录页面
      this.$message.success("退出登录成功！");
    },
  },
};
</script>

<style scoped lang="stylus">
.header-menu
  padding 0 24px 0 12px

.header-menu .logo
  width 34px

.header-menu .logo-text
  margin-inline-start 8px
  font-weight 600
  color rgba(0, 0, 0, 0.8)
  font-size 24px

.flex-grow
  flex-grow 1
</style>
