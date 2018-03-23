<template>
<div class="wrapYellowMan">
  <div class="yellowMan">
    <p id="yellowManInfo" style="visibility:hidden;">
    <div id="box">
        <div id="face"></div>
        <div id="eyeLeft"></div>
        <div id="eyeRight"></div>
        <div id="glass"></div>
        <div id="log"></div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "yellowMan",
  mounted() {
    var eyeLeftPosition = {
      start: [70, 78],
      end: [100, 110]
    };

    var eyeRightPosition = {
      start: [150, 78],
      end: [190, 110]
    };

    var eyeLeftCenterPosition = {
      x:
        (eyeLeftPosition.end[0] - eyeLeftPosition.start[0]) / 2 +
        eyeLeftPosition.start[0],
      y:
        (eyeLeftPosition.end[1] - eyeLeftPosition.start[1]) / 2 +
        eyeLeftPosition.start[1]
    };

    var eyeRightCenterPosition = {
      x:
        (eyeRightPosition.end[0] - eyeRightPosition.start[0]) / 2 +
        eyeRightPosition.start[0],
      y:
        (eyeRightPosition.end[1] - eyeRightPosition.start[1]) / 2 +
        eyeRightPosition.start[1]
    };

    var r = 20;

    var eyeLeft = document.querySelector("#eyeLeft");
    var eyeRight = document.querySelector("#eyeRight");

    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        function(event) {
          let { alpha, beta, gamma } = event;

          eyeLeft.style.left = eyeLeftCenterPosition.x + gamma / 90 * r + "px";
          eyeRight.style.left =
            eyeRightCenterPosition.x + gamma / 90 * r + "px";
          eyeLeft.style.top = eyeRight.style.top =
            eyeLeftCenterPosition.y + beta / 180 * r + "px";

          eyeRight.style.transform = eyeLeft.style.transform = eyeRight.style.WebkitTransform = eyeLeft.style.WebkitTransform =
            "rotate(" + beta + "deg)";
        },
        false
      );
    } else {
      document.querySelector("body").innerHTML =
        "浏览器不支持DeviceOrientationEvent";
    }
  }
};
</script>
<style>
.wrapYellowMan {
  width: 100%;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .yellowMan {
    margin: 200px auto;
  }
}
@media only screen and (min-width: 1029px) {
  .yellowMan {
    margin: 100px 200px;
    width: 1100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: auto;
  }
}

#box {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

#face {
  background-image: url(../assets/img/face.png);
  background-size: cover;
  width: 300px;
  height: 300px;
  position: absolute;
}

#eyeLeft {
  background-image: url(../assets/img/eye.png);
  background-size: cover;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 90px;
  left: 100px;
}

#eyeRight {
  background-image: url(../assets/img/eye.png);
  background-size: cover;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 90px;
  left: 190px;
}

#glass {
  background-image: url(../assets/img/glass.png);
  background-size: cover;
  width: 300px;
  height: 300px;
  position: absolute;
}
</style>
