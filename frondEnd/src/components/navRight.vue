<template>
      <div class="nav_right" ref="nav_right">
            <a class="font_size" @click="toChange">{{isLogined?'Aa':'关于'}}</a>
            <a v-if="!isLogined" class="signin" @click="toSignin">登录</a>
            <a v-else class="my" @mouseenter="toShow(true)" @mouseleave="toShow(false)" ><i>{{item}}</i>
                <div v-show="show" class="show">
                    <ul class="ul">
                        <li class="li" @click="toMyPage">我的</li>
                        <li class="li" @click="toMyArticles">我的文章</li>
                        <el-badge :value="mesCount" :max="10" class="li">
                            <li class="myInbox" @click="toMyInbox">信息箱</li>
                        </el-badge>
                        <li class="li" @click="toWritePW">修改密码</li>

                        <li class="li" >更多
                                         <ul class="more">
                                            <li class="li" @click="toUploadPage">上传视频</li>
                        <li class="li GAME" @click="toGames">游戏</li>
                        <li class="li" @click="toUpdateProgress">更新日志</li>
                                           </ul>          
                        </li>
                        <li class="li" @click="toSignout">退出</li>
                        
                    </ul>
                </div>
            </a>
            <a  class="signup" @click="toSignup">注册</a>
            <a :class="{'write_vtn':isLogined,'write_vtn_disabled':!isLogined}" @click="toWritePage">写文章</a>
        </div>
