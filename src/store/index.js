import { createStore } from "vuex";
import user from "./module/user.js"; // 引入 user.js
import file from "./module/file.js"; // 引入 file.js

export default createStore({
  state: {},
  getters: {
    // 是否登录
    isLogin: (state) => state.user.isLogin,
    // 用户名
    username: (state) => state.user.username,
    // 用户 ID
    userId: (state) => state.user.userId,
    // 用户详细信息
    userInfoObj: (state) => state.user.userInfoObj,
    // 需要显示的表格列
    selectedColumnList: (state) =>
      state.file.selectedColumnList === null
        ? state.file.allColumnList
        : state.file.selectedColumnList.split(","),
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    file,
  },
});
