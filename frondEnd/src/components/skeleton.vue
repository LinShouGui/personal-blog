<template>
              <aritcle class="skeleton">
                    <div class="skeletonTitle"></div>
                    <div class="skeletonWrapClassifyAndName">
                          <div class="articleClassify" ></div>
                          <div class="ArticleName" style="margin-left:10px;"></div>
                    </div>
                    <div class="skeletonCreatAt">
                       
                    </div>
                <div class="home_main" style="margin-top:10px;"><div class="skeletonContent"></div></div>
                <div class="skeletonReadMore"></div>
            </aritcle>  
</template>
<script>
export default {};
</script>
<style>
.skeleton .skeletonTitle,
.skeleton .skeletonCreatAt,
.skeleton .skeletonContent,
.skeleton .skeletonReadMore,
.skeletonWrapClassifyAndName > div {
  background: rgb(194, 207, 214);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%
  );
  background-size: 20rem 20rem;
  animation: skeleton-stripes 1s linear infinite;
}
@keyframes skeleton-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20rem 0;
  }
}
.skeletonTitle {
  margin-top: 10px;
  width: 135px;
  height: 30px;

  align-self: center;
}

.skeletonWrapClassifyAndName {
  height: 25px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.skeletonCreatAt {
  margin-top: 20px;
  width: 200px;
  height: 25px;
  align-self: center;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .skeleton {
    display: inline-block;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #d2d2d2;
  }
  .skeletonContent {
    align-self: center;
    height: 30px;
    width: 300px;
    margin-left: 50px;
  }
  .skeletonReadMore {
    width: 93px;
    height: 20px;
    align-self: flex-end;
    margin: 5px;
  }
}
@media only screen and (min-width: 1029px) {
  .skeleton {
    width: 1000px;
    height: 357px;
    display: inline-block;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #d2d2d2;
  }

  .skeletonContent {
    align-self: center;
    height: 25px;
    width: 850px;
    margin-left: 50px;
  }
  .skeletonReadMore {
    width: 103px;
    height: 22px;

    align-self: flex-end;
    margin: 5px;
  }
}
</style>
