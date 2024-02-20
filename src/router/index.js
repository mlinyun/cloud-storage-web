// 1. 从依赖包中导入函数 createRouter 和 createWebHistory
import { createRouter, createWebHistory } from "vue-router";

// 2. 从其文件导入路由组件（使用懒加载）
const HomeView = () =>
  import(/* webpackChunkName: "home" */ "@/views/Home/index.vue"); // 网盘主页
const LoginView = () =>
  import(/* webpackChunkName: "login" */ "@/views/LoginView.vue"); // 登录页面
const RegisterView = () =>
  import(/* webpackChunkName: "register" */ "@/views/RegisterView.vue"); // 注册页面
const Error404 = () =>
  import(/* webpackChunkName: "error_404" */ "@/views/Error_404.vue"); // 404 页面

// 3. 定义一些路由：每个路由都需要映射到一个组件
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "网盘主页",
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      title: "注册",
    },
  },
  {
    path: "/:pathMatch(.*)*", // 将匹配所有内容并将其放在 $route.params.pathMatch 下
    name: "Error_404",
    component: Error404,
    meta: {
      title: "Error-404",
    },
  },
];

// 4. createRouter 方法创建一个路由实例 router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 5. 导入路由对象
export default router;
