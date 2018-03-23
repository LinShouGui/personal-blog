<template>
    <div class="wrapperVideoPage">
            <div  class="videoWrapper" v-for="item in videoArray" :key="item.key">
                <video-item :src="item['src']" :mark= "item.key"></video-item>
            </div>
    </div>
</template>
<script>
import api from "../api/api.js";
import getElement from "../assets/js/getElementOfVideoPage.js";
import videoItem from "./videoItem.vue";
export default {
  data() {
    return {
      videoArray: [
        // {
        //   src: "大来",
        //   state: true,
        //   videoClass: "video0",
        //   key: 0,
        //   x: 0,//记录进度条最左侧距离视口左边缘的距离
        //   y: 0,//同上
        //   isDrag: false
        // },
      ],
      videoList: []
    };
  },
  components: {
    videoItem
  },
  mounted() {
    var that = this;
    api.getVideoList().then(({ data: { code, message } }) => {
      if (code == 200) {
        this.videoArray = message;
        setTimeout(() => {
          let allVideos = document.querySelectorAll("video");
          that.videoList = allVideos;
        }, 0);
      } else if (code == -200) {
        that.$notify.error({
          message: message,
          offset: 100
        });
      }
    });
  }
};
</script>
<style>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .wrapperVideoPage {
    margin-top: 100px;
  }
}
@media only screen and (min-width: 1029px) {
  .wrapperVideoPage {
    width: 1350px;
    margin-top: 100px;
    padding-left: 245px;
  }
}
.videoWrapper {
  position: relative;
  display: inline-block;
}
</style>
