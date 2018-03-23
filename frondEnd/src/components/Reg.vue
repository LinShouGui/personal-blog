<template>
  <div class="container" >
    <el-form class="reg_form" :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" >
     <h3 class="title">用户注册</h3>
     <el-form-item prop="account">
       <el-input v-focus type="text" v-model="user.account" auto-complete="off" placeholder="账号"></el-input> 
     </el-form-item>
     <el-form-item prop="checkPass">
        <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="密码"></el-input>
     </el-form-item>
     <el-form-item prop="checkRepeatPass">
          <el-input  type="password" v-model="user.checkRepeatPass" auto-complete="off" placeholder="重复输入密码"></el-input> 
     </el-form-item>
      <el-form-item style="width:100%;">
       <el-button class='reg_button' :disabled="false" type="primary" style="width:40%;" @click="handleSubmit" >注册</el-button>
        <el-button class='login_button' type="primary" style="width:40%;" @click="toLogin">去登录</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
import router from "../router";
export default {
  data() {
    var checkRepeatPass = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.user.checkPass) {
        return callback(new Error("两次输入的密码不一样"));
      } else {
        callback();
      }
    };
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (value.match(/\s+/g)) {
        return callback(new Error("账号不能包含空格"));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else if (value.match(/\s+/g)) {
        return callback(new Error("密码不能包含空格"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      user: {
        account: "",
        checkPass: "",
        checkRepeatPass: ""
      },
      rules2: {
        account: [
          { validator: checkAccount, trigger: "blur" }
          //{required:true,validator:checkAccount,message:'账号不能为空',trigger:'blur'},
        ],
        checkPass: [{ validator: checkPass, trigger: "blur" }],
        checkRepeatPass: [{ validator: checkRepeatPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.user.validate(valid => {
        if (!valid) {
          this.$alert("请确保所有字段符合格式", {
            confirmButtonText: "重新修改"
          });
          return false;
        }
        let account = this.user.account.replace(/\s+/g, "");
        let checkPass = this.user.checkPass.replace(/\s+/g, "");
        let checkRepeatPass = this.user.checkRepeatPass.replace(/\s+/g, "");
        let solvedUser = { account, checkPass, checkRepeatPass };
        this.$store.dispatch("UserReg", solvedUser);
      });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  text-align: center;
}
</style>