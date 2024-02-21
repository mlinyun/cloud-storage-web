<template>
  <div id="home">
    <!-- 左侧菜单 - 区分文件类型 -->
    <SideMenu class="home-left"></SideMenu>
    <!-- 右侧内容区 -->
    <div class="home-right">
      <!-- 列显隐控制组件 -->
      <SelectColumn></SelectColumn>
      <!-- 面包屑导航栏 - 显示文件路径 -->
      <BreadCrumb :fileType="fileType"></BreadCrumb>
      <!-- 表格组件 - 文件展示区 -->
      <FileTable :tableData="tableDate" :loading="loading"></FileTable>
      <!-- 分页组件 -->
      <FilePagination
        :pageData="pageData"
        @changeData="changePageData"
      ></FilePagination>
    </div>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu.vue"; // 引入左侧菜单组件
import BreadCrumb from "./components/BreadCrumb.vue"; // 引入面包屑导航栏
import FileTable from "./components/FileTable.vue"; // 引入文件表格展示区
import FilePagination from "./components/FilePagination.vue"; // 引入分页组件
import SelectColumn from "./components/SelectColumn.vue"; // 引入控制列显隐组件

import { getFileList, getFileListByType } from "@/request/file"; // 引入获取文件列表接口

export default {
  name: "HomeView",
  // 注册局部组件
  components: {
    SideMenu,
    BreadCrumb,
    FileTable,
    FilePagination,
    SelectColumn,
  },
  data() {
    return {
      loading: false,
      tableDate: [], // 文件列表
      pageData: {
        currentPage: 1, // 页码
        pageCount: 10, // 每页显示条目数
        total: 0, // 总数
      },
    };
  },
  computed: {
    // 左侧菜单选中的文件类型
    fileType() {
      return this.$route.query.fileType
        ? Number(this.$route.query.fileType)
        : 0;
    },
  },
  watch: {
    fileType() {
      this.getFileData(); // 获取文件列表
    },
  },
  mounted() {
    this.getFileData(); // 获取文件列表
  },
  methods: {
    // 获取文件列表
    getFileData() {
      this.loading = true; // 打开表格的 loading 状态
      if (this.fileType === 0) {
        // 左侧菜单选择的为 全部 时，根据路径获取文件列表
        this.loading = false;
        this.getFileDataByPath();
      } else {
        // 左侧菜单选择的为 除全部以外 的类型时，根据类型，获取文件列表
        this.getFileDataByType();
      }
    },
    // 根据路径获取文件列表
    getFileDataByPath() {
      getFileList({
        filePath: "/",
        currentPage: this.pageData.currentPage,
        pageCount: this.pageData.pageCount,
      }).then(
        (res) => {
          this.loading = false; // 关闭表格的 loading 状态
          if (res.success) {
            this.tableDate = res.data.list; // 表格数据赋值
            this.pageData.total = res.data.total; // 分页组件 - 文件总数赋值
          } else {
            this.$message.error(res.message);
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },
    // 根据类型获取文件列表
    getFileDataByType() {
      getFileListByType({
        fileType: this.fileType, // 文件类型
        currentPage: this.pageData.currentPage, // 当前页码
        pageCount: this.pageData.pageCount, // 每页条目数
      }).then(
        (res) => {
          this.loading = false; // 关闭表格的 loading 状态
          if (res.success) {
            this.tableDate = res.data.list; // 表格数据赋值
            this.pageData.total = res.data.total; // 分页组件 - 文件总数赋值
          } else {
            this.$message.error(res.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 分页组件 - 页码或当页条目数改变时
    changePageData(pageData) {
      this.pageData.currentPage = pageData.currentPage; // 页码赋值
      this.pageData.pageCount = pageData.pageCount; // 每页条目数赋值
      this.getFileData(); // 获取文件列表
    },
  },
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
