<template>
  <div id="file-pagination">
    <el-pagination
      class="file-pagination"
      :current-page="pageData.currentPage"
      :page-size="pageData.pageCount"
      :total="pageData.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="sizes, total, prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "FilePagination",
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 通过父组件传递 pageData，需要注释下面的 pageData
      // pageData: {
      //   currentPage: 1, // 页码
      //   pageCount: 20, // 每页显示条目个数
      //   total: 0, // 总数
      // },
    };
  },
  methods: {
    // 分页组件 当前页码改变
    handleCurrentChange(currentPage) {
      // this.pageData.currentPage = currentPage;
      this.$emit("changePageData", {
        ...this.pageData,
        currentPage,
      });
    },
    // 分页组件 每页显示条目个数改变
    handleSizeChange(pageCount) {
      // this.pageData.pageCount = pageCount;
      this.$emit("changePageData", {
        ...this.pageData,
        pageCount,
      });
    },
  },
};
</script>

<style scoped lang="stylus">
/* 分页组件内容居右显示 */
.file-pagination {
  margin-top: 12px;
  float: right;
}
</style>
