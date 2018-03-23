<template>
  <div class="container">
    <el-form class="login_form" :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" v-loading="loadingflag" element-loading-text="页面跳转中">
     <h3 class="title">欢迎登录</h3>
     <el-form-item prop="account">
       <el-input v-focus type="text" v-model="user.account" auto-complete="off" placeholder="账号" @keyup.enter.native="handleSubmit" @change="changeFlag"></el-input>
     </el-form-item>
     <el-form-item prop="checkPass">
       <el-input type="password" v-model="user.checkPass" auto-complete="off" @keyup.enter.native="handleSubmit" placeholder="密码"></el-input>
     </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="login_button" type="primary" style="width:40%;"  @click="handleSubmit" >登录</el-button>
        <el-button class="login_button" type="primary" style="width:40%;" @click="toReg">去注册</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    return {
      logining: false,
      user: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      errorMessage: false,
      loadingflag: false
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.$store.dispatch("UserLogin", this.user);
        } else {
          this.$notify.error({
            title: "提示",
            message: "用户名或密码不得为空",
            duration: 2000,
            offset: 100
          });
          return false;
        }
      });
    },
    changeFlag() {
      this.errorMessage = false;
    },
    toReg() {
      this.$router.push({ path: "/reg" });
    }
  }
};
</script>

<style scoped>
.el-form-item {
  text-align: center;
}
</style>