<template>
  <div id="file-table">
    <el-table
      :data="tableData"
      height="calc(100vh - 200px)"
      style="width: 100%"
    >
      <el-table-column fixed prop="fileName" label="文件名"></el-table-column>
      <el-table-column prop="extendName" label="类型" width="100">
      </el-table-column>
      <el-table-column
        prop="fileSize"
        label="大小"
        width="60"
      ></el-table-column>
      <el-table-column prop="uploadTime" label="修改日期" width="180">
      </el-table-column>
      <!-- 表格操作列 自定义表格头，原有的 label 需要删除，宽度动态变化 -->
      <el-table-column :width="operaColumnIsFold ? 200 : 100">
        <template #header>
          <span>操作</span>
          <el-icon title="展开" @click="operaColumnIsFold = true">
            <i-ep-circlePlusFilled />
          </el-icon>
          <el-icon title="折叠" @click="operaColumnIsFold = false">
            <i-ep-removeFilled />
          </el-icon>
        </template>
        <template v-slot="scope">
          <!-- 操作列展开状态下的按钮 通过 v-if 控制 -->
          <div class="opera-unfold" v-if="operaColumnIsFold">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClickDelete(scope.row)"
            >
              删除
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClickMove(scope.row)"
            >
              移动
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClickRename(scope.row)"
            >
              重命名
            </el-button>
            <el-button link type="primary" size="small">
              <a target="_blank" style="display: block; color: inherit">下载</a>
            </el-button>
          </div>
          <!-- 操作列收缩状态下的按钮 通过 v-else 控制 -->
          <el-dropdown trigger="click" v-else>
            <el-button size="small">
              操作
              <el-icon>
                <i-ep-arrowDown />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleClickDelete(scope.row)">
                  删除
                </el-dropdown-item>
                <el-dropdown-item @click="handleClickMove(scope.row)">
                  移动
                </el-dropdown-item>
                <el-dropdown-item @click="handleClickRename(scope.row)">
                  重命名
                </el-dropdown-item>
                <el-dropdown-item>
                  <a target="_blank" style="display: block; color: inherit">
                    下载
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "FileTable",
  data() {
    return {
      operaColumnIsFold: false, //  表格操作列-是否收缩
      // 表格数据先模拟
      tableData: [
        {
          fileName: "markdown样式文件",
          extendName: "markdown",
          fileSize: "10KB",
          uploadTime: "2020-10-28 16:33:33",
        },
        {
          fileName: "项目源码",
          extendName: "zip",
          fileSize: "7MB",
          uploadTime: "2020-12-28 20:00:50",
        },
        {
          fileName: "markdown样式文件",
          extendName: "markdown",
          fileSize: "10KB",
          uploadTime: "2020-10-28 16:33:33",
        },
        {
          fileName: "项目源码",
          extendName: "zip",
          fileSize: "7MB",
          uploadTime: "2020-12-28 20:00:50",
        },
        {
          fileName: "markdown样式文件",
          extendName: "markdown",
          fileSize: "10KB",
          uploadTime: "2020-10-28 16:33:33",
        },
        {
          fileName: "项目源码",
          extendName: "zip",
          fileSize: "7MB",
          uploadTime: "2020-12-28 20:00:50",
        },
        {
          fileName: "markdown样式文件",
          extendName: "markdown",
          fileSize: "10KB",
          uploadTime: "2020-10-28 16:33:33",
        },
        {
          fileName: "项目源码",
          extendName: "zip",
          fileSize: "7MB",
          uploadTime: "2020-12-28 20:00:50",
        },
        {
          fileName: "markdown样式文件",
          extendName: "markdown",
          fileSize: "10KB",
          uploadTime: "2020-10-28 16:33:33",
        },
        {
          fileName: "项目源码",
          extendName: "zip",
          fileSize: "7MB",
          uploadTime: "2020-12-28 20:00:50",
        },
        {
          fileName: "markdown样式文件",
          extendName: "markdown",
          fileSize: "10KB",
          uploadTime: "2020-10-28 16:33:33",
        },
        {
          fileName: "项目源码",
          extendName: "zip",
          fileSize: "7MB",
          uploadTime: "2020-12-28 20:00:50",
        },
      ],
    };
  },
  watch: {
    // 监听收缩状态变化，存储在sessionStorage中，保证页面刷新时仍然保存设置的状态
    operaColumnIsFold(newValue) {
      sessionStorage.setItem("operaColumnIsFold", newValue);
    },
  },
  created() {
    this.operaColumnIsFold =
      sessionStorage.getItem("operaColumnIsFold") === "true"; //  读取保存的状态
  },
  methods: {
    // 删除按钮 - 点击事件
    handleClickDelete(row) {
      console.log("删除", row.fileName);
    },
    // 移动按钮 - 点击事件
    handleClickMove(row) {
      console.log("移动", row.fileName);
    },
    // 重命名按钮 - 点击事件
    handleClickRename(row) {
      console.log("重命名", row.fileName);
    },
  },
};
</script>

<style lang="stylus" scoped>
/* 表格操作列 - 表头图标样式调整 */
.cell .el-icon {
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;
  vertical-align: middle;

  &:hover {
    opacity: 0.5;
  }
}
</style>
