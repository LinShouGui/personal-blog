<template>
    <div class="nav_main">
        <span  :class="{'no_def':!kai,'no_def1':kai}" ref="no_def">
            <router-link to="/chartPage" class="chart" id="chart">图表</router-link>
            <router-link to="/wenjuan" class="diaocha" id="diaocha">问卷调查</router-link>
            <router-link to="/games" class="games" id="games">游戏</router-link>
            <router-link to="/videoPage" class="videoPage" id="videoPage">视频</router-link>
        </span>
        <div class="search">
            <form ref="searchUser" action="/api/search" method="post" class="searchUser" >
                <input v-model="inputValue" ref="search" type="text" placeholder="搜索" name="search_input" :class="{'search_input':!kai,'search_input1':kai}" @focus="toCheck()" @blur="toCheckToo()" />
                <span class="fakeValue" >{{inputValue}}</span>
                <span class="fakeHolder"></span>
                <span :class="{'search_icon1':focus,'search_icon':!focus}" ref="search_icon">
                    <button :class="{'search_button':!kai,'search_button1':kai}" type="submit" :disabled="!isLogined"  @click.prevent="searchUser">
                        <i class="icon-search identButton"></i>
                    </button>
                </span>
            </form>
        </div>
        <div class="CurrentPage">
           正在:{{CurrentPage}}
        </div>
    </div>
</template>
<script>
import api from "../api/api.js";
import CPage from "../assets/js/CPage.js";
export default {
  data() {
    return {
      focus: false,
      value: "",
      inputValue: ""
    };
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
    },
    isLogined() {
      return this.$store.state.token;
    },
    CurrentPage() {
      return CPage[this.$route.name];
    },
    fakeNode() {
      return document.querySelector(".fakeValue");
    },
    fakeHolder() {
      return document.querySelector(".fakeHolder");
    }
  },
  methods: {
    toCheck() {
      this.focus = true;
      this.fakeNode.classList.remove("minWidth");
      this.fakeHolder.classList.remove("minTotalWidth");
      this.fakeNode.classList.add("maxWidth");
      this.fakeHolder.classList.add("maxTotalWidth");
    },
    toCheckToo() {
      this.focus = false;
      this.fakeNode.classList.remove("maxWidth");
      this.fakeHolder.classList.remove("maxTotalWidth");
      this.fakeNode.classList.add("minWidth");
      this.fakeHolder.classList.add("minTotalWidth");
    },
    searchUser(e) {
      var search = this.$refs.search.value;
      var searchText = {
        search_input: search
      };
      var classifyName = search; //为了服务端顺利解构获取到标签值,故多做一次赋值
      if (classifyName != "") {
        api
          .getArticleListByClassify({ classifyName })
          .then(({ data: { code, articleLists } }) => {
            if (code == 200) {
              this.$store.dispatch("CLASSIFY_ARTICLES", articleLists);
              this.$router.push({ path: "/show" });
            } else {
              console.log("getByClassify error");
              this.$router.push({ path: "/show" });
            }
          })
          .catch(error => {
            console.log("error happen " + error);
          });
      } else {
        alert("搜索值不能为空");
      }
    }
  }
};
</script>
<style>
.identButton {
  font-size: 28px;
}
.fakeValue {
  position: absolute;
  left: 96px;
  top: 42px;
  max-height: 9px;
  font-size: 14px;
  border-top: 3px solid teal;

  line-height: 39px;
  overflow: hidden;
  user-select: none;
  transition: all 0.5s ease;
  z-index: 2;
}
.minWidth {
  max-width: 210px;
}
.maxWidth {
  max-width: 290px;
}
.minTotalWidth {
  width: 210px;
}
.maxTotalWidth {
  width: 290px;
}
.fakeHolder {
  height: 3px;
  color: black;
  background: white;
  border-radius: 3px;
  position: absolute;
  top: 42px;
  left: 96px;
  max-height: 9px;
  overflow: hidden;
  user-select: none;
  font-size: 14px;
  transition: all 0.5s ease;
  z-index: 1;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .CurrentPage {
    display: none;
  }
  .search {
    display: none;
  }
  .chart {
    display: none;
  }
  .no_def {
    line-height: 55px;
  }
  .no_def1 > a {
    text-decoration: none;
    color: #c8c8c8;
  }
  .no_def1 {
    line-height: 55px;
    transition: all 0.3s;
  }
  .no_def1 a:hover {
    background-color: #2f2f2f;
  }
  .diaocha {
    display: none;
  }
  .games {
    display: none;
  }
  .nav_main {
    user-select: none;
  }
  .nav_main a {
    display: none;
  }
}

