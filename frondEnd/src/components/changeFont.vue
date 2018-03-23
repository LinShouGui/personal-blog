<template>
    <div :class="{'changeFont':!kai,'changeFont1':kai}">
        <div class="cfg_wrapper" id="cfg_wrapper">
            <draggable>
                <div>
                    <p>{{dangqian}}</p>
                </div>
                <div class="cfg_start">
                    <div v-if="!kai" @click="toOpen($event)">开</div>
                    <div v-else @click="toClose($event)">关</div>
                </div>
            </draggable>
            <draggable>
                <div v-if="!song" @click="toSong($event)">宋体</div>
                <div v-else @click="toBlack($event)">黑体</div>
                <div v-if="!jian" @click="toSimple($event)">繁体</div>
                <div v-else @click="toHard($event)">简體</div>
            </draggable>
        </div>
    </div>
</template>
<script>
import state from "../store/states.js";
import draggable from "vuedraggable";
export default {
  data() {
    return {};
  },
  components: {
    draggable
  },
  methods: {
    toOpen(e) {
      this.$store.dispatch("TO_OPEN", true);
      this.$store.dispatch("DANG_QIAN", "夜间模式");
    },
    toClose(e) {
      this.$store.dispatch("TO_OPEN", false);
      this.$store.dispatch("DANG_QIAN", "日间模式");
    },
    toSong(e) {
      this.$store.dispatch("TO_SONG", true);
    },
    toBlack(e) {
      this.$store.dispatch("TO_SONG", false);
    },
    toSimple(e) {
      this.$store.dispatch("TO_SIMPLE", true);
    },
    toHard(e) {
      this.$store.dispatch("TO_SIMPLE", false);
    }
  },
  computed: {
    dangqian() {
      return state.dangqian;
    },
    kai() {
      return state.kai;
    },
    song() {
      return state.song;
    },
    jian() {
      return state.jian;
    }
  }
};
</script>
<style scoped>
.changeFont {
  grid-column: 2/span 1;
  grid-row: 2/span 1;
  margin: 0 auto;
  margin-top: 94px;
  text-align: center;
}

.changeFont1 {
  grid-column: 2/span 1;
  grid-row: 2/span 1;
  margin: 0 auto;
  margin-top: 94px;
  text-align: center;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .cfg_wrapper {
    width: 100%;
    height: 400px;
    outline: 3px solid #aaa;
  }

  .cfg_wrapper > div > div {
    cursor: default;
    width: 50%;
    height: 200px;
    float: left;
    line-height: 200px;
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
  }
}

@media only screen and (min-width: 1029px) {
  .cfg_wrapper {
    width: 400px;
    height: 400px;
    outline: 3px solid #aaa;
  }

  .cfg_wrapper > div > div {
    cursor: default;
    width: 200px;
    height: 200px;
    float: left;
    line-height: 200px;
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
  }
}
</style>
