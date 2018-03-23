<template>
    <div class="side-tool">
        <div class="fixed_totop" id="fixed_totop" ref="fixed_totop" @mouseenter="show=true" @mouseout="show=false" @click="toTop($event)" data-title="回到顶部">
           <label :class="{'fixed_labelCG':show,'fixed_label':!show}" ref="fixed_label" for="fixed_totop">回到顶部</label>
        </div>
        <div class="fixed_share"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {},
  methods: {
    toTop(e) {
      (document.documentElement.scrollTop = 0) || (document.body.scrollTop = 0);
    }
  },
  mounted() {
    var scrollT,
      element = this.$refs.fixed_totop,
      offset = 200,
      label = this.$refs.fixed_label;
    window.addEventListener("scroll", () => {
      scrollT = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollT > offset) {
        element.style.visibility = "visible";
      } else {
        element.style.visibility = "hidden";
      }
    });
  }
};
</script>
<style>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .side-tool {
    z-index: 9;
    position: fixed;
    right: 10px;
    bottom: 60px;
    height: 100px;
    width: 50px;
    cursor: pointer;
    cursor: default;
  }
}

@media only screen and (min-width: 1029px) {
  .side-tool {
    z-index: 9;
    position: fixed;
    right: 40px;
    bottom: 50px;
    height: 100px;
    width: 50px;
    cursor: pointer;
    cursor: default;
  }
}

.fixed_totop {
  visibility: visible;
  width: 50px;
  height: 50px;
  background: transparent;
  color: #000;
  border: 1px solid #dcdcdc;
  position: relative;
  cursor: pointer;
}
@keyframes ants {
  /*动画*/
  to {
    background-position: 100%;
  }
  from {
    background-position: 0%;
  }
}
.fixed_label {
  transition: opacity 0.5s ease-out; /*小型动画*/
  text-align: center;
  opacity: 0;
  position: absolute;
  width: 75px;
  height: 25px;
  right: 55px;
  top: 12px;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(
        45deg,
        #fb3 25%,
        #58a 0,
        #58a 50%,
        #fb3 0,
        #fb3 75%,
        #58a 0
      )
      0 / 15px 10px;
  animation: ants 1s linear infinite;
  cursor: default;
}
.fixed_labelCG {
  text-align: center;
  transition: opacity 0.5s ease-out;
  position: absolute;

  cursor: pointer;
  opacity: 1;
  width: 75px;
  height: 25px;
  right: 55px;
  top: 12px;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(
        45deg,
        #fb3 25%,
        #58a 0,
        #58a 50%,
        #fb3 0,
        #fb3 75%,
        #58a 0
      )
      0 / 15px 15px;
  animation: ants 1s linear infinite;
}
.fixed_share {
  display: none;
  width: 50px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  color: #000;
  background: transparent;
  text-align: center;
  border: 1px solid #dcdcdc;
  overflow: hidden; /* display:none; */
  cursor: pointer;
}
.fixed_totop::before {
  content: "";
  height: 18px;
  width: 18px;
  display: block;
  color: #eee;
  border: 5px solid #333;
  border-left-width: 0;
  border-bottom-width: 0;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  position: absolute;
  top: 17px;
  left: 14px;
}
.fixed_share::before {
  display: table;
  height: 12px;
  width: 20px;
  top: 68px;
  left: 16px;
  background: #333;
}
.fixed_share:after {
  display: table;
  height: 10px;
  width: 18px;
  top: 72px;
  left: 12px;
  border-left: 2px #333 solid;
  border-bottom: 2px #333 solid;
}
.fixed_share:before,
.fixed_share:after {
  content: "";
  display: table;
  position: absolute;
}
.fixed_totop:hover {
  background-color: hsla(0, 0%, 71%, 0.1);
}
.fixed_share:hover {
  background-color: hsla(0, 0%, 71%, 0.1);
}
</style>