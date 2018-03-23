<template>
    <div class="wrapperUnique">

            <el-tabs tab-position="left">
                <el-tab-pane label="发送消息" class="itemFirst"  
                        v-loading="isLoading"
                        element-loading-text="发送消息中"
                        element-loading-spinner="el-icon-loading">
                        <div >
                            <p>收件人</p>
                            <el-input
                                    size="medium"
                                  
                                    placeholder="请输入收件人"
                                    suffix-icon="el-icon-search"
                                    v-model="receiveName">
                            </el-input>
                        </div>
                        <div>
                            <p>主题</p> 
                            <el-input
                                    size="medium"
                                    placeholder="请输入标题"
                                    suffix-icon="el-icon-message"
                                    v-model="title">
                            </el-input>
                        </div>
                        <div>
                            <p>正文</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    suffix-icon="el-icon-edit"
                                    placeholder="请输入内容"
                                    v-model="content">
                            </el-input>
                        </div>
                        <div>
                            <el-button type="primary" size="medium"  @click="checkReceiveName">发送消息</el-button>
                            <el-button type="primary" size="medium" @click="toHome">返回首页</el-button>
                        </div>

                </el-tab-pane>
                <el-tab-pane label="已接收消息">
                    <ul  class="itemSecond">
                        <li v-for="message in messages" >
                            <a @click="showDetail(message)">                           
                                <p class="msgTitle">{{message.title}}</p>
                                <div class="msgwrap">
                                    <p>{{message.sendName}}</p>
                                    <p>{{message.sendTime}}</p>
                                </div>

                            </a>
 
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>

    </div>
</template>
<script>
import api from "../api/api.js";
export default {
  data() {
    return {
      receiveName: "",
      title: "",
      content: "",
      isLoading: false,
      receiveTitle: "",
      receiveContent: "",
      messages: []
    };
  },
  methods: {
    showDetail(message) {
      this.$confirm(
        "正文：" +
          message.content +
          "  发送人：" +
          message.sendName +
          "  发送时间：" +
          message.sendTime,
        message.title,
        {
          confirmButtonText: "已阅"
        }
      )
        .then(() => {
          let rawMesCount = localStorage.getItem("mesCount");
          let mesCount = parseInt(rawMesCount);
          if (mesCount <= 0) {
            return false;
          }
          mesCount = mesCount - 1;
          if (mesCount <= 0) {
            return false;
          }
          rawMesCount = mesCount + "";
          localStorage.setItem("mesCount", rawMesCount);
        })
        .catch(error => {
          console.log("这是element(confirm)的error信息");
        });
    },
    checkReceiveName() {
      if (this.receiveName == "" || this.title == "" || this.content == "") {
        this.$notify({
          title: "提示",
          message: "请填全所有字段",
          offset: 100,
          duration: 2000
        });
        return false;
      }
      this.isLoading = true;
      api
        .getUserByName({ name: this.receiveName })
        .then(({ data: { code } }) => {
          this.isLoading = false;
          if (code == 200) {
            this.$notify({
              title: "提示",
              message: "收件人有效",
              type: "success",
              offset: 100,
              duration: 2000
            });
            this.sendMessage();
          } else {
            this.$notify.error({
              title: "提示",
              message: "收件人无效",
              duration: 2000,
              offset: 100
            });
          }
        })
        .catch(err => {
          console.log("error happending :", err.toString());
        });
    },
    sendMessage() {
      let user = this.$store.state.message;
      if (!user) {
        return false;
      }
      let sendTime = new Date().toLocaleString();
      this.isLoading = true;
      api
        .sendMessage({
          sendName: user,
          receiveName: this.receiveName,
          sendTime: sendTime,
          title: this.title,
          content: this.content
        })
        .then(({ data: { code, message } }) => {
          this.isLoading = false;
          if (code == 200) {
            this.$alert(message, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ path: "/" });
              }
            });
          } else {
            this.$notify.error({
              title: "提示",
              message: message,
              duration: 2000,
              offset: 100
            });
          }
        })
        .catch(err => {
          console.log("connect to server happen a error: ", err.toString());
        });
    },
    getMessage() {
      let user = this.$store.state.message;
      if (user) {
        api
          .getMessage({ name: user })
          .then(({ data: { code, messages, count } }) => {
            if (code == 200) {
              this.messages = this.messages.concat(messages);
            }
          })
          .catch(err => {
            console.log("getMessageCount happen a error: ", err.toString());
          });
      }
    },
    toHome() {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    this.getMessage();
  }
};
</script>
<style>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .el-tabs__content {
    margin-top: 100px;
    width: 373px;
  }
  .wrapperUnique {
    margin-top: 100px;
  }
}
@media only screen and (min-width: 1029px) {
  .el-tabs__content {
  }
  .wrapperUnique {
    width: 1000px;
    margin: 100px 100px auto 200px;
  }
}
.itemFirst {
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.itemFirst > div {
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.itemFirst > div > p {
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: left;
}

.itemSecond > li {
  display: block;
}
.itemSecond a {
  cursor: pointer;

  border: 1px dashed red;
  margin: 20px;
  height: 60px;
  display: flex;
  flex-direction: column;
}
.msgwrap {
  display: flex;
  height: 35px;
  line-height: 40px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
}
.msgTitle {
  padding: 5px 0px 0px 10px;
  height: 20px;
  width: 200px;
}
</style>