@media only screen and (min-width: 1029px) {
  .CurrentPage {
    grid-column: 3/span 1;
    line-height: 56px;
    height: 56px;
    text-align: center;
  }

  .nav_main {
    grid-column: 2/span 1;
    display: grid;
    grid-template-columns: 320px 445px 1fr;
    height: 56px;
  }

  .diaocha {
    text-align: center;
    line-height: 56px;
    grid-column: 2/span 1;
  }
  .diaocha:hover {
    background-color: #eee;
  }

  .chart {
    grid-column: 1/span 1;
  }

  .chart:hover {
    background-color: #eee;
  }

  .games {
    grid-column: 3/span 1;
  }

  .games:hover {
    background-color: #eee;
  }
  .videoPage {
    grid-column: 4/span 1;
  }
  .videoPage:hover {
    background-color: #eee;
  }

  .no_def > a {
    text-decoration: none;
    color: #000;
  }
  .no_def {
    display: grid;
    grid-column: 1/span 1;
    grid-template-columns: 80px 80px 80px 80px;
    text-align: center;
    line-height: 56px;
    height: 56px;
  }
  .no_def1 > a {
    text-decoration: none;
    color: #c8c8c8;
  }
  .no_def1 {
    display: grid;
    grid-column: 1/span 1;
    grid-template-columns: 80px 80px 80px 80px;
    text-align: center;
    line-height: 56px;
    height: 56px;
    transition: all 0.3s;
  }
  .no_def1 a:hover {
    background-color: #2f2f2f;
  }
  .search {
    display: grid;
    grid-column: 2/span 1;
    position: relative;
  }
  .searchUser {
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .search_input {
    align-self: center;
    width: 240px;
    height: 39px;
    line-height: 39px;
    background: #eee;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 40px;
    outline: none;
    text-indent: 15px;

    margin-left: 80px;
    transition: width 0.5s;
  }
  .search_input:focus {
    width: 320px;
  }

  .search_input1 {
    border-bottom: 3px solid #333333;
    align-self: center;
    width: 240px;
    height: 39px;
    line-height: 39px;
    background: #4f4f4f;
    font-size: 14px;
    border: 1px solid #4f4f4f;
    border-radius: 40px;
    outline: none;
    text-indent: 15px;
    margin-left: 80px;
    transition: width 0.5s;
  }
  .search_input1:focus {
    width: 320px;
  }

  .search_icon {
    cursor: pointer;
    height: 39px;
    position: absolute;
    right: 75px;
    display: block;
    align-self: center;
    transition: all 0.5s;
  }
  .search_icon > button > img {
    width: 40px;
  }
  .search_button {
    background-color: #fff;
    border: none;
    width: 39px;
    height: 39px;
    cursor: pointer;
    outline: none;
  }
  .search_button1 {
    background-color: #3f3f3f;
    border: none;
    width: 39px;
    height: 39px;
    cursor: pointer;
    outline: none;
  }
  .search_icon1 {
    cursor: pointer;
    height: 39px;
    position: absolute;
    right: 0px;
    display: block;
    align-self: center;
    transition: all 0.5s;
  }
  .search_icon1 > button > img {
    width: 40px;
  }
  .search_icon1 > button {
    border: none;
    width: 39px;
    height: 39px;
    cursor: pointer;
    outline: none;
  }
}
@media only screen and (max-width: 1523px) {
  .CurrentPage {
    display: none;
  }
}
</style>