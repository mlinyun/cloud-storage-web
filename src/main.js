import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus"; // 引入 ElementPlus 组件库
import "element-plus/dist/index.css"; // ElementPlus 的样式文件需要单独引入
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "./assets/style/base.styl"; // 基础样式

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
}); // 全局配置国际化-中文
app.mount("#app");
