<template>
  <div class="main" ><!--action="https://api.xx.com/api/upload"-->
        <form class="wenjuan" id="wen" action="http://localhost:3009/api/upload"  method="post">
            <dl class="que_0">
                <dt>0.请告诉我你的姓名:<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="text" tabIndex="1" name="name" class="name" :class="{'name1':user&&blur}" @blur="valueLength" v-model="user" />
                </dt>
            </dl>
            <dl class="que_1">
                <dt>1.请告诉我你的性别:<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input  type="radio" name="sex" value="男" id="que_1.1"/><label for="que_1.1">A.男</label>
                    <input type="radio" name="sex" value="女" id="que_1.2"/><label for="que_1.2">B.女</label>
                </dt>
            </dl>
            <dl class="que_2">
                <dt>2.请问你的年龄是?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="age" value="18岁以下" id="que_2.1"/><label for="que_2.1">A.18岁以下</label>
                    <input type="radio" name="age" value="19至25岁" id="que_2.2"/><label for="que_2.2">B.19至25岁</label>
                    <input type="radio" name="age" value="26至40岁" id="que_2.3" /><label for="que_2.3">C.26至40岁</label>
                    <input type="radio" name="age" value="40岁以上" id="que_2.4"/><label for="que_2.4">D.40岁以上</label>
                </dt>
            </dl>
            <dl class="que_3">
                <dt>3.请问你的职业是?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="job" value="学生" id="que_3.1"/><label for="que_3.1">A.学生</label>
                    <input type="radio" name="job" value="一般工作者" id="que_3.2" /><label for="que_3.2">B.一般工作者</label>
                    <input type="radio" name="job" value="自由职业者" id="que_3.3"/><label for="que_3.3">C.自由职业者</label>
                    <input type="radio" name="job" value="待业" id="que_3.4"/><label for="que_3.4">D.待业</label>
                    <input type="radio" name="job" value="其他" id="que_3.5"/><label for="que_3.5">E.其他</label>
                </dt>
            </dl>
            <dl class="que_4">
                <dt>4.请问你多长时间玩一次网络游戏?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="timeInterval" value="几乎每天都玩" id="que_4.1"/><label for="que_4.1">A.几乎每天都玩</label>
                    <input type="radio" name="timeInterval" value="1至7天" id="que_4.2"/><label for="que_4.2">B.1至7天</label>
                    <input type="radio" name="timeInterval" value="8至15天" id="que_4.3"/><label for="que_4.3">C.8至15天</label>
                    <input type="radio" name="timeInterval" value="16至30天" id="que_4.4"/><label for="que_4.4">D.16至30天</label>
                    <input type="radio" name="timeInterval" value="30天以上" id="que_4.5"/><label for="que_4.5">E.30天以上</label>
                </dt>
            </dl>
            <dl class="que_5">
                <dt>5.请问是否经常购买游戏币和装备吗?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="purchase" value="经常购买" id="que_5.1"/><label for="que_5.1">A.经常购买</label>
                    <input type="radio" name="purchase" value="偶尔购买" id="que_5.2"/><label for="que_5.2">B.偶尔购买</label>
                    <input type="radio" name="purchase" value="从未购买" id="que_5.3" /><label for="que_5.3">C.从未购买</label>
                </dt>
            </dl>
            <dl class="que_6">
                <dt>6.请问你每月用来购买游戏币和装备所花费的金额是多少?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="money" value= "50元以下" id="que_6.1"/><label for="que_6.1">A.50元以下</label>
                    <input type="radio" name="money" value="51至100元" id="que_6.2"/><label for="que_6.2">B.51至100元</label>
                    <input type="radio" name="money" value= "101至200元" id="que_6.3"/><label for="que_6.3">C.101至200元</label>
                    <input type="radio" name="money" value="200元以上" id="que_6.4"/><label for="que_6.4">D.200元以上</label>
                </dt>
            </dl>         
            <dl class="que_7">
                <dt>7.请问你认为购买游戏币及装备方便吗?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="convenient" value="很方便" id="que_7.1"/><label for="que_7.1">A.很方便</label>
                    <input type="radio" name="convenient" value="一般" id="que_7.2"/><label for="que_7.2">B.一般</label>
                    <input type="radio" name="convenient" value="麻烦" id="que_7.3" /><label for="que_7.3">C.麻烦</label>
                </dt>
            </dl>
            <dl class="que_8">
                <dt>8.请问你了解DNF这款游戏吗?<label class="bixuan">&nbsp;*</label></dt>
                <dt>
                    <input type="radio" name="know" value= "非常了解" id="que_8.1" /><label for="que_8.1">A.非常了解</label>
                    <input type="radio" name="know" value="比较了解" id="que_8.2" /><label for="que_8.2">B.比较了解</label>
                    <input type="radio" name="know" value="知道一点" id="que_8.3" /><label for="que_8.3">C.知道一点</label>
                    <input type="radio" name="know" value= "完全不了解" id="que_8.4"/><label for="que_8.4">D.完全不了解</label>
                </dt>
            </dl>
            <p>
                <input type="submit"  value="提交" @click="toHome">
            </p>
        </form>
