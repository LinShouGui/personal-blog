<template >
    <div class="NotFound">
      <div class="wrap">
        <h1>哎呀,您走远了 !</h1>
        <p><a @click="goHome" href="javascript:;">请重回主页</a></p>
      </div>

    </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.replace({ path: "/" });
    }
  }
};
</script>

<style lang="css" scoped>
h1,
p {
  margin: 0;
}
.NotFound {
  grid-column: 2/span 1;
  grid-row: 2/span 1;
  margin: 0 auto;
  padding-top: 10px;
  text-align: center;
}
.wrap {
  cursor: default;
  padding-top: 130px;
  margin: auto;
  text-align: center;
}
@media only screen and (min-width: 1029px) {
  .wrap h1 {
    font-size: 5rem;
    font-weight: 500;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .wrap h1 {
    font-weight: 500;
  }
}
.wrap p {
  margin-top: 4rem;
}
.wrap p a {
  display: block;
  color: #000;
  text-decoration: underline;
  font-size: 2rem;
}
.wrap p a:hover {
  opacity: 0.8;
}
</style>
