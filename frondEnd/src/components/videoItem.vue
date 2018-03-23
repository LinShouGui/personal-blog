<template>
    <div :id="{common:'videoWrapper',mark:mark}|videoSpecific">
            <video :class="{common:'videoClass',mark:mark}|videoSpecific" width="320" height="240" >
                    <source :src="src|videoUrlFormat" type="video/mp4">noOk</source>
                    <!-- <source src="http://localhost:3009/api/video/ag/dog.mp4" type="video/mp4" >nook</source> -->
                </video>
                <div class="control">
                    <img  v-if="state" class="playButton" src="../assets/img/play.png" @click="play()">
                    <img  v-else class="pauseButton" src="../assets/img/pause.png" @click="pause()" >
                    <div class="processBar" @mousemove="handleMSMove($event)" @click="handleClick($event)">
                        <div class="dragedArea"   style="width:0px;"></div>
                        <div class="processBtn"  
                                @mousedown="handleMSDown($event)"
                                @mouseup="handleMSUp($event)"
                                >
                        </div>
                    </div>
                    <img  class="fullScreen" src="../assets/img/fullscreen.png" @click="fullScreen()" >
                </div>
    </div>

</template>
<script>
import getElement from "../assets/js/getElementOfVideoPage.js";
import { ServerRequest } from 'http';