</div>
</template>
<script>
export default {
  data() {
    return {
      user: "",
      blur: ""
    };
  },
  methods: {
    valueLength() {
      this.blur = "blur";
    },
    toHome() {}
  }
};
</script>
<style scoped>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .main {
    padding-top: 30px;
    margin-top: 56px;
    text-align: center;
    width: 100%;
  }
  .bixuan {
    color: red;
  }
  dl > dt > input[type="radio"] {
    display: none;
  }
  dl > dt:nth-child(2) label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding-left: 30px;
    margin-right: 20px;
    font-size: 18px;
    color: rgb(102, 102, 102);
  }
  dl > dt:nth-child(2) label:before {
    content: "";
    /*将要自定义的东西设置为空的字符串，就可以往里面随意加定义的样式了*/
    display: inline-block;
    background-color: #ffffff; /*设置背景*/
    padding: 0.45em; /*撑开背景，就是中间那块白色的*/
    border: 1px solid gray;
    margin-right: 10px;
    position: absolute;
    left: 0;
    bottom: 3px;
    border-radius: 50%; /*设置圆角*/
  }
  dl > dt:nth-child(2) > input[type="radio"]:checked + label:before {
    font-size: 1px;
    color: #ffffff;
    border: 7px solid rgb(29, 122, 217);
    /*设置按钮样式*/
  }

  .wenjuan > dl > dt:nth-child(1) {
    cursor: default;
    font-size: 18px;
    text-indent: 5px;
    text-align: start;
  }
  .name {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: #eee;
    outline: none;
    text-indent: 5px;
    border: 1px solid red;
  }
  .name:focus {
    border: 1px solid green;
  }
  .name1 {
    border: 1px solid green;
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: #eee;
    outline: none;
    text-indent: 5px;
  }
  .wenjuan > p input {
    width: 100%;
    height: 30px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 5px 5px 5px #888888;
    outline: none;
  }
  .wenjuan > p input:hover {
    background-color: #eee;
  }
  .wenjuan > dl > dt:nth-child(2) label:hover {
    background-color: #eee;
  }
  .que_1 > dt:nth-child(2) label {
    width: 200px;
    text-align: start;
  }
  .que_2 > dt:nth-child(2) label {
    width: 40%;
    text-align: start;
  }
  .que_3 > dt:nth-child(2) label {
    width: 28%;
    text-align: start;
  }
  .que_4 > dt:nth-child(2) label {
    width: 40%;
    text-align: start;
  }
  .que_5 > dt:nth-child(2) label {
    width: 130px;
  }
  .que_6 > dt:nth-child(2) label {
    width: 200px;
    text-align: start;
  }
  .que_7 > dt:nth-child(2) label {
    width: 130px;
    text-align: start;
  }
  .que_8 > dt:nth-child(2) label {
    width: 40%;
    text-align: start;
  }
  .wenjuan > p {
    padding-top: 20px;
  }
}

@media only screen and (min-width: 1029px) {
  .main {
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    padding-top: 10px;
    text-align: center;
    margin: 0 auto;
  }
  .wenjuan {
    width: 500px;
    height: 1000px;
    margin: 0 auto;
  }
  .bixuan {
    color: red;
  }
  dl > dt > input[type="radio"] {
    display: none;
  }
  dl > dt:nth-child(2) label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding-left: 30px;
    margin-right: 20px;
    font-size: 18px;
    color: rgb(102, 102, 102);
  }
  dl > dt:nth-child(2) label:before {
    content: "";
    /*将要自定义的东西设置为空的字符串，就可以往里面随意加定义的样式了*/
    display: inline-block;
    background-color: #ffffff; /*设置背景*/
    padding: 0.45em; /*撑开背景，就是中间那块白色的*/
    border: 1px solid gray;
    margin-right: 10px;
    position: absolute;
    left: 0;
    bottom: 3px;
    border-radius: 50%; /*设置圆角*/
  }
  dl > dt:nth-child(2) > input[type="radio"]:checked + label:before {
    font-size: 1px;
    color: #ffffff;
    border: 7px solid rgb(29, 122, 217);
    /*设置按钮样式*/
  }

  .wenjuan > dl > dt:nth-child(1) {
    cursor: default;
    font-size: 18px;
    text-indent: 5px;
    text-align: start;
  }
  .name {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: #eee;
    outline: none;
    text-indent: 5px;
    border: 1px solid red;
  }
  .name:focus {
    border: 1px solid green;
  }
  .name1 {
    border: 1px solid green;
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: #eee;
    outline: none;
    text-indent: 5px;
  }
  .wenjuan > p input {
    width: 100%;
    height: 30px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 5px 5px 5px #888888;
    outline: none;
  }
  .wenjuan > p input:hover {
    background-color: #eee;
  }
  .wenjuan > dl > dt:nth-child(2) label:hover {
    background-color: #eee;
  }
  .que_1 > dt:nth-child(2) label {
    width: 200px;
    text-align: start;
  }
  .que_2 > dt:nth-child(2) label {
    width: 40%;
    text-align: start;
  }
  .que_3 > dt:nth-child(2) label {
    width: 28%;
    text-align: start;
  }
  .que_4 > dt:nth-child(2) label {
    width: 40%;
    text-align: start;
  }
  .que_5 > dt:nth-child(2) label {
    width: 130px;
  }
  .que_6 > dt:nth-child(2) label {
    width: 200px;
    text-align: start;
  }
  .que_7 > dt:nth-child(2) label {
    width: 130px;
    text-align: start;
  }
  .que_8 > dt:nth-child(2) label {
    width: 40%;
    text-align: start;
  }
  .wenjuan > p {
    padding-top: 20px;
  }
}
</style>