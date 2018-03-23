<template>
        <div class="logo_wrapper">
            <router-link to="/" class="nav_logo">    
                <svg width="92" height="32" class="svg_margin">
                    <text text-anchor="middle" x="46" y="25" class="text text-1">
                        Blog
                    </text>
                    <text text-anchor="middle" x="46" y="25" class="text text-2">
                        Blog
                    </text>
                    <text text-anchor="middle" x="46" y="25" class="text text-3">
                        Blog
                    </text>
                    <text text-anchor="middle" x="46" y="25" class="text text-4">
                        Blog
                    </text>
                    <text text-anchor="middle" x="46" y="25" class="text text-5">
                        Blog
                    </text>
                </svg> 
            </router-link>
        </div>
</template>

<script>
</script>
<style>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .nav_logo {
    display: flex;
    height: 56px;
  }
  .nav_logo > img {
    width: 92px;
    height: 45px;
    align-self: center;
  }
  .svg_margin {
    margin-top: 10px;
  }
}

@media only screen and (min-width: 1029px) {
  .logo_wrapper {
    grid-column: 1/span 1;
    align-self: center;
    justify-self: center;
  }
  .nav_logo {
    display: inline-block;
  }
  .nav_logo > img {
    width: 92px;
    height: 32px;
    line-height: 26px;
  }
  .svg_margin {
  }
}

.text {
  font-size: 25px;
  font-weight: bold;
  text-transform: uppercase;
  fill: none;
  stroke: #0788df;
  stroke-width: 2px;
  stroke-dasharray: 180 620;
  animation: stroke 8s infinite linear;
}
.text-1 {
  stroke: #348adb;
  text-shadow: 0 0 5px #348adb;
  animation-delay: -1.6s;
}
.text-2 {
  stroke: #05eb11;
  text-shadow: 0 0 5px #05eb11;
  animation-delay: -3.2s;
}
.text-3 {
  stroke: #84c566;
  text-shadow: 0 0 5px #84c566;
  animation-delay: -4.8s;
}
.text-4 {
  stroke: orange;
  text-shadow: 0 0 5px orange;
  animation-delay: -6.4s;
}
.text-5 {
  stroke: red;
  text-shadow: 0 0 5px red;
  animation-delay: -8s;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: -800;
  }
}
</style>