<template>
  <div :class="{'nav':!kai,'nav1':kai}">
      <logo></logo>
      <navMain></navMain>
      <navRight></navRight>
  </div>
</template>

<script>
import logo from "./logoWrapper";
import navMain from "./navMain";
import navRight from "./navRight";
export default {
  name: "nav",
  data() {
    return {};
  },
  components: {
    logo,
    navMain,
    navRight
  },
  computed: {
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
    }
  }
};
</script>

<style >
@media screen and (min-width: 320px) and (max-width: 480px) {
  .nav {
    z-index: 9999;
    background-color: #fff;
    border-color: #f0f0f0;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 56px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    user-select: none;
  }
  .nav1 {
    z-index: 9999;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 56px;
    border-bottom: 1px solid #eee;
    border-color: #2f2f2f;
    background-color: #3f3f3f;
    color: #c8c8c8;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    user-select: none;
  }
}

@media only screen and (min-width: 1029px) {
  .nav {
    z-index: 9999;
    background-color: #fff;
    border-color: #f0f0f0;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: grid;
    grid-template-columns: 240px 1fr 400px;
    height: 56px;
    justify-content: center;
    border-bottom: 1px solid #eee;
    user-select: none;
  }
  .nav1 {
    z-index: 9999;
    background-color: #fff;
    border-color: #f0f0f0;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: grid;
    grid-template-columns: 240px 1fr 400px;
    height: 56px;
    justify-content: center;
    border-bottom: 1px solid #eee;
    border-color: #2f2f2f;
    background-color: #3f3f3f;
    color: #c8c8c8;
    user-select: none;
  }
}
</style>
