<template>
  <div class="container" >
    <el-form class="reg_form" :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" >
     <h3 class="title">修改密码</h3>
    <el-form-item prop="checkBeforePass">
       <el-input type="password" v-model="user.checkBeforePass" auto-complete="off" placeholder="请输入原密码"></el-input>
     </el-form-item>
     <el-form-item prop="checkPass">
       <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="请输入新密码"></el-input>
     </el-form-item>
     <el-form-item prop="checkRepeatPass">
       <el-input type="password" v-model="user.checkRepeatPass" auto-complete="off" placeholder="重复输入密码"></el-input>
     </el-form-item>
      <el-form-item style="width:100%;margin-left:10%;">
        <el-button class='reg_button' type="primary" style="width:40%;" @click="toReg" >去注册</el-button>
        <el-button class='login_button' type="primary" style="width:40%;" @click="toLogin">完成修改</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
import router from "../router";
import api from "../api/api.js";
export default {
  data() {
    let checkRepeatPass = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.user.checkPass) {
        return callback(new Error("两次输入的密码不一样"));
      } else {
        callback();
      }
    };
    let checkBeforePass = (rule, value, callback) => {
      let name = this.$store.state.message;
      let password = value;
      let isCorrect = false;
      if (value == "") {
        return callback(new Error("请输入原密码"));
      }
      api
        .checkPass({ name: name, password: password })
        .then(({ data: { code } }) => {
          if (code == 200) {
            // console.log('正确')
            isCorrect = true;
          }
          if (!isCorrect) {
            // console.log('isCorrect');
            return callback(new Error("原密码错误"));
          } else {
            callback();
          }
        });
    };
    return {
      user: {
        account: this.$store.state.message,
        checkPass: "",
        checkRepeatPass: "",
        checkBeforePass: ""
      },
      rules2: {
        checkPass: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        checkRepeatPass: [{ validator: checkRepeatPass, trigger: "blur" }],
        checkBeforePass: [{ validator: checkBeforePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    toReg() {
      this.$router.push({ path: "/reg" });
    },
    toLogin() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.$store.dispatch("toWritePW", this.user);
        } else {
          console.log("改密出错");
          return false;
        }
      });
    }
  },
  computed: {}
};
</script>
<style>

</style>