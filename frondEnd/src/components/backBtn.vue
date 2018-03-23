<template>
    <div class="wrapperBtn">
        <div class="backBtn" @click="toHome"><i>←</i>后退</div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
.backBtn i {
  font-size: 20px;
  letter-spacing: 18px;
}
.backBtn {
  background-color: aqua;
  color: #aaa;
  width: 40px;
  height: 40px;
  line-height: 50px;
  transition: all 0.3s;
}
.wrapperBtn {
  width: 50px;
  height: 50px;
  border: 5px solid aqua;
  border-radius: 10px;
}
</style>