export default {
  data() {
    return {
      state: true,
      x: 0, //记录进度条最左侧距离视口左边缘的距离
      y: 0, //同上
      isDrag: false
    };
  },
  props: ["src", "mark"],
  // props:{
  //     item:{
  //         type:Object,
  //         default:null
  //     }
  // },
  computed: {
    pcsBtn() {
      return document.querySelector(`#videoWrapper${this.mark} .processBtn`);
    },
    video() {
      return document.querySelector(
        `#videoWrapper${this.mark} .videoClass${this.mark}`
      );
    },
    area() {
      return document.querySelector(`#videoWrapper${this.mark} .dragedArea`);
    },
    bar() {
      return document.querySelector(`#videoWrapper${this.mark} .processBar`);
    }
  },
  methods: {
    returnThisX(e) {
      return e.clientX - this.pcsBtn.offsetLeft;
    },
    returnThisY(e) {
      return e.clientY - this.pcsBtn.offsetTop;
    },
    handleMSDown(e) {
      //记录点击滑块时滑块距离最左端处的距离
      this.isDrag = true;
      this.x = e.clientX - this.pcsBtn.offsetLeft; //这个值不管是第几次点击,都获取到进度条最左侧距离视口左端的距离
      this.y = e.clientY - this.pcsBtn.offsetTop; //e.clientX和滑块offsetLeft,同时变,反而都没变

      this.pcsBtn.style.cursor = "pointer";
      //为了一次完整的down-move-up而准备

      if (this.video) {
        this.video.pause();
      }
    },
    handleMSMove(e) {
      if (!this.isDrag) {
        //为了一次完整的down-move-up而准备
        return;
      }
      this.pcsBtn.style.cursor = "pointer";
      this.area.style.width = e.clientX - this.x + "px"; //**改变绿色进度条的长度,*(e.clientX始终大于this.x)
      //  area.style.height=(e.clientY-item.y)+'px';
      if (parseInt(this.area.style.width) > this.bar.clientWidth) {
        //绿色进度条不超过总进度条
        this.area.style.width = this.bar.clientWidth + "px";
      }
      this.pcsBtn.style.left = e.clientX - this.x + "px"; //**滑块的位置
      this.pcsBtn.style.top = e.clientY - this.y + "px";

      //滑块位置不突破总进度条的矩形区域
      if (parseInt(this.pcsBtn.style.left) < 0) {
        this.pcsBtn.style.left = 0 + "px";
      }
      if (parseInt(this.pcsBtn.style.top) < 0) {
        this.pcsBtn.style.top = 0 + "px";
      }
      if (
        parseInt(this.pcsBtn.style.left) >
        this.bar.clientWidth - this.pcsBtn.clientWidth
      ) {
        this.pcsBtn.style.left =
          this.bar.clientWidth - this.pcsBtn.clientWidth + "px";
      }
      if (
        parseInt(this.pcsBtn.style.top) >
        this.bar.clientHeight - this.pcsBtn.clientHeight
      ) {
        this.pcsBtn.style.top =
          this.bar.clientHeight - this.pcsBtn.clientHeight + "px";
      }
    },
    handleMSUp(e) {

      this.isDrag = false; //为了一次完整的down-move-up而准备
      this.pcsBtn.style.cursor = "pointer";
      let runnedLength = this.area.getBoundingClientRect().width;
      let totalLength = this.bar.getBoundingClientRect().width;
      this.video.currentTime = runnedLength / totalLength * this.video.duration;
      this.video.play();
      this.state = false; //此时的状态是播放,显示的应该是暂停按钮
    },
    handleClick(e) {
      if (this.isDrag) {
        return;
      }
      var barToLeft = this.bar.getBoundingClientRect().left;
      this.pcsBtn.style.cursor = "pointer";
      this.area.style.width = e.clientX - barToLeft + "px";
      this.pcsBtn.style.left = e.clientX - barToLeft + "px";

      if (parseInt(this.area.style.width) > this.bar.clientWidth) {
        this.area.style.width = this.bar.clientWidth;
      }
      if (parseInt(this.pcsBtn.style.left) < 0) {
        this.pcsBtn.style.left = 0 + "px";
      }
      if (parseInt(this.pcsBtn.style.top) < 0) {
        this.pcsBtn.style.top = 0 + "px";
      }
      if (
        parseInt(this.pcsBtn.style.left) >
        this.bar.clientWidth - this.pcsBtn.clientWidth
      ) {
        this.pcsBtn.style.left =
          this.bar.clientWidth - this.pcsBtn.clientWidth + "px";
      }
      if (
        parseInt(this.pcsBtn.style.top) >
        this.bar.clientHeight - this.pcsBtn.clientHeight
      ) {
        this.pcsBtn.style.top =
          this.bar.clientHeight - this.pcsBtn.clientHeight + "px";
      }
      let totalLength = this.bar.getBoundingClientRect().width;
      let runnedLength = this.area.getBoundingClientRect().width;
      this.video.currentTime = runnedLength / totalLength * this.video.duration;
      this.video.play();
      this.state = false;
    },
    play() {
      this.video.play();
      this.state = false;
    },
    pause() {
      this.video.pause();
      this.state = true;
    },
    fullScreen() {
        //上线打开
        // var serverUrl = "https://api.xx.com/api/video/" +
        //             this.$store.state.message +
        //             "/" +
        //             encodeURIComponent(this.src);
        // window.location.href = serverUrl

        //本地打开
        //需要加上http,否则还是在本地主机端口间跳转
        var url = "http://localhost:3009/api/video/" + 
                this.$store.state.message + 
                "/" + encodeURIComponent(this.src)

        window.location.replace(url)

        //"?token="+this.$store.state.token;
    }
  }
};
</script>
<style>
.processBar {
  flex: 1;
  height: 15px;
  line-height: 15px;
  align-self: center;
  background: #262626;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #7992a8;
  border-radius: 8px;
  overflow: visible;
  position: relative;
}
.dragedArea {
  background-color: green;
  height: 15px;
  line-height: 15px;
  border-bottom: 1px solid #7992a8;
  border-top: 1px solid #aaa;
  border-radius: 8px 0px 0px 8px;
  position: absolute;
  top: -1px;
  left: 0px;
}
.processBtn {
  background-color: yellow;
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0px;
  top: -1px;
}
.playButton {
  width: 30px;
  height: 30px;
  margin: 0 10px 0 10px;
}
.pauseButton {
  width: 30px;
  height: 30px;
  margin: 0 10px 0 10px;
}
.fullScreen {
  width: 30px;
  height: 30px;
  margin: 0 10px 0 10px;
}

video {
  border: 10px solid;
  margin: 10px;
}
.control {
  position: absolute;
  width: 320px;
  height: 30px;
  background-color: blue;
  top: 220px;
  left: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
