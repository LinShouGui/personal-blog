<template>
<div class="wrapper">
 <div class="outWrapper">
        <div class="infoPage">
            <div class="name">
                <label for="name">名&nbsp;字&nbsp;:&nbsp;</label>
                <span >{{getName}}</span>
            </div>
            <div class="sex">
                  <label for="sex">性&nbsp;别&nbsp;:&nbsp;</label>
                <span >{{getSex||"保密"}}</span>
            </div>
            <div class="email">  
                <label for="email">邮&nbsp;箱&nbsp;:&nbsp;</label>
                <span >{{getEmail||"88888@qq.com"}}</span>
                </div>
            <div class="bio">  
                <label for="bio">个&nbsp;性&nbsp;签&nbsp;名&nbsp;:&nbsp;</label>
                <span >{{getBio||"帅气一波"}}</span>
                </div>
        </div>
    </div>
</div>
   
</template>
<script>
import api from "../api/api.js";
import store from "../store/states.js";
export default {
  data() {
    return {};
  },
  computed: {
    getName() {
      return localStorage.getItem("username");
      // return store.state.findName;
      // return this.$store.state.findName;
      // return store.findName;
    },
    getSex() {
      return this.sex;
    },
    getEmail() {
      return this.email;
    },
    getBio() {
      return this.bio;
    }
  },
  mounted() {
    var that = this;
    api
      .getUserAvaByName({ name: localStorage.getItem("findName") || null })
      .then(({ data: { code, user } }) => {
        if (code == 200) {
          if (!user) {
            return false;
          }
          this.sex = user.sex;
          this.email = user.email;
          this.bio = user.bio;
        } else {
          that.$message({
            message: "未查找到该用户",
            type: "warning",
            duration: 0
          });
        }
      })
      .catch(err => {
        that.$message("发生不被处理的错误");
        console.log(`用户信息页请求服务器发生错误:${err}`);
      });
  }
};
</script>
<style>
.el-message {
  min-width: 380px;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #e6ebf5;
  position: fixed;
  left: 50%;
  top: 76px !important;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #edf2fc;
  -webkit-transition: opacity 0.3s, -webkit-transform 0.4s;
  transition: opacity 0.3s, -webkit-transform 0.4s;
  transition: opacity 0.3s, transform 0.4s;
  transition: opacity 0.3s, transform 0.4s, -webkit-transform 0.4s;
  padding: 15px 15px 15px 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.wrapper {
  -ms-grid-column-span: 1;
  -ms-grid-column: 2;
  grid-column: 2/span 1;
  -ms-grid-row-span: 1;
  -ms-grid-row: 2;
  grid-row: 2/span 1;
  margin: 0 auto;
  padding-top: 10px;
  text-align: center;
}
.outWrapper {
  width: 1000px;
  height: 600px;
  margin: 30px auto;
  background: #aaa;
  position: relative;
}
.infoPage {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;

  color: navy;
  width: 500px;
  height: 500px;
  background: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.infoPage > div {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}
.infoPage label {
  text-align: left;
  width: 100px;
}
.infoPage span {
  flex: 1;
}
</style>