</template>
<script>
import api from "../api/api.js";
import store from "../store/states.js";
export default {
  data() {
    return {
      show: false //默认隐藏
    };
  },
  computed: {
    isLogined() {
      return store.token;
    },
    item() {
      return store.message;
    },
    mesCount() {
      return store.mesCount || 0;
    }
  },
  methods: {
    toSignin() {
      this.$router.push({ path: "/login" });
    },
    toSignup() {
      this.$router.push({ path: "/reg" });
    },
    toChange() {
      if (!this.isLogined) {
        this.toAbout();
      } else {
        this.$router.push({ path: "/changeFont" });
      }
    },
    toWritePage() {
      this.$router.push({ path: "/toWritePage" });
    },
    toSignout() {
      this.$store.dispatch("TO_SIGNOUT", null);
      this.isLogined = true;
      this.show = false;
    },
    toShow(flag) {
      this.show = flag;
    },
    toWritePW() {
      this.$router.push({ path: "/toWritePass" });
    },
    toAbout() {
      this.$router.push({ path: "/toAbout" });
    },
    toMyArticles() {
      this.$router.push({ path: "/myArticles" });
    },
    toMyPage() {
      this.$router.push({ path: "/myPage" });
    },
    toMyInbox() {
      this.$router.push({ path: "/myInbox" });
    },
    toUploadPage() {
      this.$router.push({ path: "/uploadPage" });
    },
    toUpdateProgress() {
      this.$router.push({ path: "/updateProgress" });
    },
    getMessageCount() {
      let user = this.$store.state.message;
    },
    toGames() {
      this.$router.push({ path: "/games" });
    }
  },
  mounted() {
    //   this.getMessageCount();
  }
};
</script>
<style>
.el-badge {
  display: block !important;
}
.li:hover .more {
  visibility: visible;
}
.li:hover {
  color: white;
  background: #ccc;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .font_size {
    color: #969696;
    font-size: 16px;
    font-style: normal;
    font-weight: 400 !important;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
  }

  .nav_right {
    flex: 1;
    height: 56px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .nav_right1 {
    flex: 1;
    height: 56px;
    line-height: 56px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nav_right .font_size,
  .nav_right .my {
    width: 45px;
    height: 55px;
    line-height: 55px;
  }

  .signin {
    line-height: 55px;
    font-size: 15px;
    color: #969696;
    cursor: pointer;
  }
  .my {
    font-size: 15px;
    color: #969696;
    cursor: pointer;
    height: 56px;
    line-height: 56px;
    position: relative;
  }
  .my i {
    font-size: 18px;
    font-style: normal;
  }
  .show {
    width: 120px;
    background-color: #fff;
  }

  ul {
    list-style: none;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    position: absolute;
    left: -25px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  .li {
    border-bottom: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    width: 90px;
  }
  .li:last-child {
    border: none;
    height: 50px;
    line-height: 50px;
    width: 90px;
  }

  .li:last-child:hover {
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  .more {
    border: 1px solid #eee;
    visibility: hidden;
    position: absolute;
    left: 92px;
    top: 200px;
    list-style: none;
    color: #969696;
    background: #fff;
  }

  .myInbox {
    border-bottom: 1px solid #eee;
    height: 50px;
    line-height: 50px;
  }
  .signup {
    width: 45px;
    line-height: 55px;
    font-size: 15px;
    cursor: pointer;
    color: rgb(236, 97, 73);
  }
  .write_vtn {
    width: 80px;
    height: 56px;
    line-height: 56px;
    font-size: 15px;
    cursor: pointer;
    color: #fff;
    background-color: #ea6f5a;
  }
  .write_vtn_disabled {
    height: 56px;
    line-height: 56px;
    width: 80px;
    font-size: 15px;
    cursor: pointer;
    color: #fff;
    border-radius: 4px;
    background-color: #aaa;
  }
  .write_btn_pic1 {
    display: inline-block;
    font-size: 15px;
    color: #fff;

    border-radius: 4px;
    background-color: #ea6f5a;
    cursor: pointer;
  }
  .el-message-box {
    width: 100% !important;
  }
}

@media only screen and (min-width: 1029px) {
  .nav_right {
    grid-column: 3/span 1;
    display: grid;
    grid-template-columns: 55.6px 55.6px 80px 100px minmax(10px, 10px);
    justify-content: space-around;
    height: 56px;
    line-height: 56px;
    text-align: center;
    position: relative;
  }
  .nav_right1 {
    grid-column: 3/span 1;
    display: grid;
    grid-template-columns:
      55.6px 55.6px minmax(0px, 80px) 80px 100px
      minmax(10px, 10px);
    justify-content: space-around;
    height: 56px;
    line-height: 56px;
    text-align: center;
    position: relative;
  }
  .font_size {
    grid-column: 1/span 1;
    color: #969696;
    height: 56px;
    align-self: center;
    font-size: 16px;
    font-style: normal;

    font-weight: 400 !important;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
  }
  .signin {
    grid-column: 2/span 1;
    height: 56px;
    font-size: 15px;
    color: #969696;
    cursor: pointer;
  }
  .my {
    grid-column: 2/span 1;
    height: 56px;
    font-size: 15px;
    color: #969696;
    cursor: pointer;
  }
  .my i {
    font-size: 18px;
    font-style: normal;
  }

  .show {
    width: 100px;
    background-color: #fff;
    margin-left: -23px;
  }

  .ul {
    list-style: none;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    border-top: none;
  }
  .li {
    width: 98px;
    border-bottom: 1px solid #eee;
    height: 50px;
    line-height: 50px;
  }

  .more {
    border: 1px solid #eee;
    visibility: hidden;
    position: absolute;
    left: 164px;
    top: 256px;
    list-style: none;
    color: #969696;
    background: #fff;
  }

  .myInbox {
    border-bottom: 1px solid #eee;

    width: 98px;

    height: 50px;
    line-height: 50px;
  }

  .signup {
    grid-column: 3/span 1;
    align-self: center;

    font-size: 15px;
    height: 38px;
    line-height: 38px;
    border: 1px solid rgba(236, 97, 73, 0.7);
    cursor: pointer;
    color: rgb(236, 97, 73);
    border-radius: 4px;
  }
  .write_vtn {
    grid-column: 4/span 1;
    height: 56px;
    align-self: center;
    font-size: 15px;
    height: 38px;
    line-height: 38px;
    width: 80px;
    cursor: pointer;
    color: #fff;
    border-radius: 4px;
    background-color: #ea6f5a;
  }
  .write_vtn_disabled {
    grid-column: 4/span 1;
    height: 56px;
    align-self: center;
    width: 80px;
    font-size: 15px;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
    color: #fff;
    border-radius: 4px;
    background-color: #aaa;
    cursor: not-allowed;
  }
  .write_btn_pic1 {
    display: inline-block;
    width: 100px;
    height: 38px;
    line-height: 38px;
    font-size: 15px;
    color: #fff;
    border-radius: 4px;
    background-color: #ea6f5a;
    cursor: pointer;
  }
}
</style>