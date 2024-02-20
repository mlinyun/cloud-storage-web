import { createStore } from "vuex";
import user from "./module/user";

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
  },
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
