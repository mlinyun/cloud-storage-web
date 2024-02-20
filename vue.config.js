const { defineConfig } = require("@vue/cli-service");
const Icons = require("unplugin-icons/webpack");
const IconsResolver = require("unplugin-icons/resolver");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const productConfig = require("./public/config.json"); // 引入 config.json 文件
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  configureWebpack: {
    plugins: [
      AutoImport({
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      });
      return definitions;
    });
    config.plugin("html").tap((args) => {
      args[0].title = "凌云网盘系统";
      return args;
    });
  },
  devServer: {
    host: "0.0.0.0",
    open: true,
    allowedHosts: "all",
    proxy: {
      // 配置代理，解决跨域请求后台数据的问题
      "/api": {
        target: productConfig.baseUrl, // 后台接口，连接本地服务
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
});
