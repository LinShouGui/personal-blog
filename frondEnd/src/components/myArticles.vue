<template>
    <div class="wrapper">
        <div class="main">
            <div class="home_wrapper" v-loading="loading2"  element-loading-text="加载中">

            <article v-for='item in items'>
                <header>
                    <div>
                        <router-link :to="{path:'/article',params:item._id}|urlFormat" :class="{'home_title':!isYejian,'home_title1':isYejian}">
                        {{item.title}}
                        </router-link>
                    </div>
                    <div class="wrapNameClassify">
                          <div class="articleClassify" @click="getArticleListByClassify(item.classify)">{{item.classify}}</div>
                          <div class="ArticleName"> Created by &mdash;&raquo; {{item.name}}</div>
                    </div>
                    <div>
                        <p class="home_creatAt">{{item.created_at}}</p>
                    </div>
                </header>
                <!-- <section v-html="item.content" :class="{'home_main':!isYejian,'home_main1':isYejian}"></section>使用v-html会出现无法点击其他地方的bug -->
                
                 <section  :class="{'home_main':!isYejian,'home_main1':isYejian}">{{item.content}}</section>
                
                <footer>
                    <router-link class="home_readMore" :to="{path:'/article',params:item._id}|urlFormat">阅读全文>></router-link>
                </footer>
            </article>
            <footer class='loadMore' v-if='loadMoreShow'>
                <el-button type="primary" :loading="loadMoreFlag" @click='loadMore'>
                {{loadMoreText}}</el-button>
            </footer>
        </div>
        </div>
    </div>
</template>
<script>
import api from "../api/api.js";
export default {
  data() {
    return {
      items: [],
      loading2: true,
      loadMoreFlag: false,
      loadMoreText: "加载更多",
      loadMoreShow: false,
      page: 1,
      limit: 3
    };
  },
  computed: {
    isYejian() {
      return this.$store.state.dangqian === "夜间模式";
    }
  },
  methods: {
    loadMore() {
      this.loadMoreText = "加载中";
      this.loadMoreFlag = true;
      this.page++;
      this.loadData(this.page, this.limit, this.$store.state.message);
    },
    loadData(page, limit, name) {
      return api
        .getArticleListByName({ page, limit, name })
        .then(({ data: { code, articleLists, hasNext, hasPrev } }) => {
          if (code === 200) {
            setTimeout(() => {
              this.items = this.items.concat(articleLists);
              this.loading2 = false;
              this.loadMoreShow = false;
              if (hasNext) {
                this.loadMoreShow = true;
                this.loadMoreFlag = false;
                this.loadMoreText = "加载更多";
              }
            }, 500);
          } else {
            console.log(`there is someting wrong`);
          }
        });
    },
    getArticleListByClassify(classifyName) {
      return api
        .getArticleListByClassify({ classifyName })
        .then(({ data: { code, articleLists } }) => {
          if (code == 200) {
            this.$store.dispatch("CLASSIFY_ARTICLES", articleLists);
            this.$router.push({ path: "/show" });
          } else {
            console.log("getByClassify error");
          }
        })
        .catch(error => {
          console.log("error happen " + error);
        });
    }
  },
  mounted() {
    let currentUser = this.$store.state.message;
    this.loadData(1, 3, currentUser);
  },
  created() {}
};
</script>

<style >
* {
  box-sizing: border-box;
}

.wrapNameClassify {
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.ArticleName {
  width: 137px;
  font-weight: 400;
  color: #aaa;
  padding: 0.8rem 0;
  margin-right: 1.6rem;
}
.articleClassify {
  cursor: pointer;
  width: 137px;
  font-weight: 400;
  color: #aaa;
  padding: 0.5rem 0;
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .main {
    width: 100%;
  }
  .wrapper {
    grid-row: 2/span 1;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
  }
}

@media only screen and (min-width: 321px) and (max-width: 1024px) {
  /*不考虑中等分辨率的设备*/
}

@media only screen and (min-width: 1029px) {
  .main {
    width: 1000px;
    height: 1000px;
  }
  .wrapper {
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
  }
}

h2,
h4 {
  margin: 0;
}
.home_wrapper {
  margin: auto;
  list-style: none;
}
.home_wrapper article {
  padding-bottom: 1rem;
  border-bottom: 1px solid #d2d2d2;
  margin-bottom: 2rem;
}
.home_title {
  display: block;
  font-size: 2.6rem;
  font-weight: 400;
  color: #404040;
  padding: 0.8rem 0;
}
.home_title:hover {
  opacity: 0.5;
}
.home_title1 {
  display: block;
  font-size: 2.6rem;
  font-weight: 400;
  color: #aaa;
  padding: 0.8rem 0;
}
.home_title1:hover {
  opacity: 0.5;
}
.home_creatAt {
  font-family: "Comic Sans MS", curslve, sans-serif;
  padding: 0.6rem 0;
  font-size: 1.6rem;
  color: #7f8c8d;
}
.home_main {
  font-size: 1.6rem;
  color: #34495e;
  line-height: 1.6em;
  padding: 0.6rem 0;
  overflow: auto;
  height: 200px;
}
.home_main1 {
  font-size: 1.6rem;
  color: #aaa;
  line-height: 1.6em;
  padding: 0.6rem 0;
  overflow: auto;
  height: 200px;
}
footer {
  text-align: right;
}
.home_readMore {
  font-size: 2rem;
  color: #919191;
  font-weight: 600;
}
.loadMore {
  margin: 4rem 0 4rem 0;
  display: flex;
  display: webkit-flex;
}
.loadMore button {
  cursor: pointer;
  outline: none;
  padding: 1rem;
  margin: auto;
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 1);
  border: 1px solid #bfcbd9;
  background-color: #f7f7f7;
}

.home_readMore:hover {
  opacity: 0.6;
}
@media screen and (max-width: 786px) {
  .home_title {
    font-size: 2.2rem;
  }
  .home_creatAt {
    font-size: 1.6rem;
  }
  .loadMore {
    margin: 3rem 0 0.8rem 0;
  }
}
@media screen and (max-width: 480px) {
  .home_main {
    font-size: 1.4rem;
  }
  .home_main1 {
    font-size: 1.4rem;
  }
  .home_readMore {
    font-size: 1.8rem;
  }
}

pre {
  white-space: pre-wrap;
}
pre code {
  color: #8492a6;
  display: block;
  background: #23241f;
  font: 16px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  border-radius: 5px;
  max-width: 100%;
  line-height: 1.5em;
  padding: 0.4rem 0.6rem;
  overflow-x: auto;
  overflow-y: auto;
}
</style>