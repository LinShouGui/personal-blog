<template>
    <div class="wrapperBtn">
        <div class="editBtn" @click="toEdit"><i>→</i>修改</div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toEdit() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.editBtn i {
  font-size: 20px;
  letter-spacing: 18px;
}
.editBtn {
  background-color: aqua;
  color: #aaa;
  width: 40px;
  height: 40px;
  line-height: 40px;
  transition: all 0.3s;
}
.wrapperBtn {
  width: 50px;
  height: 50px;
  border: 5px solid aqua;
  border-radius: 10px;
}
</style>