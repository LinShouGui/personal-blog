<template>
    <div class="outerWrapper">
        <div class="realWrapper">
            <h1>在这里,你可以上传你喜欢的视频</h1>
            <!-- <form action="http://localhost:3009/api/uploadVideo" method="post" enctype="multipart/form-data"> -->
                  
            <!-- </form> -->
            <div class="uploadWrapper">
                <div class="uploadMain">
                  <input type="file" name="fileInput" accept="video/mp4"  @change="fileChange()">
            
                  <el-button class="uploadButton" type="primary" :loading="loadFlag"
                         @click="uploadVideo()">{{loadText}}</el-button>
                </div>

                  <div v-if="fileObj" class="fileInfo">
                      <div class="fileInfo">
                        <p >{{name}}</p>
                        <p>{{size}}</p>
                        <p>{{type}}</p>
                      </div>
                     <el-progress :percentage="curProcess" :status="curStatus"></el-progress> 
                  </div>                   
                </div>
        </div>
    </div>
</template>
<script>
/**
 * @augments form标签提交文件
 *             <form action="http://localhost:3009/api/uploadVideo" method="post" enctype="multipart/form-data" >
                <input name="fileInput" type="file" accept="video/mp4"  @change="fileChange()">
                <input type="submit"  value="上传视频" @click="uploadVideo()">
            </form>
 */
import api from "../api/api.js";
import store from "../store/states.js";

export default {
  data() {
    return {
      name: "",
      size: "",
      type: "",
      fileObj: null,
      loadFlag: false,
      loadText: "上传文件",
      curProcess: 0,
      curStatus: ""
    };
  },
  methods: {
    fileChange() {
      //改变文件初始化进度条的状态
      this.curProcess = 0;
      this.curStatus = "";

      var fileInput = document.querySelector("input[name='fileInput']")
        .files[0];
      this.fileObj = fileInput;
      if (this.fileObj) {
        this.name = fileInput.name;
        var fileSize = 0;
        if (fileInput.size > 1024 * 1024) {
          fileSize =
            (
              Math.round(fileInput.size * 100 / (1024 * 1024)) / 100
            ).toString() + "MB";
        } else {
          fileSize =
            (Math.round(fileInput.size * 100 / 1024) / 100).toString() + "KB";
        }
        this.size = fileSize;
        this.type = fileInput.type;
      }
    },
    uploadVideo() {
      var that = this;
      var fileInput = document.querySelector("input[type='file']").files[0];
      if (!fileInput) {
        that.$notify.error({
          title: "警告",
          message: "你未选择文件",
          offset: 100
        });
        return;
      }
      this.fileObj = fileInput;

      var formData = new FormData();
      formData.append("video", this.fileObj);

      that.loadFlag = true;
      that.loadText = "上传文件中";

      api
        .uploadVideo(formData)
        .then(({ data: { code, message } }) => {
          that.loadText = "上传文件";
          that.loadFlag = false;
          if (code == 200) {
            // console.log("上传成功");
            that.curProcess = 100;
            that.curStatus = "success";
            setTimeout(() => {
              that.$notify({
                title: "成功",
                message: message,
                type: "success",
                offset: 100
              });
            }, 1000);
          } else {
            //console.log("上传失败");
            that.curProcess = 50;
            that.curStatus = "exception";
            setTimeout(() => {
              that.$notify({
                title: "错误",
                message: message,
                type: "error",
                offset: 100
              });
              that.curProcess = 0;
            }, 1000);
          }
        })
        .catch(err => {
          console.log("errorHappened:", err.toString());
        });
    }
  }
};
</script>
<style>
.realWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .outerWrapper {
    margin-top: 100px;
  }
}
@media only screen and (min-width: 1029px) {
  .outerWrapper {
    grid-row: 2/span 1;
    grid-column: 2/span 1;
    padding-top: 10px;
    margin-top: 100px;
  }
  .realWrapper > h1 {
    text-align: center;
    display: inline;
  }
  .uploadWrapper {
    display: flex;
    align-self: center;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    height: 250px;
  }
  .uploadMain {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .fileInfo {
    margin-left: 20px;
  }
  .uploadMain input:first-child {
    width: 300px;
    height: 30px;
    border: 3px solid #aaa;
    outline: none;
    background: #aaa;
    border-radius: 3px;
    box-shadow: 3px 3px 5px #888888;
  }

  .uploadButton {
    border: 3px solid #aaa;
    outline: none;
    background: #aaa;
    border-radius: 3px;
    box-shadow: 3px 3px 5px #888888;
  }
}
</style>
