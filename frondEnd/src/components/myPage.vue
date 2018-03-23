<template>
    <div class="wrapperMe">
        <el-form  label-width="80px" v-model="formData" @submit.prevent="submit">
            <el-form-item class="formItem" label="选择头像">
                <el-upload id="newUpload" ref="newUpload" class="avatar-uploader" action="https://api.xx.com/api/updateUserAva" 
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload"
                       >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else id="browse" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                
            </el-form-item>
            <el-form-item class="formItem" label="昵称">
                <el-input v-model="currentUser" disabled > </el-input><label >(暂不支持修改)</label>
            </el-form-item>
            <el-form-item class="formItem" label="性别">
                <el-tooltip :content="formData.sex" placement="top">
                    <el-switch v-model="formData.sex"  active-color="#13ce66" inactive-color="#ff4949"   active-value="男" inactive-value="女">
                    </el-switch>
                </el-tooltip>
                <label >(必填项)</label>
            </el-form-item>
            <el-form-item class="formItem" label="邮箱">
                    <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="出生日期">
                    <el-date-picker type="date" placeholder="选择出生日期" v-model="formData.date" style="width:300px;">
                    </el-date-picker>
            </el-form-item>
            <el-form-item class="formItem" label="地址">
                    <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item class="formItem" label="个性签名">
                <el-input type="textarea" placeholder="在这里写你的个性签名" v-model="formData.bio"></el-input>
            </el-form-item>
            <el-form-item class="formitem">
                <el-button type="primary" @click="saveInfo" :loading="load">{{btnText}}</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
//action="http://localhost:3009/api/updateUserAva"
import api from "../api/api.js";
import store from "../store/states.js";

import Qiniu from "qiniu-js";
export default {
  data() {
    return {
      labelPosition: "top",
      formData: {
        email: "",
        address: "",
        date: "",
        sex: "男",
        bio: ""
      },
      imageUrl: null,
      btnText: "保存信息",
      load: false
    };
  },
  computed: {
    currentUser() {
      return store.message;
    }
  },
  mounted() {
    var that = this;
    api
      .getUserAvaByName({ name: store.message })
      .then(({ data: { code, user } }) => {
        if (code == 200) {
          if (!user) {
            return false;
          }
          this.formData = {
            email: user.email || "",
            address: user.address || "",
            date: user.date || "",
            sex: user.sex || "男",
            bio: user.bio || ""
          };
          this.imageUrl = user.avatar;

          if (this.imageUrl) {
            that.$message.success({
              message: "成功获取用户信息",
              customClass: "errMsg"
            });
          } else {
            that.$message.error({
              message: "未取得头像信息,请上传",
              customClass: "errMsg"
            });
          }
        } else {
          that.$message({
            message: "未查找到该用户",
            type: "warning"
          });
        }
      })
      .catch(err => {
        that.$message("发生不被处理的错误");
        console.log(`用户页请求服务器发生错误:${err}`);
      });
  },
  methods: {
    beforeAvatarUpload(file) {
      var that = this;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 0.3;
      if (!isJPG && !isPNG) {
        that.$message.error({
          message: "上传头像只能是jpeg格式或png格式",
          customClass: "errMsg"
        });
        return false;
      }
      if (!isLt2M) {
        that.$message.error({
          message: "上传头像图片大小不能超过300KB!",
          customClass: "errMsg"
        });
        return false;
      }
      this.imageUrl = URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file); //将文件编码为url
      reader.onload = function(e) {
        var url = e.target.result; //readAsDataURL调用后的结果
        api
          .updateUserAva({ name: store.message, file: url })
          .then(({ data: { code, message } }) => {
            if (code == 200) {
              that.$message.success({
                message: message,
                customClass: "errMsg"
              });
            } else {
              that.$message.success({
                message: message,
                customClass: "errMsg"
              });
            }
          })
          .catch(err => {
            that.$message("发生不被处理的错误");
            console.log("err" + err.toString());
          });
      };
    },
    saveInfo() {
      var that = this; //为了防止this指向被篡改
      that
        .$confirm("确认提交吗?", "提示", {})
        .then(() => {
          this.load = true;
          this.btnText = "保存中";
          api
            .updateUser({
              name: this.currentUser,
              email: this.formData.email,
              address: this.formData.address,
              date: this.formData.date,
              sex: this.formData.sex,
              bio: this.formData.bio
            })
            .then(({ data: { code, message } }) => {
              this.btnText = "保存信息";
              this.load = false;
              if (code == 200) {
                //console.log("保存信息成功");
                that.$message({
                  message: "保存信息成功",
                  type: "success"
                });
                this.$router.push({ path: "/" });
              } else if (code == 401) {
                //console.log("保存信息发生错误");
                that.$message.error("保存信息发生错误");
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                }, 500);
                return false;
              }
            });
        })
        .catch(error => {
          that.$message("发生不被处理的错误");
          console.log("error:", error.toString());
        });
    }
  }
};
</script>
<style>
.el-form-item {
  text-align: left;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .wrapperMe {
    margin-top: 100px;
  }
  .errMsg {
    position: absolute;
    top: 56px;
    left: 200px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    width: 200px;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #bbb;
    cursor: not-allowed;
    width: 200px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    width: 200px;
  }
}
@media only screen and (min-width: 1029px) {
  .wrapperMe {
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    margin-top: 50px;
    width: 1000px;
  }
  .errMsg {
    position: absolute;
    top: 56px;
    left: 400px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    width: 300px;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #bbb;
    cursor: not-allowed;
    width: 300px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    width: 300px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>