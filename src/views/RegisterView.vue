<template>
  <div class="registerWrapper" id="registerBackground">
    <div class="formWrapper">
      <h1 class="registerTitle">用户注册</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入注册用户名">
            <template #prefix>
              <el-icon>
                <i-ep-user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <el-input v-model="ruleForm.telephone" placeholder="请输入注册手机号">
            <template #prefix>
              <el-icon>
                <i-ep-iphone />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请设置用户密码"
            show-password
          >
            <template #prefix>
              <el-icon>
                <i-ep-lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="registerButtonWrapper">
          <el-button
            class="registerButton"
            type="primary"
            @click="submitForm('ruleForm')"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addUser } from "@/request/user.js"; // 引入注册接口

export default {
  name: "RegisterView",
  data() {
    return {
      ruleForm: {
        username: "",
        telephone: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    if (this.$store.getters.isLogin) {
      // 用户若已登录，自动跳转到首页
      this.$notify({
        title: "成功",
        message: "您已登录！已跳转到首页",
        type: "success",
      });
      this.$router.replace({ name: "home" });
    }
  },
  methods: {
    //  注册按钮-点击事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 表单校验
        if (valid) {
          // 各项校验通过->调用注册接口，传递参数（用户名，手机号和密码）
          addUser(this.ruleForm).then((res) => {
            if (res.success) {
              this.$notify({
                title: "成功",
                message: "注册成功！以跳转到登录页面",
                type: "success",
              });
              this.$refs[formName].resetFields(); // 注册成功之后清空表单
              this.$router.replace({ path: "/login" }); // 注册成功之后跳转到登录页面
            } else {
              this.$message.error(res.message); // 显示接口返回的错误信息
            }
          });
        } else {
          // 表单验证没通过
          this.$message.error("请完善信息！");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.registerWrapper {
  height: 500px !important;
  min-height: 500px !important;
  width: 100% !important;
  padding-top: 50px;

  .formWrapper {
    width: 375px;
    margin: 0 auto;
    text-align: center;

    .registerTitle {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 30px;
      color: #000;
    }

    .demo-ruleForm {
      width: 100%;
      margin-top: 20px;

      >>> .el-form-item__content {
        margin-left: 0 !important;
      }

      & >>> .el-input__inner {
        font-size: 16px;
      }

      .registerButtonWrapper {
        .registerButton {
          width: 100%;
        }

        & >>> .el-button {
          padding: 10px 90px;
          font-size: 16px;
        }
      }
    }

    .tip {
      width: 70%;
      margin-left: 86px;
    }
  }
}
</style>
