<template>
  <div :class="{'root':!kai&&!song,'root1':kai&&!song,
    'rootSong':kai&&song,'rootSong1':!kai&&song }">
    <VNav></VNav>
    <transition :name="name" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
    <sideTool v-if="showSideBar"></sideTool>
  </div>
</template>

<script>
import VNav from "./components/nav";
import sideTool from "./components/sideTool";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    VNav,
    sideTool
  },
  computed: {
    key() {
      return this.$route.name
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
    dangqian() {
      return this.$store.state.dangqian;
    },
    kai() {
      return this.$store.state.kai;
    },
    song() {
      return this.$store.state.song;
    },
    jian() {
      return this.$store.state.jian;
    },
    name() {
      let curAnim = null;
      let routeName = this.$route.name;
      if (
        routeName == "Reg" ||
        routeName == "Login" ||
        routeName == "toWritePW"
      ) {
        curAnim = "slide";
      }
      if (routeName == "toWritePage") {
        curAnim = "slideFromRight";
      }
      return curAnim || "fade";
    },
    showSideBar() {
      let routeName = this.$route.name;
      let flag = false;
      if (
        routeName == "home" ||
        routeName == "article" ||
        routeName == "myArticles" ||
        !routeName
      ) {
        flag = true;
      }
      return flag;
    }
  },
  methods: {
    changeBg() {
      var c = document.querySelector("#evanyou");
      var x = c.getContext("2d"),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 90,
        q,
        m = Math,
        r = 0,
        u = m.PI * 2,
        v = m.cos,
        z = m.random;
      c.width = w * pr;
      c.height = h * pr;
      x.scale(pr, pr);
      x.globalAlpha = 0.6;

      function d(i, j) {
        x.beginPath();
        x.moveTo(i.x, i.y);
        x.lineTo(j.x, j.y);
        var k = j.x + (z() * 2 - 0.25) * f,
          n = y(j.y);
        x.lineTo(k, n);
        x.closePath();
        r -= u / -50;
        x.fillStyle =
          "#" +
          (
            ((v(r) * 127 + 128) << 16) |
            ((v(r + u / 3) * 127 + 128) << 8) |
            (v(r + u / 3 * 2) * 127 + 128)
          ).toString(16);
        x.fill();
        q[0] = q[1];
        q[1] = { x: k, y: n };
      }
      function y(p) {
        var t = p + (z() * 2 - 1.1) * f;
        return t > h || t < 0 ? y(p) : t;
      }

      x.clearRect(0, 0, w, h);
      q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }];
      while (q[1].x < w + f) d(q[0], q[1]);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .root {
    /*白黑简*/
    margin-top: 56px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s;
  }

  .root1 {
    /*红黑简*/
    margin-top: 56px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #3f3f3f;
    color: #c8c8c8;
    transition: all 0.3s;
  }

  .rootSong {
    /*红宋简*/
    margin-top: 56px;
    font-family: Georgia, Times New Roman, Times, Songti SC, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #3f3f3f;
    color: #c8c8c8;
    transition: all 0.3s;
  }

  .rootSong1 {
    /*白宋简*/
    margin-top: 56px;
    font-family: Georgia, Times New Roman, Times, Songti SC, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s;
  }
}

@media only screen and (min-width: 1029px) {
  .root {
    /*白黑简*/
    display: grid;
    grid-template-rows: 56px 1fr;
    grid-template-columns: 1fr 1000px 1fr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s;
  }

  .root1 {
    /*红黑简*/
    display: grid;
    grid-template-rows: 56px 1fr;
    grid-template-columns: 1fr 1000px 1fr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #c8c8c8;
    transition: all 0.3s;
  }

  .rootSong {
    /*红宋简*/
    display: grid;
    grid-template-rows: 56px 1fr;
    grid-template-columns: 1fr 1000px 1fr;
    font-family: Georgia, Times New Roman, Times, Songti SC, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #c8c8c8;
    transition: all 0.3s;
  }

  .rootSong1 {
    /*白宋简*/
    display: grid;
    grid-template-rows: 56px 1fr;
    grid-template-columns: 1fr 1000px 1fr;
    font-family: Georgia, Times New Roman, Times, Songti SC, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.3s;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.48s ease;
}
.slide-enter,
.slide-leave-active {
  opacity: 0;
  transform: translateY(-80px);
}
.slideFromRight-enter-active,
.slideFromRight-leave-active {
  transition: all 0.48s ease;
}
.slideFromRight-enter,
.slideFromRight-leave-active {
  opacity: 0;
  transform: translateX(80px);
}

body {
  width: 100%;
  height: 100%;

  user-select: none;
}

.evanyou {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 56px;
  top: 0;
  left: 0;
  z-index: -10;
  transition: all 0.3s;
}
.evanyou_night {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 56px;
  top: 0;
  left: 0;
  z-index: -10;
  background-color: #3f3f3f;
  transition: all 0.3s;
}
</style>
