<template>
  <div class="wrapGames">
      <div class="wrapAgainGames">
      <router-link :to="{path:'/games',params:game.gameName}|gameUrlFormat"
               class="gameItem" v-for="game in games" :key="game.id">
                <div class="imgArea">
                    <img class="gamePic" :src="game.imgPathDev" alt="游戏封面" srcset="">
                </div>
                <span class="titleArea">
                                {{game.gameTitle}}
                </span>
        </router-link>
      </div>
  </div>
</template>
<script>
import yellowMan from "@/assets/img/yellowMan.jpg"; //这才是在vue中引入图片的正确姿势
import jump from "@/assets/img/jump.jpg";
export default {
  data() {
    return {};
  },
  computed: {
    games() {
      return [
        {
          id: 0,
          gameName: "yellowMan",
          gameTitle: "小黄人",
          // imgPathDev: "../assets/img/bg.jpg",直接字符串会被当成字符串处理
          imgPathDev: yellowMan
        },
        {
          id: 1,
          gameName: "jump",
          gameTitle: "跳一跳",
          imgPathDev: jump
        }
      ];
    }
  }
};
</script>
<style>
.wrapGames {
  width: 100%;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .wrapAgainGames {
    display: flex;
    flex-direction: column;
    flex: auto;
  }
}
@media only screen and (min-width: 1029px) {
  .wrapAgainGames {
    margin: 100px 200px;
    width: 1100px;
    display: flex;
    flex-direction: row;
    flex: auto;
  }
}
.gameItem {
  border: 2px solid aqua;
  margin: 10px 50px;
  background: transparent;
  width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.gamePic {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.imgArea {
  text-align: center;
  cursor: pointer;
}
.titleArea {
  text-align: center;
}
.titleArea a {
  color: teal;
}
</style>

